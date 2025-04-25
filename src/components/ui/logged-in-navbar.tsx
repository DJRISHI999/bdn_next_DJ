"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";

export default function LoggedInNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Mock user data (replace with actual user data from context or API)
  const user = {
    role: "customer", // Can be "admin", "associate", or "customer"
    profilePicture: "/images/profile.webp", // Replace with actual profile picture URL
  };

  // Determine the dashboard route based on the user's role
  const dashboardRoute =
    user.role === "admin"
      ? "/dashboard/admin"
      : user.role === "associate"
      ? "/dashboard/associate"
      : "/dashboard/customer";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full bg-black/45 backdrop-blur-md text-white shadow-lg z-50 border-b border-yellow-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <div className="flex items-center">
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
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-blue-400 hover:text-green-400 hover:scale-105 font-inter text-lg font-medium transition-transform duration-300"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-blue-400 hover:text-green-400 hover:scale-105 font-inter text-lg font-medium transition-transform duration-300"
            >
              About
            </Link>
            {/* Profile Image */}
            <Link href={dashboardRoute}>
              <Image
                src={user.profilePicture}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full cursor-pointer hover:scale-110 transition-transform duration-300"
              />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-200 hover:text-white focus:outline-none transition-colors duration-300"
            >
              {isMenuOpen ? (
                <IconX className="h-6 w-6" />
              ) : (
                <IconMenu2 className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-gray-800/90 backdrop-blur-md pb-4"
        >
          <Link
            href="/"
            className="block px-4 py-2 text-lg text-blue-400 hover:text-green-400 hover:scale-105 font-inter transition-transform duration-300"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block px-4 py-2 text-lg text-blue-400 hover:text-green-400 hover:scale-105 font-inter transition-transform duration-300"
          >
            About
          </Link>
          {/* Profile Image */}
          <Link href={dashboardRoute} className="block px-4 py-2">
            <Image
              src={user.profilePicture}
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full mx-auto hover:scale-110 transition-transform duration-300"
            />
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
}