// filepath: e:\Projects\BDN_nextjs\frontend\bhoodhan\src\app\dashboard\admin\edit-assciates.tsx
"use client";

import { Particles } from "@/components/magicui/particles";

export default function EditAssociates() {
  return (
    <div className="relative h-full bg-transparent p-4">
      {/* Particle Effect */}
      <div className="absolute inset-0 z-0">
        <Particles
          quantity={80}
          staticity={40}
          ease={40}
          size={0.5}
          color="#ffffff"
        />
      </div>

      {/* Page Content */}
      <div className="relative z-10">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
          Edit Associates
        </h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          View and manage associate details effectively.
        </p>
      </div>
    </div>
  );
}