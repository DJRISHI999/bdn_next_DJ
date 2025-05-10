import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";

export async function PUT(
  request: Request,
  context: { params: { userId: string } }
) {
  const { userId } = context.params;

  try {
    // Parse the request body
    const updates = await request.json();

    // Validate the updates
    if (!updates.level && updates.commission === undefined) {
      return NextResponse.json(
        { error: "Invalid update data." },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectToDatabase();

    // Find and update the associate
    const updatedAssociate = await User.findOneAndUpdate(
      { userId, role: "associate" },
      { $set: updates },
      { new: true } // Return the updated document
    );

    if (!updatedAssociate) {
      return NextResponse.json(
        { error: "Associate not found." },
        { status: 404 }
      );
    }

    // Return the updated associate
    return NextResponse.json(updatedAssociate, { status: 200 });
  } catch (error) {
    console.error("Error updating associate:", error);
    return NextResponse.json(
      { error: "Failed to update associate." },
      { status: 500 }
    );
  }
}