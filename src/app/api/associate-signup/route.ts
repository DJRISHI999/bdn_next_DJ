import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { firstName, lastName, mobile, email, referralCode } = body;

    // Validate input
    if (!firstName || !lastName || !mobile || !email || !referralCode) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Check if the referral code is valid
    const referrer = await User.findOne({ referralCode });
    if (!referrer) {
      return NextResponse.json(
        { error: "Invalid referral code." },
        { status: 400 }
      );
    }

    // Create the new associate
    const newUser = new User({
      firstName,
      lastName,
      mobile,
      email,
      referralCode,
      parentId: referrer._id, // Link the associate to the referrer
    });

    await newUser.save();

    return NextResponse.json(
      { message: "Associate signed up successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in associate signup:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}