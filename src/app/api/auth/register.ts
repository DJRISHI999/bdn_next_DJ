import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password, name } = await request.json();

  // Create a new user (replace with your logic)
  const newUser = { id: 1, email, name };

  return NextResponse.json({ message: "Registration successful", user: newUser });
}