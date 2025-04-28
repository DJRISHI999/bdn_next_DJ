// filepath: e:\Projects\BDN_nextjs\frontend\src\app\api\test-env\route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ mongoUri: process.env.MONGO_URI });
}