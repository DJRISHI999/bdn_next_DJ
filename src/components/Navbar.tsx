"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            {["Home", "About", "Login", "Sign Up"].map((item, index) => (
              <Link
                key={index}
                href={`/${item.toLowerCase()}`}
                className={twMerge(
                  clsx(
                    "text-lg font-medium transition-transform duration-300",
                    item === "Sign Up"
                      ? "bg-green-500 text-white px-6 py-3 rounded-full hover:bg-orange-500 hover:scale-110 shadow-md font-outfit"
                      : "text-blue-400 hover:text-green-400 hover:scale-105 font-inter"
                  )
                )}
              >
                {item}
              </Link>
            ))}
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
          {["Home", "About", "Login", "Sign Up"].map((item, index) => (
            <Link
              key={index}
              href={`/${item.toLowerCase()}`}
              className={twMerge(
                clsx(
                  "block px-4 py-2 text-lg transition-transform duration-300",
                  item === "Sign Up"
                    ? "bg-green-500 text-white hover:bg-orange-500 hover:scale-110 rounded-md mx-4 mt-2 shadow-md font-outfit"
                    : "text-blue-400 hover:text-green-400 hover:scale-105 font-inter"
                )
              )}
            >
              {item}
            </Link>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}