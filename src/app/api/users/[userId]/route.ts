import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import jwt from "jsonwebtoken";

// Recursive function to fetch descendants
async function fetchDescendants(userId: string): Promise<any[]> {
  const descendants = await User.find({ parentId: userId });
  const result = [];

  for (const descendant of descendants) {
    const children = await fetchDescendants(descendant.userId); // Recursively fetch children
    result.push({
      userId: descendant.userId,
      name: descendant.name,
      email: descendant.email,
      role: descendant.role,
      profilePicture: descendant.profilePicture || "/images/profile.webp",
      phoneNumber: descendant.phoneNumber,
      commission: descendant.commission,
      level: descendant.level,
      referralCode: descendant.referralCode,
      parentId: descendant.parentId,
      children, // Attach children to the current node
    });
  }

  return result;
}

export async function GET(
  request: Request,
  context: { params: { userId: string } }
) {
  const { params } = context;
  const { userId } = params;

  if (!userId) {
    return NextResponse.json(
      { error: "User ID is required in the URL path." },
      { status: 400 }
    );
  }

  // Validate the Authorization header
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Unauthorized: Missing or invalid token." },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    // Ensure JWT_SECRET is defined
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("JWT_SECRET is not defined in the environment variables.");
      return NextResponse.json(
        { error: "Internal server error. Please try again later." },
        { status: 500 }
      );
    }

    // Verify the JWT token
    const decodedToken = jwt.verify(token, jwtSecret);
    if (typeof decodedToken === "object" && "userId" in decodedToken) {
      const decodedUserId = decodedToken.userId;

      if (decodedUserId !== userId) {
        return NextResponse.json(
          { error: "Unauthorized: User ID mismatch." },
          { status: 403 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "Invalid token payload." },
        { status: 401 }
      );
    }

    // Connect to the database
    await connectToDatabase();

    // Find the user by userId
    const user = await User.findOne({ userId });
    if (!user) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

    // Fetch descendants recursively
    const descendants = await fetchDescendants(userId);

    // Return the user data along with descendants
    return NextResponse.json(
      {
        userId: user.userId,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture || "/images/profile.webp",
        phoneNumber: user.phoneNumber,
        commission: user.commission,
        level: user.level,
        referralCode: user.referralCode,
        parentId: user.parentId,
        children: descendants, // Include descendants in the response
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying token or fetching user data:", error);
    return NextResponse.json(
      { error: "Invalid token or an unexpected error occurred." },
      { status: 500 }
    );
  }
}