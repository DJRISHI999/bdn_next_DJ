import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { User } from "@/models/User";

dotenv.config(); // Load environment variables from .env file

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable in your .env file");
}

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(MONGO_URI);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw new Error("Failed to connect to MongoDB");
    }
  }
};

async function createAdmin() {
  try {
    // Connect to the database
    await connectToDatabase();

    // Check if an admin already exists
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log("Admin already exists:", existingAdmin);
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash("bdnadmin@123", 10);

    // Create a new admin user
    const admin = new User({
      name: "Admin",
      email: "bhoodhaninfratech@gmail.com",
      password: hashedPassword,
      role: "admin",
      userId: "BDNADM01", // Static ID for the admin
    });

    await admin.save();
    console.log("Admin user created successfully:", admin);
  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    process.exit(); // Exit the script
  }
}

createAdmin();