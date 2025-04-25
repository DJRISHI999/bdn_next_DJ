import mongoose, { Schema, model, models } from "mongoose";

const commissionRates = {
  BEGINNER: 500,
  STARTER: 600,
  "SALES EXECUTIVE": 700,
  "SR. SALES EXECUTIVE": 800,
  "STAR SALES EXECUTIVE": 900,
  "SALES LEADER": 1000,
  "SR. SALES LEADER": 1050,
  "STAR SALES LEADER": 1100,
  "SALES MANAGER": 1150,
  "SR. SALES MANAGER": 1200,
  PEARL: 1250,
  "STAR PEARL": 1300,
  EMERALD: 1350,
  "STAR EMERALD": 1400,
  RUBY: 1450,
  "STAR RUBY": 1500,
  SHAFIRE: 1550,
  "STAR SHAFIRE": 1600,
  DIAMOND: 1650,
  "STAR DIAMOND": 1700,
};

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "associate", "customer"], required: true }, // Role: admin, associate, or customer
  userId: { type: String, unique: true }, // Sequential ID
  parentId: { type: String, default: null, required: false }, // Parent's userId (if any), allow null
  profilePicture: { type: String, default: null }, // URL to the profile picture
  phoneNumber: { type: String, default: null }, // Phone number of the user
  commission: { type: Number, default: 500 }, // Commission earned by the user
  level: { type: String, default: "BEGINNER" }, // User level (e.g., BEGINNER, INTERMEDIATE, EXPERT)
  referralCode: { type: String, default: null }, // Referral code used during signup
});

// Pre-save hook to generate sequential userId and set defaults for associates
UserSchema.pre("save", async function (next) {
  if (!this.isNew) return next(); // Only generate ID for new users

  const User = models.User || model("User", UserSchema);

  if (this.role === "admin") {
    // Generate admin ID
    const lastAdmin = await User.findOne({ role: "admin" }).sort({ userId: -1 });
    const lastAdminId = lastAdmin?.userId || "BDNADM00";
    const newAdminId = `BDNADM${String(parseInt(lastAdminId.slice(6)) + 1).padStart(2, "0")}`;
    this.userId = newAdminId;
  } else if (this.role === "associate") {
    // Generate associate ID
    const lastAssociate = await User.findOne({ role: "associate" }).sort({ userId: -1 });
    const lastAssociateId = lastAssociate?.userId || "BDNAS000";
    const newAssociateId = `BDNAS${String(parseInt(lastAssociateId.slice(6)) + 1).padStart(3, "0")}`;
    this.userId = newAssociateId;

    // Set parentId if referralCode is provided
    if (this.referralCode) {
      const parent = await User.findOne({ userId: this.referralCode });
      if (parent) {
        this.parentId = parent.userId;
      }
    }

    // Set default commission and level for associates
    this.commission = commissionRates["BEGINNER"];
    this.level = "BEGINNER";
  } else if (this.role === "customer") {
    // Generate customer ID
    const lastCustomer = await User.findOne({ role: "customer" }).sort({ userId: -1 });
    const lastCustomerId = lastCustomer?.userId || "BDNCUS000";
    const newCustomerId = `BDNCUS${String(parseInt(lastCustomerId.slice(6)) + 1).padStart(3, "0")}`;
    this.userId = newCustomerId;

    // Customers are free from parent-child relationships
    this.parentId = null;
  }

  next();
});

// Static method to fetch all associates
UserSchema.statics.getAllAssociates = async function () {
  const User = models.User || model("User", UserSchema);
  return await User.find({ role: "associate" });
};

// Static method to update level and commission (Admin only)
UserSchema.statics.updateAssociate = async function (userId: string, updates: { level?: string; commission?: number }, adminId: string) {
  const User = models.User || model("User", UserSchema);

  // Check if the admin exists
  const admin = await User.findOne({ userId: adminId, role: "admin" });
  if (!admin) {
    throw new Error("Only admins can update associates.");
  }

  // Check if the user exists and is an associate
  const associate = await User.findOne({ userId, role: "associate" });
  if (!associate) {
    throw new Error("Associate not found.");
  }

  // Update level and commission
  if (updates.level) {
    if (!commissionRates[updates.level]) {
      throw new Error("Invalid level provided.");
    }
    associate.level = updates.level;
    associate.commission = commissionRates[updates.level];
  } else if (updates.commission) {
    const level = Object.keys(commissionRates).find((key) => commissionRates[key] === updates.commission);
    if (!level) {
      throw new Error("Invalid commission provided.");
    }
    associate.level = level;
    associate.commission = updates.commission;
  }

  await associate.save();
  return associate;
};

export const User = models.User || model("User", UserSchema);