"use client"; // Mark this as a Client Component

import "./../../globals.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <main>{children}</main>
      </body>
    </html>
  );
}