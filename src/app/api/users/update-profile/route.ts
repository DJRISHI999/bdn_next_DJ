import { NextResponse } from "next/server";
import formidable from "formidable";
import { IncomingMessage } from "http";
import fs from "fs";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import cloudinary from "@/lib/cloudinary";

// Disable Next.js built-in body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to convert Web Request to Node.js readable stream
async function convertRequestToNodeReadable(req: Request): Promise<IncomingMessage> {
  const contentType = req.headers.get("content-type");
  const contentLength = req.headers.get("content-length");

  if (!contentType || !contentLength) {
    throw new Error("Missing content headers");
  }

  const reader = req.body?.getReader();
  const stream = new ReadableStream({
    async start(controller) {
      if (!reader) return controller.close();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        controller.enqueue(value);
      }
      controller.close();
    },
  });

  const nodeReadable = require("stream").Readable.from(stream as any);

  const fakeReq = Object.assign(nodeReadable, {
    headers: {
      "content-type": contentType,
      "content-length": contentLength,
    },
    method: "POST",
    url: "",
  });

  return fakeReq as IncomingMessage;
}

export async function POST(request: Request) {
  try {
    const token = request.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const { userId } = decoded;

    const fakeReq = await convertRequestToNodeReadable(request);

    const form = formidable({
      multiples: false,
      keepExtensions: true,
    });

    const [fields, files] = await new Promise<any>((resolve, reject) => {
      form.parse(fakeReq, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    // Ensure fields are strings
    const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
    const email = Array.isArray(fields.email) ? fields.email[0] : fields.email;
    const phoneNumber = Array.isArray(fields.phoneNumber) ? fields.phoneNumber[0] : fields.phoneNumber;
    const password = Array.isArray(fields.password) ? fields.password[0] : fields.password;

    const profilePicture = files.profilePicture?.[0] || files.profilePicture;

    await connectToDatabase();

    const user = await User.findOne({ userId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update user fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (password) user.password = password;

    // Handle profile picture upload
    if (profilePicture && profilePicture.filepath) {
      try {
        console.log("Uploading file to Cloudinary:", profilePicture.filepath);
        const upload = await cloudinary.uploader.upload(profilePicture.filepath, {
          folder: "profile_pictures",
        });
        console.log("Cloudinary Upload Response:", upload);
        user.profilePicture = upload.secure_url;

        // Delete the local file after successful upload
        fs.unlinkSync(profilePicture.filepath);
      } catch (uploadError) {
        console.error("Error uploading to Cloudinary:", uploadError);
        return NextResponse.json({ error: "Failed to upload profile picture" }, { status: 500 });
      }
    }

    await user.save();

    return NextResponse.json({
      message: "Profile updated successfully",
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error: any) {
    console.error("Error updating profile:", error);
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
