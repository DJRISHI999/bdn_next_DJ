"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Exclude Navbar and Footer for admin dashboard
  const isAdminDashboard = pathname.startsWith("/dashboard/admin");

  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        {!isAdminDashboard && <Navbar />}
        <main>{children}</main>
        {!isAdminDashboard && <Footer />}
      </body>
    </html>
  );
}