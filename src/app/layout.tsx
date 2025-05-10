"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import LoggedInNavbar from "@/components/ui/logged-in-navbar";
import Footer from "@/components/Footer";
import { AuthProvider, useAuth } from "@/context/AuthContext"; // Import AuthContext
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Determine if the current route is a dashboard route
  const isDashboard =
    pathname?.startsWith("/dashboard/customer") ||
    pathname?.startsWith("/dashboard/admin") ||
    pathname?.startsWith("/dashboard/associate");

  // Determine if the current route is a login or signup page
  const isLoginPage = pathname === "/login";
  const isSignupPage =
    pathname === "/signup" ||
    pathname === "/signup/referal_code" ||
    pathname === "/signup/ass_signup";

  return (
    <AuthProvider>
      {/* Define the <html> and <body> tags here */}
      <html lang="en">
        <body className="bg-background text-foreground">
          {/* Render Navbar or LoggedInNavbar only if not a dashboard route */}
          {!isDashboard && (
            <NavbarOrLoggedInNavbar
              isDashboard={isDashboard}
              isLoginPage={isLoginPage}
              isSignupPage={isSignupPage}
            />
          )}
          {/* Render the main content */}
          <main>{children}</main>
          {/* Render footer only if not a dashboard */}
          {!isDashboard && <Footer />}
        </body>
      </html>
    </AuthProvider>
  );
}

function NavbarOrLoggedInNavbar({
  isDashboard,
  isLoginPage,
  isSignupPage,
}: {
  isDashboard: boolean;
  isLoginPage: boolean;
  isSignupPage: boolean;
}) {
  const { isLoggedIn, user } = useAuth(); // Use AuthContext to determine login state and get user data

  // Force re-render by using a key based on isLoggedIn
  return (
    <div key={isLoggedIn ? "logged-in" : "logged-out"}>
      {isLoggedIn ? (
        !isDashboard && <LoggedInNavbar user={user} /> // Exclude LoggedInNavbar for dashboard routes
      ) : (
        !isDashboard && !isLoginPage && !isSignupPage && <Navbar />
      )}
    </div>
  );
}