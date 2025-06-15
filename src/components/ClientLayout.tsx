"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import LoggedInNavbar from "@/components/ui/logged-in-navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();

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
    <>
      {/* NavBar section */}
      {!isDashboard && (
        <div className="w-full max-w-full">
          {isLoggedIn ? (
            <LoggedInNavbar />
          ) : (
            !isLoginPage && !isSignupPage && <Navbar />
          )}
        </div>
      )}
      {/* Main content */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden container mx-auto px-2 sm:px-4 md:px-6">
        {children}
      </main>
      {/* Footer section */}
      {!isDashboard && <Footer />}
    </>
  );
}
