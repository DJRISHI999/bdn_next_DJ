import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";

export async function GET() {
  await connectToDatabase();

  const users = await User.find(); // Fetch all users
  return NextResponse.json(users);
}