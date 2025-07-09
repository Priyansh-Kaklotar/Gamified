import mongoose from "mongoose";
import User from "./user-model.js";

const habitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    frequency: {
      type: String,
      enum: ["Daily", "Weekly", "Monthly", "Yearly"],
      default: "Daily",
    },
    category: {
      type: String,
      enum: ["Health", "Education", "Skills", "Hobbies"],
      default: "Health",
    },
    currentStreak: { type: Number, default: 0 },
    lastCompleted: { type: Date, default: null },
    bestStreak: { type: Number, default: 0 },

    completedDates: [
      {
        type: Date,
      },
    ],
  },
  { timestamps: true }
);

const Habit = mongoose.model("Habit", habitSchema);
export default Habit;
