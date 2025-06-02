"use client";

import React, { Suspense, useState } from "react"; // Added Suspense
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Particles } from "@/components/magicui/particles";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// This component contains the form and uses useSearchParams
function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email");
  const otp = searchParams.get("otp");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Password reset successfully. Redirecting to login...");
        // Clear any auth tokens/session
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        setTimeout(() => window.location.replace("/login"), 3000);
      } else {
        setError(data.error || "Failed to reset password. Please try again.");
      }
    } catch (err) {
      console.error("Error resetting password:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="mt-25 mx-auto w-full max-w-md rounded-none bg-gray-850/45 backdrop-blur-sm p-4 md:rounded-2xl md:p-8 dark:bg-gray-850/45 backdrop-blur-sm">
      <h2 className="text-xl font-bold text-white text-center">Reset Password</h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-400 text-center mx-auto">
        Enter your new password below.
      </p>

      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
      {message && <p className="text-green-500 text-sm mb-4 text-center">{message}</p>}

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">New Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </LabelInputContainer>

        <button
          className="cursor-pointer group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-gray-800 to-gray-700 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
        >
          Reset Password
          <BottomGradient />
        </button>
      </form>

      <div className="mt-4 flex justify-between text-sm">
        <Link href="/login" className="text-blue-400 hover:text-blue-500">
          Back to Login
        </Link>
        <Link href="/signup" className="text-blue-400 hover:text-blue-500">
          Signup
        </Link>
      </div>
    </div>
  );
}

// The main page component wraps the form in Suspense
export default function ResetPasswordPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent">
      <Particles
        className="absolute inset-0 -z-10"
        quantity={10}
        color="#FFFF00" // Retained original particle color
        size={9}        // Retained original particle size
        vx={0.1}        // Retained original particle vx
      />
      <Suspense fallback={
        <div className="flex justify-center items-center h-screen">
          <p className="text-white text-lg">Loading page content...</p>
        </div>
      }>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};