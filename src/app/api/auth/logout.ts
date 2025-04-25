import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Clear the authentication token (e.g., by setting an expired cookie)
    const response = NextResponse.json({ message: "Logout successful" });
    response.cookies.set("token", "", { httpOnly: true, maxAge: 0, path: "/" }); // Clear the token cookie
    return response;
  } catch (error) {
    console.error("Error during logout:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}