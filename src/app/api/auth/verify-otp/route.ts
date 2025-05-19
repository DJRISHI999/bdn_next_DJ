import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongo";

export async function POST(request: Request) {
  const { email, otp } = await request.json();

  if (!email || !otp) {
    return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const record = await db.collection("otps").findOne({ email });

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

   

    return NextResponse.json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json({ error: "Failed to verify OTP" }, { status: 500 });
  }
}