"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Particles } from "@/components/magicui/particles";

function OtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [otp, setOtp] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState<string | null>(null);

  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("OTP verified. Redirecting to reset password...");
        setTimeout(() => {
          router.push(`/reset-password?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`);
        }, 1000);
      } else {
        setError(data.error || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent">
      <Particles className="absolute inset-0 -z-10" quantity={10} color="#FFFF00" size={9} vx={0.1} />
      <div className="mt-25 mx-auto w-full max-w-md rounded-none bg-gray-850/45 backdrop-blur-sm p-4 md:rounded-2xl md:p-8 dark:bg-gray-850/45 backdrop-blur-sm">
        <h2 className="text-xl font-bold text-white">Verify OTP</h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-400">
          Enter the OTP sent to your email to verify your identity.
        </p>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
        <form className="my-8" onSubmit={handleOtpSubmit}>
          <div className="mb-4 flex flex-col space-y-2">
            <Label htmlFor="otp">Enter OTP</Label>
            <Input
              id="otp"
              placeholder="Enter the OTP sent to your email"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <button
            className="cursor-pointer group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-gray-800 to-gray-700 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            type="submit"
          >
            Verify OTP &rarr;
          </button>
        </form>
      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="text-center text-white mt-10">Loading...</div>}>
      <OtpForm />
    </Suspense>
  );
}
