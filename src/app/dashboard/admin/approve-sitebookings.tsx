// filepath: e:\Projects\BDN_nextjs\frontend\bhoodhan\src\app\dashboard\admin\approve-sitebookings.tsx
"use client";

import { Particles } from "@/components/magicui/particles";
import Link from "next/link";

export default function ApproveSiteBookings() {
  return (
    <div className="relative h-full bg-transparent p-4">
      

      {/* Page Content */}
      <div className="relative z-10">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
          Approve Site Bookings
        </h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          This page allows you to approve or reject site booking requests. Use
          the options below to manage bookings effectively.
        </p>
      </div>

      {/* Back to Home Button */}
      <div className="absolute top-4 right-4 z-20">
        <Link
          href="/"
          className="text-blue-500 hover:underline cursor-pointer"
        >
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
}