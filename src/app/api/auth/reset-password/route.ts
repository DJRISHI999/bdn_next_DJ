import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/models/User";
import clientPromise from "@/lib/mongo";
import { connectToDatabase } from "@/lib/db"; // Use your db.ts connection

export async function POST(req: NextRequest) {
  const { email, otp, password } = await req.json();
  const authHeader = req.headers.get("authorization");
  let isAuthenticated = false;

  // Check for Bearer token (simple check, you may want to verify the token for extra security)
  if (authHeader && authHeader.startsWith("Bearer ")) {
    isAuthenticated = true;
  }

  if (!email || !password || (!isAuthenticated && !otp)) {
    return NextResponse.json({ error: isAuthenticated ? "Email and password are required" : "Email, OTP, and password are required" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    // If not authenticated, require OTP validation
    if (!isAuthenticated) {
      const record = await db.collection("otps").findOne({ email });
      if (!record) {
        return NextResponse.json({ error: "No OTP found for this email" }, { status: 404 });
      }
      if (Date.now() > record.expiresAt) {
        await db.collection("otps").deleteOne({ email });
        return NextResponse.json({ error: "OTP has expired" }, { status: 400 });
      }
      if (record.otp !== otp) {
        return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
      }
      await db.collection("otps").deleteOne({ email });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectToDatabase();
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