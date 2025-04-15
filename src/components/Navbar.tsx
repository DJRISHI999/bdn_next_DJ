"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-850/80 backdrop-blur-md text-white shadow-lg z-50 border-b border-yellow-700">
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
              className="text-lg font-medium text-blue-400 hover:text-green-400 hover:scale-105 transition-transform duration-300 font-inter"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-lg font-medium text-blue-400 hover:text-green-400 hover:scale-105 transition-transform duration-300 font-inter"
            >
              About
            </Link>
            <Link
              href="/login"
              className="text-lg font-medium text-blue-400 hover:text-green-400 hover:scale-105 transition-transform duration-300 font-inter"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="text-lg font-medium bg-green-500 text-white px-6 py-3 rounded-full hover:bg-orange-500 hover:scale-110 shadow-md transition-transform duration-300 font-outfit"
            >
              Signup
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-200 hover:text-white focus:outline-none transition-colors duration-300"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800/90 backdrop-blur-md">
          <Link
            href="/"
            className="block px-4 py-2 text-lg text-blue-400 hover:text-green-400 hover:scale-105 transition-transform duration-300 font-inter"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block px-4 py-2 text-lg text-blue-400 hover:text-green-400 hover:scale-105 transition-transform duration-300 font-inter"
          >
            About
          </Link>
          <Link
            href="/login"
            className="block px-4 py-2 text-lg text-blue-400 hover:text-green-400 hover:scale-105 transition-transform duration-300 font-inter"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="block px-4 py-2 text-lg bg-green-500 text-white hover:bg-orange-500 hover:scale-110 rounded-md mx-4 mt-2 shadow-md transition-transform duration-300 font-outfit"
          >
            Signup
          </Link>
        </div>
      )}
    </nav>
  );
}