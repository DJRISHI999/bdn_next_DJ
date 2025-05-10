"use client"; // Mark this as a Client Component

import "./../../globals.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout bg-background text-foreground">
      <main>{children}</main>
    </div>
  );
}