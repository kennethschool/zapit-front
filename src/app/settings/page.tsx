"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Bell, Key, User, Shield, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "~/components/ui/drawer";

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [displayUsername, setDisplayUsername] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [previewRaw, setPreviewRaw] = useState<string | null>(null);
  const [openQuizDrawer, setOpenQuizDrawer] = useState(false);

  // crop states
  const [image, setImage] = useState<string | null>(null);
  const [changedImage, setChangedImage] = useState<boolean | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  //const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (session?.user) {
      setDisplayUsername(session.user.displayUsername || "");
      setUsername(session?.user.username || "");
      setName(session.user.name || "");
      //toast(session?.user.image);
    }
  }, [session]);

  useEffect(() => {
    if (session?.user?.image) {
      // using existing profile picture
      setImage(session.user.image);
      setImageSrc(session.user.image);
      setPreview(session.user.image);
      setCurrentImage(session.user.image);
    }
  }, [session?.user?.image]);

  useEffect(() => {
    setCurrentImage(preview ? preview : image ? image : "/avatars/01.png");
  }, [preview, image, session]);

  async function uploadCroppedImage(blob: Blob) {
    const fileName = `${Date.now()}-${username}.jpg`;
    const fileType = blob.type || "image/jpeg";

    // get aws signed URL
    const response = await fetch("/api/v1/users/handleAvatar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName, fileType }),
    });
    const { uploadUrl, fileUrl, err } = await response.json();

    if (err) return toast.error(err);

    // upload to s3
    const upload = await fetch(uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": fileType },
      body: blob,
    });

    if (!upload.ok) throw new Error("Failed to upload to S3");

    setImage(fileUrl);
    return fileUrl;
  }

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setChangedImage(true);
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setOpenQuizDrawer(true);
      setImageSrc(reader.result as string);
    });
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setIsLoading(true);
    await handleUpdateInformation();
    // setTimeout(() => {
    //   setIsLoading(false);
    //   toast("Settings updated - Your changes have been saved successfully.");
    // }, 1000);
  };

  async function handleUpdateInformation() {
    try {
      const newAvatarUrl =
        (changedImage && (await uploadCroppedImage(previewRaw))) || image;

      setPreview(`${newAvatarUrl}?t=${Date.now()}`);
      setImage(newAvatarUrl);

      const { error } = await authClient.updateUser({
        image: newAvatarUrl,
        name,
        displayUsername,
        username,
      });

      if (error) toast.error(error.message);
      else toast.success("Successfully updated information!");
    } catch (err: any) {
      console.error(err);
      return toast.error("Network error: " + err.message);
    } finally {
      setIsLoading(false);
    }
  }

  //crop logicc
  const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImg = useCallback(async () => {
    try {
      const blob = await cropImage(imageSrc, croppedAreaPixels);

      const previewUrl = URL.createObjectURL(blob);
      setPreview(previewUrl);
      setPreviewRaw(blob);
      setOpenQuizDrawer(false);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels]);

  const createImage = (url: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = (error) => reject(error);
      image.src = url;
    });

  async function cropImage(imageSrc: string | null, cropPixels: any) {
    if (!imageSrc) return;
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = cropPixels.width;
    canvas.height = cropPixels.height;

    if (ctx)
      ctx.drawImage(
        image,
        cropPixels.x,
        cropPixels.y,
        cropPixels.width,
        cropPixels.height,
        0,
        0,
        cropPixels.width,
        cropPixels.height
      );

    return new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob!);
      }, "image/jpeg");
    });
  }

  return (
    <div className="container max-w-4xl py-8 px-4 mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Account Settings - {session?.user.username}
        </h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </header>

      <Tabs defaultValue="profile" className="space-y-8">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="danger">Danger Zone</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your profile information and email settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={currentImage} alt="Profile" />
                  <AvatarFallback>
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="hidden"
                  />
                  <Button
                    onClick={() =>
                      fileInputRef.current && fileInputRef.current.click()
                    }
                    variant="outline"
                    size="sm"
                  >
                    Change Avatar
                  </Button>
                </div>
                <Button
                  onClick={() => [setOpenQuizDrawer(true), setPreview(image)]}
                  variant="ghost"
                  size="sm"
                >
                  Crop
                </Button>
              </div>

              <div className="grid gap-4">
                <InputField
                  id="displayName"
                  label="Display Name"
                  value={displayUsername}
                  onChange={setDisplayUsername}
                />
                <InputField
                  id="name"
                  label="Name"
                  value={name}
                  onChange={setName}
                />
                <TextAreaField
                  id="bio"
                  label="Bio"
                  placeholder="Tell us about yourself..."
                  value={bio}
                  onChange={setBio}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="security">
          <SecuritySettings />
        </TabsContent>

        <TabsContent value="danger">
          <DangerZone />
        </TabsContent>
      </Tabs>

      <div className="flex justify-end mt-8 space-x-4">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <ImageCropDrawer
        open={openQuizDrawer}
        imageSrc={imageSrc}
        crop={crop}
        zoom={zoom}
        setCrop={setCrop}
        setZoom={setZoom}
        onCropComplete={onCropComplete}
        onClose={() => setOpenQuizDrawer(false)}
        onCrop={getCroppedImg}
      />
    </div>
  );
}

function InputField({ id, label, value, onChange }: any) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function TextAreaField({ id, label, placeholder, value, onChange }: any) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <textarea
        id={id}
        className="min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function NotificationSettings() {
  const settings = [
    {
      label: "Game Invites",
      desc: "Receive notifications when you're invited to join a game",
      defaultChecked: true,
    },
    {
      label: "Quiz Updates",
      desc: "Get notified about updates to quizzes you've played",
      defaultChecked: true,
    },
    {
      label: "Achievement Alerts",
      desc: "Notifications for new achievements and rewards",
      defaultChecked: true,
    },
    {
      label: "Marketing Emails",
      desc: "Receive emails about new features and updates",
      defaultChecked: false,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>
          Choose what notifications you want to receive
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {settings.map(({ label, desc, defaultChecked }, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{label}</Label>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
            <Switch defaultChecked={defaultChecked} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function SecuritySettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>
          Manage your security preferences and account access
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <InputField id="current-password" label="Current Password" />
          <InputField id="new-password" label="New Password" />
          <InputField id="confirm-password" label="Confirm New Password" />
        </div>
        <div className="flex items-center justify-between pt-4">
          <div className="space-y-0.5">
            <Label>Two-Factor Authentication</Label>
            <p className="text-sm text-muted-foreground">
              Add an extra layer of security to your account
            </p>
          </div>
          <Button variant="outline">
            <Shield className="mr-2 h-4 w-4" />
            Enable 2FA
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function DangerZone() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-destructive">Danger Zone</CardTitle>
        <CardDescription>Irreversible and destructive actions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-destructive p-4">
          <h3 className="font-medium mb-2">Delete Account</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Once you delete your account, there’s no going back.
          </p>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" /> Delete Account
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ImageCropDrawer({
  open,
  onClose,
  imageSrc,
  crop,
  zoom,
  setCrop,
  setZoom,
  onCropComplete,
  onCrop,
}: any) {
  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Image Editor</DrawerTitle>
          <DrawerDescription>Edit image</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 gap-4 justify-items-center">
          <div className="relative w-64 h-64 bg-gray-200">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
        </div>
        <DrawerFooter>
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={onCrop}>Crop</Button>
            <DrawerClose asChild>
              <button className="px-4 py-2 bg-[#ff0000] hover:bg-red-400 text-white rounded-md cursor-pointer transition-all duration-250">
                Cancel
              </button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
