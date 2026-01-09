"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { LightningBoltIcon } from "@/components/icons/lightning-bolt-icon";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { authClient } from "~/lib/auth-client";
import { auth } from "@/lib/auth";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [step, SetStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const router = useRouter();

  //USERNAME CHECK
  const [username, setUsername] = useState("");
  const _errors = validateUsername(username);
  const isUsernameValid = username.length > 0 && _errors.length === 0;

  //EMAIL CHECK
  const [email, setEmail] = useState("");
  const emailErrors = validateEmail(email);
  const isEmailValid = emailErrors.length === 0;

  //OPTIONAL DISPLAYNAME CHECK
  const [displaySameAsUsername, setDisplayAndUsername] = useState(false);
  const [displayUsername, setDisplayUsername] = useState("");
  const displayNameErrors = validateUsername(displayUsername);
  const isDisplayNameValid = displayNameErrors.length === 0;

  //PASSWORD CHECK
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [_visible, _setVisible] = useState(false);

  const errors = validatePassword(password);
  const ConfirmPasserrors = validateConfirmPassword(confirmPassword);
  const isStrong = errors.length === 0;
  const isConfirmSame = ConfirmPasserrors.length === 0;

  useEffect(() => {
    async function sesh() {
      const { data: session } = await authClient.getSession();
      //console.log(session);
    }
    sesh();
  }, []);

  function validatePassword(password: string) {
    const errors: string[] = [];

    if (password.length < 8) errors.push("At least 8 characters");
    if (!/[A-Z]/.test(password)) errors.push("At least one uppercase letter");
    if (!/[a-z]/.test(password)) errors.push("At least one lowercase letter");
    if (!/[0-9]/.test(password)) errors.push("At least one number");
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password))
      errors.push("At least one special character");

    return errors;
  }

  function validateConfirmPassword(_password: string) {
    const errors: string[] = [];

    if (password !== _password)
      errors.push("Make sure both passwords are the same!");

    return errors;
  }

  function validateEmail(email: string) {
    const errors: string[] = [];

    // length check
    if (email.length < 5 || email.length > 50) {
      errors.push("Email must be between 5 and 50 characters");
    }

    // Must contain @ and .
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push("Invalid email format");
    }

    return errors;
  }

  function validateUsername(username: string) {
    const errors: string[] = [];

    if (username.length < 3 || username.length > 20) {
      errors.push("Must be between 3 and 20 characters");
    }
    if (!/^[A-Za-z]/.test(username)) {
      errors.push("Must start with a letter");
    }
    if (!/^[A-Za-z0-9_]+$/.test(username)) {
      errors.push("Only letters, numbers, and underscores allowed");
    }

    return errors;
  }

  async function handleSubmitSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setServerError("");

    try {
      toast.info("Loading");

      const { data, error } = await authClient.signUp.email(
        {
          displayUsername: displaySameAsUsername ? username : displayUsername,
          username,
          email, // required
          password,
          callbackURL: "/welcome",
        } as any,
        {
          onRequest: (ctx) => {
            //show loading
          },
          onSuccess: (ctx) => {
            //alert(JSON.stringify(ctx.response));
            toast.success("Signed up and logged in succesfully!");
            router.push("/dashboard");
            //redirect to the dashboard or da sign in page
          },
          onError: (ctx) => {
            // display the error message
            //toast.error(ctx.error.message);
          },
        }
      );

      error && checkSignUpError(error);

      async function checkSignUpError(error: any) {
        switch (error.code) {
          case "USERNAME_IS_ALREADY_TAKEN_PLEASE_TRY_ANOTHER":
            toast.info("Username taken. Please try another username.");
            break;
          case "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL":
            attempExistUserLogin();
            break;
          default:
            console.log("Invalid case");
            break;
        }
      }

      async function attempExistUserLogin() {
        const toastLoading = toast.loading("Attempting user sign in");
        await authClient.signIn.email(
          {
            email, // required
            password,
          } as any,
          {
            onRequest: (ctx) => {
              //show loading
              //toast.info("Loading");
            },
            onSuccess: (ctx) => {
              //alert(JSON.stringify(ctx.response));
              toast.done(toastLoading);
              toast.success("Signed in and logged in succesfully!");
              router.push("/dashboard");
              //redirect to the dashboard or sign in page
            },
            onError: (ctx) => {
              // display the error message
              toast.error(ctx.error.message);
            },
          }
        );
      }
    } catch (err) {
      console.error(err);
      setServerError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <LightningBoltIcon className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Join Zapit</h1>
          <p className="text-muted-foreground">
            Create your account to get started
          </p>
        </div>

        <form onSubmit={handleSubmitSignup} className="space-y-4">
          <div className="space-y-2">
            <p>Username</p>
            <Input
              placeholder="Enter a username (3–20 characters)"
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`px-3 py-2 pr-12 ${
                isUsernameValid
                  ? "ring ring-green-500"
                  : username.length > 0 && "ring ring-red-500"
              }`}
            />

            <ul className="mt-4 text-sm">
              {username.length === 0 ? (
                <></>
              ) : _errors.length > 0 ? (
                _errors.map((err, i) => (
                  <li key={i} className="text-red-500">
                    • {err}
                  </li>
                ))
              ) : (
                <li className="text-green-600 flex gap-2 item-center">
                  <Check className="h-4 w-4" /> Username looks good!
                </li>
              )}
            </ul>
          </div>{" "}
          <div className="space-y-2">
            <p>Display Username</p>
            <div className="flex items-center space-x-2">
              <Checkbox
                value={Number(displaySameAsUsername)}
                onClick={() => setDisplayAndUsername(!displaySameAsUsername)}
              />
              <p>
                Same as Username?{" "}
                <span className="text-xs">Note: This can be changed later</span>
              </p>
            </div>
            {!displaySameAsUsername && (
              <>
                {" "}
                <Input
                  placeholder="Enter a display name (3–20 characters)"
                  id="displayUsername"
                  name="displayUsername"
                  type="text"
                  value={displayUsername}
                  onChange={(e) => setDisplayUsername(e.target.value)}
                  className={`px-3 py-2 pr-12 ${
                    isDisplayNameValid
                      ? "ring ring-green-500"
                      : displayUsername.length > 0 && "ring ring-red-500"
                  }`}
                />
                <ul className="mt-4 text-sm">
                  {displayUsername.length === 0 ? (
                    <></>
                  ) : displayNameErrors.length > 0 ? (
                    displayNameErrors.map((err, i) => (
                      <li key={i} className="text-red-500">
                        • {err}
                      </li>
                    ))
                  ) : (
                    <li className="text-green-600 flex gap-2 item-center">
                      <Check className="h-4 w-4" /> Display Username looks good!
                    </li>
                  )}
                </ul>
              </>
            )}
          </div>{" "}
          <div className="space-y-2">
            <p>Email</p>
            <Input
              placeholder="Enter an email address"
              id="email"
              name="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`px-3 py-2 pr-12 ${
                isEmailValid
                  ? "ring ring-green-500"
                  : email.length > 0 && "ring ring-red-500"
              }`}
            />

            <ul className="mt-4 text-sm">
              {email.length === 0 ? (
                <></>
              ) : emailErrors.length > 0 ? (
                emailErrors.map((err, i) => (
                  <li key={i} className="text-red-500">
                    • {err}
                  </li>
                ))
              ) : (
                <li className="text-green-600 flex gap-2 item-center">
                  <Check className="h-4 w-4" /> Email looks good!
                </li>
              )}
            </ul>
          </div>{" "}
          <div className="space-y-2">
            <p>Password</p>
            <Input
              id="signup-password"
              name="password"
              type={visible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`px-3 py-2 pr-12 ${
                isStrong
                  ? "ring ring-green-500"
                  : password.length > 0 && "ring ring-red-500"
              }`}
              placeholder="Must be at least 8 characters"
            />

            {/* validation messages */}
            <ul className="mt-2 text-sm">
              {errors.length > 0 && password.length > 0 ? (
                errors.map((err, i) => (
                  <li key={i} className="text-red-500">
                    • {err}
                  </li>
                ))
              ) : (
                <>
                  {password.length > 0 && (
                    <li className="text-green-600 flex gap-2 item-center">
                      <Check className="h-4 w-4" /> Strong password!
                    </li>
                  )}
                </>
              )}
            </ul>
          </div>
          {errors.length === 0 && (
            <AnimatePresence>
              {password.length > 0 && (
                <motion.div
                  className="my-6"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                >
                  <div className="space-y-2">
                    <p>Confirm Password</p>
                    <Input
                      id="signup-confirm-password"
                      name="confirmPassword"
                      type={_visible ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`px-3 mb-4 py-2 pr-12 ${
                        isConfirmSame
                          ? "ring ring-green-500"
                          : "ring ring-red-500"
                      }`}
                      placeholder="Must be the same as password"
                    />

                    <ul className="mt-2 text-sm">
                      {ConfirmPasserrors.length > 0 ? (
                        ConfirmPasserrors.map((err, i) => (
                          <li key={i} className="text-red-500">
                            • {err}
                          </li>
                        ))
                      ) : (
                        <>
                          {confirmPassword.length > 0 && (
                            <li className="text-green-600 flex gap-2 item-center">
                              <Check className="h-4 w-4" /> Validated!
                            </li>
                          )}
                        </>
                      )}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
          {isUsernameValid &&
            isEmailValid &&
            isStrong &&
            isConfirmSame &&
            (displaySameAsUsername ? true : isDisplayNameValid) && (
              <AnimatePresence>
                {password.length > 0 && (
                  <motion.div
                    className="my-6"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                  >
                    <Button type="submit" className="w-full">
                      Sign Up
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
        </form>

        <div className="mt-6 text-center">
          <p>
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
