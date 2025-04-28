import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";

export async function POST(request: Request) {
  try {
    console.log("Connecting to database...");
    await connectToDatabase();
    console.log("Connected to database.");

    const { firstName, lastName, mobile, email, referralCode } = await request.json();
    console.log("Request data:", { firstName, lastName, mobile, email, referralCode });

    // Validate input
    if (!firstName || !lastName || !mobile || !email || !referralCode) {
      console.error("Validation failed: Missing required fields.");
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    // Check if the referral code is valid
    const referrer = await User.findOne({ userId: referralCode });
    if (!referrer) {
      console.error("Invalid referral code:", referralCode);
      return NextResponse.json({ error: "Invalid referral code." }, { status: 400 });
    }

    // Create the new associate
    const newUser = new User({
      name: `${firstName} ${lastName}`, // Combine firstName + lastName into name
      email,
      password: "defaultpassword", // Dummy password (can be reset later)
      role: "associate", // Set role to "associate"
      phoneNumber: mobile, // Map mobile to phoneNumber
      referralCode,
      parentId: referrer.userId, // Set parentId as referrer.userId
    });

    await newUser.save();
    console.log("New associate created successfully.");

    return NextResponse.json({ message: "Associate signed up successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Error in associate signup:", error);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}