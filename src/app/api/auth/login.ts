import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Validate credentials (replace with your logic)
  if (email === "test@example.com" && password === "password") {
    return NextResponse.json({ message: "Login successful", token: "fake-jwt-token" });
  }

  return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
}