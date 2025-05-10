"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext"; // Import AuthContext

// Define the type for the tree structure
type TreeNodeType = {
  name: string;
  userId: string;
  children?: TreeNodeType[];
};

const TreeNode = React.memo(({ node }: { node: TreeNodeType }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="ml-4">
      <div
        className="font-bold text-neutral-800 dark:text-neutral-200 cursor-pointer hover:text-blue-500"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {node.name} {node.children && (isExpanded ? "[-]" : "[+]")}
      </div>
      {isExpanded && node.children && (
        <div className="ml-4 border-l-2 border-neutral-300 dark:border-neutral-600 pl-2">
          {node.children.map((child) => (
            <TreeNode key={child.userId} node={child} />
          ))}
        </div>
      )}
    </div>
  );
});

TreeNode.displayName = "TreeNode";

export default function TreeView() {
  const { user } = useAuth(); // Retrieve user from AuthContext
  const [treeData, setTreeData] = useState<TreeNodeType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTreeData = async () => {
      try {
        if (!user?.userId) {
          setError("User not logged in.");
          return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication token is missing.");
          return;
        }

        const response = await fetch(`/api/users/${user.userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("API Error:", errorData); // Log the error response
          setError(errorData.error || "Failed to fetch tree data.");
          return;
        }

        const data: TreeNodeType = await response.json();
        console.log("Fetched Tree Data:", data); // Log the fetched data
        setTreeData(data);
      } catch (fetchError) {
        console.error("Error fetching tree data:", fetchError); // Log the error
        setError("An error occurred while fetching tree data.");
      }
    };

    fetchTreeData();
  }, [user?.userId]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!treeData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="relative h-full bg-transparent p-4">
      <div className="relative z-10">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
          Tree View
        </h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Visualize hierarchical data effectively using this tree view.
        </p>
        <div className="mt-4">
          <TreeNode node={treeData} />
        </div>
      </div>
      <div className="absolute top-4 right-4 z-20">
        <Link href="/" className="text-blue-500 hover:underline cursor-pointer">
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
}