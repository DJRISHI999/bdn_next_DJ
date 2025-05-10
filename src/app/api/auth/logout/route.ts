import { NextResponse } from "next/server";

export async function POST() {
  try {
    console.log("Logout API called"); // Debugging log

    // Clear the token cookie
    const response = NextResponse.json({ message: "Logout successful" });
    response.cookies.set("token", "", { httpOnly: true, maxAge: 0, path: "/" }); // Clear the token cookie
    console.log("Token cookie cleared"); // Debugging log

    // Optionally, include a client-side instruction to clear localStorage
    response.headers.set("Clear-LocalStorage", "true");

    return response;
  } catch (error) {
    console.error("Error in logout API:", error); // Debugging log
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}