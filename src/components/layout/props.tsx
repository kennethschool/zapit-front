"use client";
import { ToastContainer } from "react-toastify";
import { useTheme } from "../theme/ThemeProvider";
import Nav from "./navbar";

export default function InnerApp({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <>
      <ToastContainer theme={theme} />
      <Nav />
      {children}
    </>
  );
}
