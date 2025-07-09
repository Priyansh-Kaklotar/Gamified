import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // optional: to exclude password from query results by default
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt timestamps
  }
);

// Create the model
const User = mongoose.model("User", userSchema);

export default User;
