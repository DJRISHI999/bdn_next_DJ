import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Bhoodhan Infratech | Reset Password",
  description: "Reset your password for Bhoodhan Infratech.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}