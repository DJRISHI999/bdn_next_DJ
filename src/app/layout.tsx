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
  const isDashboard = pathname.startsWith("/dashboard/customer")||pathname.startsWith("/dashboard/admin") || pathname.startsWith("/dashboard/associate");

  return (
    <html lang="en">
      <body className="bg-background text-foreground">
      {!isDashboard && <Navbar />}
        <main>{children}</main>
        {!isDashboard && <Footer/>}
      </body>
    </html>
  );
}