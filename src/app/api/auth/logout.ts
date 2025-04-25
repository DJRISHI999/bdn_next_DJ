import { NextResponse } from "next/server";

export async function POST() {
  // Handle logout logic (e.g., clear tokens or sessions)
  return NextResponse.json({ message: "Logout successful" });
}