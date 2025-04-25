import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary"; // Import v2 directly

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(request: Request) {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    interface DecodedToken {
      userId: string;
      email: string;
      role: string;
    }
    const decoded: DecodedToken = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    const { userId } = decoded;

    const { name, email, profilePicture } = await request.json();

    await connectToDatabase();

    // Define the type for the Cloudinary upload response
    interface CloudinaryUploadResponse {
      secure_url: string;
      [key: string]: unknown; // Include other optional properties if needed
    }

    // Upload profile picture to Cloudinary if provided
    let profilePictureUrl = null;
    if (profilePicture) {
      const uploadResponse = await cloudinary.uploader.upload(profilePicture, {
        folder: "profile_pictures",
      }) as CloudinaryUploadResponse; // Cast the response to the correct type
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