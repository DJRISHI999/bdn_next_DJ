import { NextResponse } from "next/server";

// Temporary in-memory OTP store (use Redis or database in production)
const otpStore: Record<string, { otp: string; expiresAt: number }> = {};

export async function POST(request: Request) {
  const { email, otp } = await request.json();

  if (!email || !otp) {
    return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 });
  }

  try {
    // Check if OTP exists for the email
    const storedOtpData = otpStore[email];
    if (!storedOtpData) {
      return NextResponse.json({ error: "No OTP found for this email" }, { status: 404 });
    }

    // Check if OTP is expired
    if (Date.now() > storedOtpData.expiresAt) {
      delete otpStore[email]; // Clean up expired OTP
      return NextResponse.json({ error: "OTP has expired" }, { status: 400 });
    }

    // Verify OTP
    if (storedOtpData.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    // OTP is valid, clean up the store
    delete otpStore[email];

    return NextResponse.json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json({ error: "Failed to verify OTP" }, { status: 500 });
  }
}