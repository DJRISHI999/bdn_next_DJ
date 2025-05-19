import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/models/User";
import clientPromise from "@/lib/mongo";
import { connectToDatabase } from "@/lib/db"; // Use your db.ts connection

export async function POST(req: NextRequest) {
  const { email, otp, password } = await req.json();

  if (!email || !otp || !password) {
    return NextResponse.json({ error: "Email, OTP, and password are required" }, { status: 400 });
  }

  try {
    // Native driver for OTP lookup
    const client = await clientPromise;
    const db = client.db();
    console.log("Reset password for email:", email);
    const record = await db.collection("otps").findOne({ email });
    console.log("OTP record found:", record);

    if (!record) {
      return NextResponse.json({ error: "No OTP found for this email" }, { status: 404 });
    }

    // Check if OTP is expired
    if (Date.now() > record.expiresAt) {
      await db.collection("otps").deleteOne({ email }); // Clean up expired OTP
      return NextResponse.json({ error: "OTP has expired" }, { status: 400 });
    }

    // Verify OTP
    if (record.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    // OTP is valid, clean up the store
    await db.collection("otps").deleteOne({ email });

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Ensure Mongoose is connected before using User model
    await connectToDatabase();

    // Update the user's password in the database
    const updateResult = await User.updateOne({ email }, { password: hashedPassword });

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json({ error: "No user found with this email" }, { status: 404 });
    }

    return NextResponse.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json({ error: "Failed to reset password. Please try again." }, { status: 500 });
  }
}