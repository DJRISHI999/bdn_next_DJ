// filepath: e:\Projects\BDN_nextjs\frontend\bhoodhan\src\app\dashboard\admin\edit-assciates.tsx
"use client";

import { useEffect, useState } from "react";
import { Particles } from "@/components/magicui/particles";
import Link from "next/link";

// Extend Associate type to include parentId and _editingParentId for UI state
type Associate = {
  userId: string;
  name: string;
  level: string;
  commission: number;
  parentId?: string; // Add parentId for display and update
  _editingParentId?: string; // For UI input state only
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
  const [currentPage, setCurrentPage] = useState(1);
  const associatesPerPage = 2;

  // Message fade-out state
  const [showMessage, setShowMessage] = useState(false);

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

  // Show and auto-hide message with fade-out
  useEffect(() => {
    if (message) {
      setShowMessage(true);
      const timeout = setTimeout(() => {
        setShowMessage(false);
      }, 1000); // Show for 1 second
      return () => clearTimeout(timeout);
    }
  }, [message]);

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

  // Calculate current associates to display
  const indexOfLastAssociate = currentPage * associatesPerPage;
  const indexOfFirstAssociate = indexOfLastAssociate - associatesPerPage;
  const currentAssociates = associates.slice(indexOfFirstAssociate, indexOfLastAssociate);
  const totalPages = Math.ceil(associates.length / associatesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="relative h-full bg-transparent p-4 flex flex-col">
      <Particles className="absolute inset-0 -z-10" color="#707070" />
      {/* Page Content */}
      <div className="relative z-10 flex-grow flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 text-center sm:text-left">
              Edit Associates
            </h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400 text-center sm:text-left">
              View and manage associate details effectively.
            </p>
          </div>
          <div className="w-full sm:w-auto flex justify-end">
            <Link
              href="/"
              className="text-blue-500 hover:underline cursor-pointer whitespace-nowrap px-4 py-2 rounded-md border border-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-150"
            >
              &larr; Back to Home
            </Link>
          </div>
        </div>
        {/* Scrollable associates list */}
        <div className="mt-6 space-y-4 overflow-y-auto flex-1 pr-2 max-h-[calc(100vh-260px)]">
          {currentAssociates.map((associate) => (
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
              {/* Change Spouse (Parent) Column */}
              <div className="mt-4 sm:mt-0 sm:w-1/4 flex flex-col items-start">
                <label className="block text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                  Change Spouse (Parent):
                </label>
                {/* Inline input and button for changing parent */}
                <div className="flex w-full gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Enter new parent ID"
                    className="rounded-md border border-neutral-300 p-2 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 flex-1"
                    value={associate._editingParentId || ''}
                    onChange={e => {
                      const value = e.target.value;
                      setAssociates(prev => prev.map(a =>
                        a.userId === associate.userId ? { ...a, _editingParentId: value } : a
                      ));
                    }}
                  />
                  <button
                    className="rounded-md bg-blue-500 text-white px-3 py-1 text-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onClick={async () => {
                      const newParentId = associate._editingParentId?.trim();
                      if (newParentId && newParentId !== '') {
                        try {
                          const response = await fetch(`/api/associates/change-parent`, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ userId: associate.userId, parentId: newParentId }),
                          });
                          if (response.ok) {
                            setMessage("Parent updated successfully!");
                            setAssociates(prev => prev.map(a =>
                              a.userId === associate.userId ? { ...a, parentId: newParentId, _editingParentId: '' } : a
                            ));
                          } else {
                            const error = await response.json();
                            setMessage(error.error || "Failed to update parent.");
                          }
                        } catch {
                          setMessage("An error occurred while updating the parent.");
                        }
                      }
                    }}
                    type="button"
                  >
                    Change
                  </button>
                </div>
                {associate.parentId && (
                  <span className="text-xs text-neutral-500 mt-1">Current: {associate.parentId}</span>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* Message moved above pagination and outside scrollable area */}
        <div className="z-30 w-full flex justify-center mt-2 mb-2">
          <p
            className={`text-green-500 text-center bg-neutral-900 bg-opacity-80 px-4 py-2 rounded shadow-lg max-w-xs transition-opacity duration-700 ${showMessage ? 'opacity-100' : 'opacity-0'}`}
          >
            {message}
          </p>
        </div>
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-4 flex justify-center items-center space-x-4 bg-transparent z-20 sticky bottom-0 pb-2 pt-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300 dark:disabled:bg-neutral-700"
            >
              Previous
            </button>
            <span className="text-neutral-700 dark:text-neutral-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300 dark:disabled:bg-neutral-700"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}