import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, mobile, password } = await request.json();

    // Validate input
    if (!firstName || !lastName || !email || !mobile || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Connect to the database
    await connectToDatabase();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      mobile,
      password: hashedPassword,
      role: "customer", // Default role for normal customers
    });

    await newUser.save();

    return NextResponse.json({
      message: "Registration successful",
      user: { firstName, lastName, email, mobile },
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}