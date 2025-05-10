// filepath: e:\Projects\BDN_nextjs\frontend\bhoodhan\src\app\dashboard\admin\edit-assciates.tsx
"use client";

import { useEffect, useState } from "react";
import { Particles } from "@/components/magicui/particles";
import Link from "next/link";

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
    const fetchAssociates = async () => {
      try {
        const response = await fetch("/api/associates");
        const result = await response.json(); // Parse the response as JSON

        // Ensure the response contains an array of associates
        const associates = result.associates || result; // Use result.associates if the response is an object
        if (!Array.isArray(associates)) {
          throw new Error("Invalid data format: Expected an array of associates.");
        }

        // Sort associates by level (highest to lowest)
        const sortedAssociates = associates.sort(
          (a, b) =>
            Object.keys(commissionRates).indexOf(b.level) -
            Object.keys(commissionRates).indexOf(a.level)
        );

        setAssociates(sortedAssociates);
      } catch (error) {
        console.error("Error fetching associates:", error);
        setMessage("Failed to fetch associates.");
      }
    };

    fetchAssociates();
  }, []);

  const handleUpdate = async (userId: string, updates: { level?: string; commission?: number }) => {
    try {
      // If the level is updated, automatically set the corresponding commission
      if (updates.level) {
        updates.commission = commissionRates[updates.level];
      }

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

        // Update the associate in the list
        setAssociates((prev) =>
          prev
            .map((associate) =>
              associate.userId === userId
                ? { ...associate, level: updates.level!, commission: updates.commission! }
                : associate
            )
            .sort(
              (a, b) =>
                Object.keys(commissionRates).indexOf(b.level) -
                Object.keys(commissionRates).indexOf(a.level)
            ) // Re-sort after update
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
      

      {/* Page Content */}
      <div className="relative z-10">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 text-center sm:text-left">
          Edit Associates
        </h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400 text-center sm:text-left">
          View and manage associate details effectively.
        </p>

        <div className="mt-6 space-y-4">
          {associates.map((associate) => (
            <div
              key={associate.userId}
              className="p-4 bg-white dark:bg-neutral-800 rounded-md shadow flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="sm:w-1/2">
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                  {associate.name} ({associate.userId})
                </h3>
              </div>
              <div className="mt-4 sm:mt-0 sm:w-1/4">
                <label className="block text-sm text-neutral-600 dark:text-neutral-400">
                  Level:
                </label>
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
              </div>
              <div className="mt-4 sm:mt-0 sm:w-1/4">
                <label className="block text-sm text-neutral-600 dark:text-neutral-400">
                  Commission:
                </label>
                <p className="w-full rounded-md border border-neutral-300 p-2 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200">
                  {commissionRates[associate.level]}
                </p>
              </div>
            </div>
          ))}
        </div>
        {message && <p className="mt-4 text-green-500 text-center">{message}</p>}
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