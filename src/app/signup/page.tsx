"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { IconBrandGoogle, IconBrandWindows } from "@tabler/icons-react";
import { Particles } from "@/components/magicui/particles";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError(null); // Clear the error if passwords match
    console.log("Signup form submitted successfully!");
  };

  const handleAssociateSignup = () => {
    router.push("/signup/referal_code"); // Redirect to referral code page
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent">
      {/* Particle Effect */}
      <Particles
        className="absolute inset-0 -z-10"
        quantity={10}
        color="#FFFF00"
        size={9}
        vx={0.1}
      />

      <div className="mt-25 mx-auto w-full max-w-md rounded-none bg-gray-850/45 backdrop-blur-sm p-4 md:rounded-2xl md:p-8 dark:bg-gray-850/45 backdrop-blur-sm">
        <h2 className="text-xl font-bold text-white">Create Your Account</h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-400">
          Signup to access exclusive features and content.
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          {/* First Name Input */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="firstname">First Name</Label>
            <Input id="firstname" placeholder="First Name" type="text" />
          </LabelInputContainer>

          {/* Last Name Input */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="lastname">Last Name</Label>
            <Input id="lastname" placeholder="Last Name" type="text" />
          </LabelInputContainer>

          {/* Email Input */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" placeholder="xyz@gmail.com" type="email" />
          </LabelInputContainer>

          {/* Mobile Number */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input id="mobile" placeholder="XXXXXXXXX" type="tel" pattern="[0-9]{10}" required />
          </LabelInputContainer>

          {/* Password Input */}
          <LabelInputContainer className="mb-4 relative">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
              required
            />
          </LabelInputContainer>

          {/* Confirm Password Input */}
          <LabelInputContainer className="mb-4 relative">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              placeholder="••••••••"
              type="password"
              required
            />
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          </LabelInputContainer>

          {/* Be an Associate Button */}
          <button
            className="cursor-pointer group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-gray-800 to-gray-700 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] mb-4"
            type="button"
            onClick={handleAssociateSignup}
          >
            Be an Associate &rarr;
            <BottomGradient />
          </button>

          {/* Signup Button */}
          <button
            className="cursor-pointer group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-gray-800 to-gray-700 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            type="submit"
          >
            Signup &rarr;
            <BottomGradient />
          </button>
        </form>

        {/* Divider */}
        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />

        {/* Social Signup Buttons */}
        <div className="flex flex-col space-y-4">
          <button
            className="cursor-pointer group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            type="button"
          >
            <IconBrandWindows className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Signup with Microsoft
            </span>
            <BottomGradient />
          </button>
          <button
            className="cursor-pointer group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            type="button"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Signup with Google
            </span>
            <BottomGradient />
          </button>
        </div>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

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


