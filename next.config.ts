import type { NextConfig } from "next";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const nextConfig: NextConfig = {
  compress: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "standalone",
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true, // TODO: Need to fix the build issue. Run build by removing this line to see actual error to fix.
  },
  env: {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
  },
};

export default nextConfig;
