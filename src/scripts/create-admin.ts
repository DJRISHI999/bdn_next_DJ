import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

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