"use client";

import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { IconArrowLeft, IconSettings, IconUserBolt, IconTree } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import EditProfile from "../shared/edit-profile";
import EditAssociates from "./edit-assciates";
import ApproveSiteBookings from "./approve-sitebookings";
import TreeView from "../shared/tree-view";
import { Particles } from "@/components/magicui/particles";
import { useAuth } from "@/context/AuthContext"; // Import AuthContext

export default function SidebarDemo() {
  const { user, logout } = useAuth(); // Retrieve user and logout function from AuthContext
  const [activeSection, setActiveSection] = useState("tree-view"); // Default section is Tree View
  const [isLoggingOut, setIsLoggingOut] = useState(false); // Add a loading state for logout

  // Handle logout
  const handleLogout = () => {
    setIsLoggingOut(true); // Set loading state
    logout(); // Clear authentication state
    setTimeout(() => {
      window.location.href = "/"; // Redirect to home page after logout
    }, 500); // Add a slight delay for better UX
  };

  const links = [
    {
      label: "Profile",
      href: "#edit-profile",
      icon: (
        <Image
          src={user?.profilePicture || "/images/profile.webp"} // Use default profile image if not set
          className="h-7 w-7 shrink-0 rounded-full"
          alt="Profile"
          width={28}
          height={28}
        />
      ),
      section: "edit-profile",
    },
    {
      label: "Edit Associates",
      href: "#edit-associates",
      icon: <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
      section: "edit-associates",
    },
    {
      label: "Approve Site Bookings",
      href: "#approve-site-bookings",
      icon: <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
      section: "approve-site-bookings",
    },
    {
      label: "Tree View",
      href: "#tree-view",
      icon: <IconTree className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
      section: "tree-view",
    },
    {
      label: "Logout",
      href: "#",
      icon: <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
      section: "logout",
    },
  ];

  return (
    <div className="relative h-screen bg-transparent overflow-hidden">
      {/* Particle Effect */}
      <div className="absolute inset-0 z-0">
        <Particles
          quantity={100}
          staticity={50}
          ease={50}
          size={0.5}
          color="#ffffff"
        />
      </div>

      {/* Main Content */}
      <div
        className={cn(
          "relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col overflow-hidden rounded-md bg-gray-850/45 md:flex-row dark:bg-gray-850/45",
          "h-screen"
        )}
      >
        <Sidebar>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink
                    key={idx}
                    link={link}
                    onClick={() =>
                      link.section === "logout" ? handleLogout() : setActiveSection(link.section)
                    } // Handle logout or set active section
                  />
                ))}
              </div>
            </div>
          </SidebarBody>
        </Sidebar>
        <div className="flex-1 p-4">
          {/* Render Active Section */}
          {isLoggingOut ? (
            <div>Logging out...</div> // Show loading state during logout
          ) : (
            <>
              {activeSection === "edit-profile" && <EditProfile />}
              {activeSection === "edit-associates" && <EditAssociates />}
              {activeSection === "approve-site-bookings" && <ApproveSiteBookings />}
              {activeSection === "tree-view" && <TreeView />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}


