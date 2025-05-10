"use client";

import "./../../globals.css";

export default function AssociateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="associate-layout bg-background text-foreground">
      <main>{children}</main>
    </div>
  );
}