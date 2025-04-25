// filepath: e:\Projects\BDN_nextjs\frontend\bhoodhan\src\app\dashboard\admin\edit-assciates.tsx
"use client";

import { useEffect, useState } from "react";
import { Particles } from "@/components/magicui/particles";

// Define the type for an Associate
type Associate = {
  userId: string;
  name: string;
  level: string;
  commission: number;
};

// Define the commission rates
const commissionRates: Record<string, number> = {
  BEGINNER: 500,
  STARTER: 600,
  "SALES EXECUTIVE": 700,
  "SR. SALES EXECUTIVE": 800,
  "STAR SALES EXECUTIVE": 900,
  "SALES LEADER": 1000,
  "SR. SALES LEADER": 1050,
  "STAR SALES LEADER": 1100,
  "SALES MANAGER": 1150,
  "SR. SALES MANAGER": 1200,
  PEARL: 1250,
  "STAR PEARL": 1300,
  EMERALD: 1350,
  "STAR EMERALD": 1400,
  RUBY: 1450,
  "STAR RUBY": 1500,
  SHAFIRE: 1550,
  "STAR SHAFIRE": 1600,
  DIAMOND: 1650,
  "STAR DIAMOND": 1700,
};

export default function EditAssociates() {
  const [associates, setAssociates] = useState<Associate[]>([]); // Use the Associate type
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // Fetch all associates
    const fetchAssociates = async () => {
      const response = await fetch("/api/associates");
      const data: Associate[] = await response.json(); // Ensure the response matches the Associate type
      setAssociates(data);
    };

    fetchAssociates();
  }, []);

  const handleUpdate = async (userId: string, updates: { level?: string; commission?: number }) => {
    try {
      const response = await fetch(`/api/associates/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        setMessage("Associate updated successfully!");
        const updatedAssociate: Associate = await response.json();
        setAssociates((prev) =>
          prev.map((associate) => (associate.userId === userId ? updatedAssociate : associate))
        );
      } else {
        const error = await response.json();
        setMessage(error.message || "Failed to update associate.");
      }
    } catch {
      setMessage("An error occurred while updating the associate.");
    }
  };

  return (
    <div className="relative h-full bg-transparent p-4">
      {/* Particle Effect */}
      <div className="absolute inset-0 z-0">
        <Particles quantity={80} staticity={40} ease={40} size={0.5} color="#ffffff" />
      </div>

      {/* Page Content */}
      <div className="relative z-10">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">Edit Associates</h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          View and manage associate details effectively.
        </p>

        <div className="mt-6 space-y-4">
          {associates.map((associate) => (
            <div key={associate.userId} className="p-4 bg-white dark:bg-neutral-800 rounded-md shadow">
              <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                {associate.name} ({associate.userId})
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Level: {associate.level} | Commission: {associate.commission}
              </p>
              <div className="mt-4 flex flex-col space-y-2">
                {/* Dropdown for Levels */}
                <select
                  className="w-full rounded-md border border-neutral-300 p-2 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
                  value={associate.level}
                  onChange={(e) =>
                    handleUpdate(associate.userId, { level: e.target.value })
                  }
                >
                  {Object.keys(commissionRates).map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>

                {/* Reset to Beginner Button */}
                <button
                  onClick={() => handleUpdate(associate.userId, { level: "BEGINNER" })}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Reset to Beginner
                </button>
              </div>
            </div>
          ))}
        </div>
        {message && <p className="mt-4 text-green-500">{message}</p>}
      </div>

      {/* Back to Home Link */}
      <div className="absolute top-4 right-4 z-20">
        <a href="/" className="text-blue-500 hover:underline cursor-pointer">
          &larr; Back to Home
        </a>
      </div>
    </div>
  );
}