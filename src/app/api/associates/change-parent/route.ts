import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";

// PUT /api/associates/change-parent
export async function PUT(request: Request) {
  try {
    const { userId, parentId } = await request.json();
    if (!userId || !parentId) {
      return NextResponse.json({ error: "userId and parentId are required." }, { status: 400 });
    }
    await connectToDatabase();
    const updatedAssociate = await User.findOneAndUpdate(
      { userId, role: "associate" },
      { $set: { parentId } },
      { new: true }
    );
    if (!updatedAssociate) {
      return NextResponse.json({ error: "Associate not found." }, { status: 404 });
    }
    return NextResponse.json(updatedAssociate, { status: 200 });
  } catch (error) {
    console.error("Error updating parent:", error);
    return NextResponse.json({ error: "Failed to update parent." }, { status: 500 });
  }
}
