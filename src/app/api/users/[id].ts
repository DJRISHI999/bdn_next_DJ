import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";

// Define the type for the tree structure
type TreeNode = {
  name: string;
  userId: string;
  children: TreeNode[];
};

async function buildTree(userId: string): Promise<TreeNode[]> {
  const children = await User.find({ parentId: userId });
  const tree: TreeNode[] = await Promise.all(
    children.map(async (child) => ({
      name: child.name,
      userId: child.userId,
      children: await buildTree(child.userId), // Recursively fetch children
    }))
  );
  return tree;
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await connectToDatabase();

    // Fetch the root user
    const user = await User.findOne({ userId: id });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Build the tree starting from the user
    const tree: TreeNode = {
      name: user.name,
      userId: user.userId,
      children: await buildTree(user.userId),
    };

    return NextResponse.json(tree);
  } catch (error) {
    console.error("Error fetching tree data:", error);
    return NextResponse.json({ error: "Failed to fetch tree data" }, { status: 500 });
  }
}