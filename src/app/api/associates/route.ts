import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);

    const skip = (page - 1) * limit;

    const associates = await User.find(
      { role: "associate" },
      { userId: 1, name: 1, level: 1, commission: 1, _id: 0 }
    )
      .sort({ level: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments({ role: "associate" });

    return NextResponse.json(
      { associates, total, page, pages: Math.ceil(total / limit) },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching associates:", error);
    return NextResponse.json(
      { error: "Failed to fetch associates." },
      { status: 500 }
    );
  }
}