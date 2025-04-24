"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { IconArrowLeft, IconSettings, IconUserBolt, IconTree } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import EditProfile from "./edit-profile";
import EditAssociates from "./edit-assciates";
import ApproveSiteBookings from "./approve-sitebookings";
import TreeView from "./tree-view";
import { Particles } from "@/components/magicui/particles";

export default function SidebarDemo() {
  const [activeSection, setActiveSection] = useState("tree-view"); // Default section is Tree View

  // Redirect to home if "logout" is clicked
  useEffect(() => {
    if (activeSection === "logout") {
      window.location.href = "/"; // Replace "/" with your home route
    }
  }, [activeSection]);

  const links = [
    {
      label: "Profile",
      href: "#edit-profile",
      icon: (
        <img
          src="https://assets.aceternity.com/manu.png" // Replace with the actual profile photo URL
          className="h-7 w-7 shrink-0 rounded-full"
          alt="Profile"
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
          "relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col overflow-hidden rounded-md bg-gray-850/45 backdrop-blur-sm md:flex-row dark:bg-gray-850/45 backdrop-blur-sm",
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
                    onClick={() => setActiveSection(link.section)} // Set the active section on click
                  />
                ))}
              </div>
            </div>
          </SidebarBody>
        </Sidebar>
        <div className="flex-1 p-4">
          {activeSection === "edit-profile" && <EditProfile />}
          {activeSection === "edit-associates" && <EditAssociates />}
          {activeSection === "approve-site-bookings" && <ApproveSiteBookings />}
          {activeSection === "tree-view" && <TreeView />}
          {activeSection === "logout" && <div>Logging out...</div>}
        </div>
      </div>
    </div>
  );
}


