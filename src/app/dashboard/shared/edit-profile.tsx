"use client";

import React, { useState, useEffect } from "react";
import { Particles } from "@/components/magicui/particles";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

export default function EditProfile() {
  const [profilePic, setProfilePic] = useState<string | File | null>(null); // Handle both URL and File
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userId, setUserId] = useState(""); // Store the user ID
  const [password, setPassword] = useState(""); // Store the new password
  const [message, setMessage] = useState<string | null>(null);
  const [isChanged, setIsChanged] = useState(false); // Track if any field is changed
  const [error, setError] = useState<string | null>(null); // Track errors
  const [level, setLevel] = useState(""); // Store the user level
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found. Redirecting to login.");
        window.location.href = "/login"; // Redirect to login if no token is found
        return;
      }

      try {
        const response = await fetch("/api/users/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error fetching user details:", errorData.error || "Unknown error occurred");
          if (response.status === 401 || response.status === 403) {
            window.location.href = "/login"; // Redirect to login if unauthorized
          } else {
            setError(errorData.error || "Failed to fetch user details.");
          }
          return;
        }

        const data = await response.json();
        console.log("User details fetched successfully:", data);

        setName(data.name || "");
        setEmail(data.email || "");
        setPhoneNumber(data.phoneNumber || "");
        setUserId(data.userId || "");
        setLevel(data.level || "");
        setProfilePic(data.profilePicture || null); // Set the profile picture from the API response
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("Failed to fetch user details. Please try again later.");
      }
    };

    fetchUserDetails();
  }, []);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    setIsChanged(true);
  };

  const handleCopyUserId = () => {
    navigator.clipboard.writeText(userId).then(() => {
      setMessage("User ID copied to clipboard!");
      setTimeout(() => setMessage(null), 3000); // Clear the message after 3 seconds
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("You are not logged in.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    if (password) formData.append("password", password);
    if (profilePic && profilePic instanceof File) {
      formData.append("profilePicture", profilePic); // Append the actual file
    }

    try {
      const response = await fetch("/api/users/update-profile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Profile updated successfully!");
        setIsChanged(false); // Reset the change tracker
      } else {
        setMessage(data.error || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Failed to update profile. Please try again later.");
    }
  };

  const handleUpdatePassword = async () => {
    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("OTP sent to your email. Please check your inbox.");
        window.location.href = `/verify-otp?email=${encodeURIComponent(email)}`;
      } else {
        setMessage(data.error || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      setMessage("Failed to send OTP. Please try again later.");
    }
  };

  return (
    <div className="relative h-full bg-transparent p-4 overflow-auto max-h-[90vh]">
      {/* <Particles className="absolute inset-0 -z-10" /> */}

      {/* Page Content */}
      <div className="relative z-10 max-w-3xl mx-auto p-4 bg-transparent rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-neutral-800 dark:text-neutral-200">
          Edit Profile
        </h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Update your personal details and manage your account settings here.
        </p>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Picture */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Profile Picture
            </label>
            <div className="mt-2 flex items-center space-x-4">
              <Image
                src={
                  profilePic instanceof File
                    ? URL.createObjectURL(profilePic)
                    : profilePic || "/images/profile.webp"
                }
                alt="Profile"
                className="h-16 w-16 rounded-full object-cover "
                width={64}
                height={64}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    setProfilePic(file); // Store the actual file
                    setIsChanged(true);
                  }
                }}
                className="text-sm text-neutral-600 dark:text-neutral-300 cursor-pointer"
              />
            </div>
          </div>

          {/* User ID */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              User ID
            </label>
            <div className="mt-2 flex items-center space-x-2">
              <input
                type="text"
                value={userId}
                disabled
                className="w-full rounded-md border border-neutral-300 p-2 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
              />
              <button
                type="button"
                onClick={handleCopyUserId}
                className="rounded-md bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:ring-offset-neutral-800"
              >
                Copy
              </button>
            </div>
          </div>

          {/* User Level */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Level
            </label>
            <input
              type="text"
              value={level}
              disabled
              className="mt-2 w-full rounded-md border border-neutral-300 p-2 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
            />
          </div>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={handleInputChange(setName)}
              placeholder="Enter your name"
              className="mt-2 w-full rounded-md border border-neutral-300 p-2 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={handleInputChange(setEmail)}
              placeholder="Enter your email"
              className="mt-2 w-full rounded-md border border-neutral-300 p-2 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={handleInputChange(setPhoneNumber)}
              placeholder="Enter your phone number"
              className="mt-2 w-full rounded-md border border-neutral-300 p-2 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Update Password
            </label>
            <button
              type="button"
              onClick={handleUpdatePassword}
              className="mt-2 w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:ring-offset-neutral-800 cursor-pointer"
            >
              Update Password
            </button>
          </div>

          {/* Submit Button */}
          {isChanged && (
            <div className="mt-6">
              <button
                type="submit"
                className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:ring-offset-neutral-800"
              >
                Update Profile
              </button>
            </div>
          )}
        </form>
        <div className="mt-4 min-h-[2rem]">
          {message && (
            <p className="text-sm text-green-500 dark:text-green-400">
              {message}
            </p>
          )}
          {error && (
            <p className="text-sm text-red-500 dark:text-red-400">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}