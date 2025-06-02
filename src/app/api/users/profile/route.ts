import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";

export async function GET(request: Request) {
  const token = request.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
  }

  try {
    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const { userId } = decoded;

    // Connect to the database
    await connectToDatabase();

    // Find the user by userId
    const user = await User.findOne({ userId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return the user details
    return NextResponse.json({
      userId: user.userId,
      level: user.level,
      name: user.name,
      email: user.email,
      role: user.role,
      profilePicture: user.profilePicture && user.profilePicture.trim() !== "" 
        ? user.profilePicture 
        : "/images/profile.webp", // Use default only if profilePicture is null or empty
      phoneNumber: user.phoneNumber,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);

    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 403 });
    }

    return NextResponse.json({ error: "Failed to fetch user details" }, { status: 500 });
  }
}