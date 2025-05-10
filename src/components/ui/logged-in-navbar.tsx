"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useAuth } from "@/context/AuthContext"; // Use AuthContext

export default function LoggedInNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, refreshUser } = useAuth(); // Get user, logout, and refreshUser from AuthContext
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Refresh user data to ensure the latest profile picture is fetched
    refreshUser();
  }, [refreshUser]);

  const dashboardRoute =
    user?.role === "admin"
      ? "/dashboard/admin"
      : user?.role === "associate"
      ? "/dashboard/associate"
      : "/dashboard/customer";

  return (
    <motion.nav
      initial={isClient ? { y: -100 } : false}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full bg-black/45 backdrop-blur-md text-white shadow-lg z-50 border-b border-yellow-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <Link href="/">
            <div className="p-2 rounded-full hover:scale-110 transition-transform duration-300">
              <Image
                src="/images/logo.webp"
                alt="Bhoodhan Logo"
                width={60}
                height={60}
                priority
                className="cursor-pointer"
              />
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {["Home", "About"].map((item, index) => (
              <Link
                key={index}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className={twMerge(
                  clsx(
                    "text-lg font-medium transition-transform duration-300",
                    "text-blue-400 hover:text-green-400 hover:scale-105 font-inter"
                  )
                )}
              >
                {item}
              </Link>
            ))}
            <Link href={dashboardRoute}>
              <div className="w-10 h-10 overflow-hidden rounded-full border-2 border-gray-300 p-1 hover:scale-110 transition-transform duration-300">
                <Image
                  src={user?.profilePicture || "/images/profile.webp"}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              </div>
            </Link>
            <button
              onClick={logout}
              className={twMerge(
                clsx(
                  "text-lg font-medium transition-transform duration-300",
                  "text-red-500 bg-gray-800/45 px-4 py-2 rounded-md shadow-md",
                  "hover:text-red-600 cursor-pointer hover:bg-gray-750/45 hover:scale-105 font-inter"
                )
              )}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}