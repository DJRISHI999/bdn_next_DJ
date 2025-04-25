import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const { userId } = decoded;

    const { name, email, profilePicture } = await request.json();

    await connectToDatabase();

    // Upload profile picture to Cloudinary if provided
    let profilePictureUrl = null;
    if (profilePicture) {
      const uploadResponse = await cloudinary.v2.uploader.upload(profilePicture, {
        folder: "profile_pictures",
      });
      profilePictureUrl = uploadResponse.secure_url;
    }

    // Update user in the database
    const updatedUser = await User.findOneAndUpdate(
      { userId },
      { name, email, ...(profilePictureUrl && { profilePicture: profilePictureUrl }) },
      { new: true }
    );

    return NextResponse.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}