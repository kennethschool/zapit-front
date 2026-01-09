"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LightningBoltIcon } from "@/components/icons/lightning-bolt-icon";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const router = useRouter();

  function validatePassword(password: string) {
    const errors: string[] = [];

    if (password.length < 8) errors.push("At least 8 characters");
    // if (!/[A-Z]/.test(password)) errors.push("At least one uppercase letter");
    // if (!/[a-z]/.test(password)) errors.push("At least one lowercase letter");
    // if (!/[0-9]/.test(password)) errors.push("At least one number");
    // if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password))
    //   errors.push("At least one special character");

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

  //EMAIL CHECK
  const [email, setEmail] = useState("");
  const emailErrors = validateEmail(email);
  const isEmailValid = emailErrors.length === 0;

  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const errors = validatePassword(password);
  const isStrong = errors.length === 0;

  async function handleSubmitLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");

    try {
      toast.info("Loading");

      const { data, error } = await authClient.signIn.email(
        {
          email, // required
          password,
        } as any,
        {
          onRequest: (ctx) => {
            //show loading
          },
          onSuccess: (ctx) => {
            //alert(JSON.stringify(ctx.response));
            toast.success("Logged in succesfully!");
            router.push("/dashboard");
            //redirect to the dashboard or sign in page
          },
          onError: (ctx) => {
            // display the error message
            toast.error(ctx.error.message);
          },
        }
      );

      //error && toast.error(error.message);
    } catch (err) {
      console.error(err);
      setLoginError("Network error " + err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <LightningBoltIcon className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
          <p className="text-muted-foreground">
            Sign in to access your Zapit account
          </p>
        </div>

        <form onSubmit={handleSubmitLogin} className="space-y-4">
          <div className="space-y-2">
            <p>Email</p>
            <Input
              placeholder="Enter email"
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`px-3 py-2 pr-12 ${
                isEmailValid
                  ? "ring ring-green-500"
                  : email.length > 0 && "ring ring-red-500"
              }`}
            />

            <ul className="mt-4 text-sm"></ul>
          </div>{" "}
          <div className="space-y-2">
            <p>Password</p>
            <Input
              id="signup-password"
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
            <p
              onClick={() => console.log("Sent OTP password!")}
              className="text-primary hover:underline hover:cursor-pointer text-end"
            >
              Forgot password?
            </p>
          </div>
          <ul className="mt-2 text-sm">
            {emailErrors.length === 0 && errors.length === 0 && (
              <AnimatePresence>
                {password.length > 0 && (
                  <motion.div
                    className="my-6"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                  >
                    <Button type="submit" className="w-full">
                      Log In
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </ul>
        </form>

        <div className="mt-6 text-center">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
