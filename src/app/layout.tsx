"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoggedInNavbar from "@/components/ui/logged-in-navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Exclude Navbar and Footer for admin dashboard
  const isDashboard =
    pathname?.startsWith("/dashboard/customer") ||
    pathname?.startsWith("/dashboard/admin") ||
    pathname?.startsWith("/dashboard/associate");

  const isLoginPage = pathname === "/login";
  const isSignupPage =
    pathname === "/signup" ||
    pathname === "/signup/referal_code" ||
    pathname === "/signup/ass_signup";

  
    const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("token");
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