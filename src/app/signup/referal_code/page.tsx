"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Particles } from "@/components/magicui/particles";

export default function ReferralCodePage() {
  const [referralCode, setReferralCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleNext = async () => {
    // Check if referral code exists
    const response = await fetch(`/api/check-referral-code?code=${referralCode}`);
    const data = await response.json();

    if (data.exists) {
      router.push(`/signup/ass_signup?referralCode=${referralCode}`); // Redirect to associate signup page
    } else {
      setError("Invalid referral code. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-transparent">
      {/* Particle Effect */}
      <Particles
        className="absolute inset-0 -z-10"
        quantity={10}
        color="#FFFF00"
        size={9}
        vx={0.1}
      />

      <div className="w-full max-w-md rounded-none bg-gray-850/45 backdrop-blur-sm p-4 md:rounded-2xl md:p-8 dark:bg-gray-850/45 backdrop-blur-sm">
        <h2 className="text-xl font-bold text-white">Enter Referral Code</h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-400">
          Please enter the referral code to proceed.
        </p>

        <form className="my-8">
          {/* Referral Code Input */}
          <div className="flex w-full flex-col space-y-2 mb-4">
            <Label htmlFor="referralCode" className="text-neutral-300">
              Referral Code
            </Label>
            <Input
              id="referralCode"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              placeholder="Enter referral code"
              className="bg-gray-50 dark:bg-gray-700 dark:text-gray-100"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              className="cursor-pointer group/btn relative block h-10 w-1/3 rounded-md bg-gradient-to-br from-gray-800 to-gray-700 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
              type="button"
              onClick={() => router.push("/signup")}
            >
              Go Back
            </button>
            <button
              className={`cursor-pointer group/btn relative block h-10 w-1/3 rounded-md bg-gradient-to-br from-blue-500 to-blue-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] ${
                referralCode ? "" : "opacity-50 cursor-not-allowed"
              }`}
              type="button"
              onClick={handleNext}
              disabled={!referralCode}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}