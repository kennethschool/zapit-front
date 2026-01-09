"use client";
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MenuIcon, UserCircle } from "lucide-react";
import { cn } from "~/lib/utils";
import { LightningBoltIcon } from "../icons/lightning-bolt-icon";
import ThemeSwitch from "../theme/ThemeSwitch";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import useMounted from "@/lib/useMount";
import { SkeletonCircle } from "../default/ui";

const Nav = () => {
  const mounted = useMounted();
  const router = useRouter();
  const { pathname } = router;
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = authClient.useSession();
  //const { data: _session } = authClient.useSession();

  // useEffect(() => {
  //   async function sesh() {
  //     const { data: _session } = await authClient.getSession();
  //     console.log(_session);
  //     //@ts-ignore
  //     setSession(_session);
  //   }

  //   sesh(); // run once at start

  //   const interval = setInterval(sesh, 30000); // run every 30s

  //   return () => clearInterval(interval); // cleanup
  // }, []);

  // useEffect(() => {
  //   async function sesh() {
  //     const { data: _session } = await authClient.getSession();
  //     //console.log(_session);
  //     //@ts-ignore
  //     setSession(_session);
  //   }
  //   sesh();
  // }, [session]);

  useEffect(() => {
    setScrolled(window.scrollY > 10);

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/login"); // redirect to login page
        },
      },
    });
  }

  const transparentBgPaths = ["/"];
  const isTransparentBg = !scrolled && !mobileMenuOpen;

  return (
    <header
      id="navbar"
      className={
        `${pathname === "" ? "hidden " : ""}` +
        cn(
          "sticky overflow-hidden top-0 z-50 w-full duration-500 transform transition-all",
          isTransparentBg
            ? "bg-transparent"
            : "bg-background/80 backdrop-blur-lg ring ring-foreground/5 shadow-sm"
        )
      }
    >
      <div className="container space-x-2 mx-auto justify-between flex items-center h-16 px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2 md:w-[200px]">
          <LightningBoltIcon className="h-8 w-8 text-primary" />
          <span className="font-bold outline-none text-xl tracking-tight transition-all duration-150 hover:text-primary uppercase">
            zapit <span className="text-primary">alpha</span>
          </span>
        </Link>

        {/* Desktop navi */}
        <nav className="hidden md:flex flex-1 justify-center space-x-6">
          <Link
            href="/dashboard"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/dashboard"
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          >
            Dashboard
          </Link>
          <Link
            href="/discover"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/discover"
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          >
            Discover
          </Link>
          <Link
            href="/host"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/host" ? "text-foreground" : "text-muted-foreground"
            )}
          >
            Host
          </Link>
          <Link
            href="/join"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/join" ? "text-foreground" : "text-muted-foreground"
            )}
          >
            Join
          </Link>
        </nav>

        <div className="flex space-x-4 md:w-[200px] justify-end">
          <ThemeSwitch />
          {mounted ? (
            session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <img
                    src={
                      session?.user.image || "/images/default_person_image.jpg"
                    }
                    alt={session?.user.username || "User"}
                    className="h-8 border border-background/25 rounded-full w-8 transition-all duration-250 transform hover:ring-2 cursor-pointer"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {session.user?.username || "User"}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profiles">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link onClick={() => signOut()} href="#">
                      Logout
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex space-x-2 items-center">
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm">Sign up</Button>
                </Link>
              </div>
            )
          ) : (
            <SkeletonCircle className="h-8 w-8" />
          )}
          {/* mobile */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <MenuIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <motion.div
        transition={{ duration: 0.125 }}
        initial={{ paddingBottom: 0 }}
        animate={{ paddingBottom: mobileMenuOpen ? 35 : 0 }}
        className="bg-transparent md:hidden"
      >
        {" "}
        <nav className="mx-auto flex justify-center space-x-6 absolute w-full inset-x-0">
          <Link
            href="/dashboard"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/dashboard"
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          >
            Dashboard
          </Link>
          <Link
            href="/discover"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/discover"
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          >
            Discover
          </Link>
          <Link
            href="/host"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/host" ? "text-foreground" : "text-muted-foreground"
            )}
          >
            Host
          </Link>
          <Link
            href="/join"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/join" ? "text-foreground" : "text-muted-foreground"
            )}
          >
            Join
          </Link>
        </nav>
      </motion.div>
    </header>
  );
};

export default Nav;
