// filepath: e:\Projects\BDN_nextjs\frontend\bhoodhan\src\app\dashboard\admin\tree-view.tsx
"use client";

import React from "react";

// Define the type for the tree structure
type TreeNodeType = {
  name: string;
  children?: TreeNodeType[];
};

// Sample data for the tree structure
const treeData: TreeNodeType = {
  name: "Admin",
  children: [
    {
      name: "ass1",
      children: [
        { name: "ass1-child1" },
        { name: "ass1-child2" },
        { name: "ass1-child3" },
        { name: "ass1-child4" },
        { name: "ass1-child5" },
      ],
    },
    {
      name: "ass2",
      children: [
        { name: "ass2-child1" },
        { name: "ass2-child2" },
        { name: "ass2-child3" },
        { name: "ass2-child4" },
        { name: "ass2-child5" },
      ],
    },
    {
      name: "ass3",
      children: [
        { name: "ass3-child1" },
        { name: "ass3-child2" },
        { name: "ass3-child3" },
        { name: "ass3-child4" },
        { name: "ass3-child5" },
      ],
    },
  ],
};

// Recursive TreeNode component with expand/collapse functionality
const TreeNode = React.memo(({ node }: { node: TreeNodeType }) => {
  const [isExpanded, setIsExpanded] = React.useState(true);

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
          {node.children.map((child, index) => (
            <TreeNode key={index} node={child} />
          ))}
        </div>
      )}
    </div>
  );
});

export default function TreeView() {
  return (
    <div className="relative h-full bg-transparent p-4">
      {/* Page Content */}
      <div className="relative z-10">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
          Tree View
        </h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Visualize hierarchical data effectively using this tree view.
        </p>

        {/* Render the tree */}
        <div className="mt-4">
          <TreeNode node={treeData} />
        </div>
      </div>

      {/* Back to Home Link */}
      <div className="absolute top-4 right-4 z-20">
        <a
          href="/"
          className="text-blue-500 hover:underline cursor-pointer"
        >
          &larr; Back to Home
        </a>
      </div>
    </div>
  );
}