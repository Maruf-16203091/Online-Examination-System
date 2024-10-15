// models/userModel.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profileImage: {
      type: String,
    },
    phone: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true, // Default status is active
    },
    role: {
      type: String,
      enum: ["user", "admin"], // Roles can be user or admin
      default: "user",
    },
  },
  { timestamps: true }
);

// Hash password before saving the user model
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password); 
  } catch (err) {
    console.error("Error comparing passwords:", err);
    return false;
  }
};
module.exports = mongoose.model("User", UserSchema);
