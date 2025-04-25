"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { Particles } from "@/components/magicui/particles";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Import Link from next/link

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        router.push("/dashboard"); // Redirect to dashboard after successful login
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
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
        <h2 className="text-xl font-bold text-white">Welcome Back</h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-400">
          Login to your account to continue
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          {/* Email Input */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="you@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </LabelInputContainer>

          {/* Password Input */}
          <LabelInputContainer className="mb-4 relative">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-9 text-neutral-400 hover:text-neutral-200"
            >
              {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
            </button>
          </LabelInputContainer>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Login Button */}
          <button
            className="cursor-pointer group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-gray-800 to-gray-700 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            type="submit"
          >
            Login &rarr;
            <BottomGradient />
          </button>

          {/* Links */}
          <div className="mt-4 flex justify-between text-sm">
            <Link
              href="/forgot-password"
              className="text-blue-400 hover:text-blue-500"
            >
              Forgot Password?
            </Link>
            <Link href="/signup" className="text-blue-400 hover:text-blue-500">
              Signup
            </Link>
          </div>
        </form>
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


