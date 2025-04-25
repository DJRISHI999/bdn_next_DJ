import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";

export async function GET() {
  try {
    await connectToDatabase();
    return NextResponse.json({ message: "Database connection successful" });
  } catch (error) {
    // Safely handle the error
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ message: "Database connection failed", error: errorMessage }, { status: 500 });
  }
}