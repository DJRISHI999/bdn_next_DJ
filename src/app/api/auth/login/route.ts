import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Parse the request body
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Ensure JWT_SECRET is defined
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("JWT_SECRET is not defined in the environment variables.");
      return NextResponse.json(
        { error: "Internal server error. Please try again later." },
        { status: 500 }
      );
    }

    // Generate a JWT
    const token = jwt.sign(
      { userId: user.userId, role: user.role, email: user.email }, // Payload
      jwtSecret, // Secret key
      { expiresIn: "1h" } // Token expiration
    );

    // Debugging log (remove in production)
    console.log("Generated Token:", token);

    // Return success response with the token, expiration time, and user details
    return NextResponse.json(
      {
        message: "Login successful!",
        token,
        expiresIn: 3600, // Token expiration in seconds
        user: {
          userId: user.userId,
          role: user.role,
          email: user.email,
          name: user.name || "User", // Fallback to "User" if name is not set
          profilePicture: user.profilePicture || "/images/profile.webp", // Fallback to default profile picture
        },
      },
      { status: 200 }
    );
  } catch (error) {
    // Improved error handling
    console.error("Login error:", error instanceof Error ? error.message : error);

    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}