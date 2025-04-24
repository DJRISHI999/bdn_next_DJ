"use client";

import "./../../globals.css";

export default function AssociateLayout({
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