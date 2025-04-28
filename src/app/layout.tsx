"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import LoggedInNavbar from "@/components/ui/logged-in-navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Check if the user is logged in
  const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("token");

  // Exclude Navbar and Footer for specific pages
  const isDashboard =
    pathname?.startsWith("/dashboard/customer") ||
    pathname?.startsWith("/dashboard/admin") ||
    pathname?.startsWith("/dashboard/associate");

  const isLoginPage = pathname === "/login";
  const isSignupPage =
    pathname === "/signup" ||
    pathname === "/signup/referal_code" ||
    pathname === "/signup/ass_signup";

  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        {isLoggedIn ? (
          <LoggedInNavbar />
        ) : (
          !isDashboard && !isLoginPage && !isSignupPage && <Navbar />
        )}
        <main>{children}</main>
        {!isDashboard && !isLoggedIn && <Footer />}
      </body>
    </html>
  );
}