import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/user-model.js";
import jwt from "jsonwebtoken";
import Habit from "./models/Habitmodel.js";
import sendMail from "./utils/mailSender.js";

const app = express();

//must for every backend file
dotenv.config();
app.use(express.json());
app.use(cors());

const JWT_SECRET = process.env.JWT_SECRET;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).select("+password");
    console.log(user, password, user.password);
    if (!user) {
      return res.status(404).send("Chala ja BHAI");
    }

    if (password === user.password) {
      // user validate chhe to have token banavie chie
      const token = jwt.sign(
        {
          username,
        },
        JWT_SECRET,
        { expiresIn: "1m" }
      );
      res.json({ token, user });
    } else {
      res.status(404).send("no mel padyo ");
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

app.post("/signin", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = new User({ username, email, password });
    await newUser.save();
    const token = jwt.sign(
      {
        username,
        email,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    let mail = await sendMail(
      email,
      "Welcome to Gamified App 🎉",
      `Hi ${username},\n\nWelcome To Gamified  ! Let's level up your life! 🚀`
    );

    console.log(mail);
    res.json({ token, username });
    console.log("kaam thay gayu party");
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(404).json({ message: "Server error" });
  }
});

// app.post("/signin", async (req, res) => {
//   const { username, email, password } = req.body;
//   try {
//     const newUser = new User({ username, email, password });
//     await newUser.save();
//     const token = jwt.sign(
//       {
//         username,
//         email,
//       },
//       JWT_SECRET,
//       { expiresIn: "1h" }
//     );
//     res.json({ token, newUser });
//     console.log("kaam thay gayu party");
//     res.status(201).json({ message: "User saved successfully", user: newUser });
//   } catch (error) {
//     console.error("Error saving user:", error);
//     res.status(404).json({ message: "Server error" });
//   }
// });

app.post("/habit", async (req, res) => {
  console.log("request aavyi yeahh", req.body);
  const { name, description, frequency, user, category } = req.body;
  // if (!mongoose.Types.ObjectId.isValid(user)) {
  //   return res.status(400).json({ error: "Invalid user ID" });
  // }
  try {
    const habit = new Habit({
      name,
      description,
      frequency,
      user,
      category,
    });

    console.log(habit);
    await habit.save();

    return res.status(200).json({
      message: "data received",
      data: habit,
    });
  } catch (error) {
    console.log("error in index.js with /habit");
    console.log(error.message);
  }
});

app.get("/:userId", async (req, res) => {
  try {
    const habits = await Habit.find({
      user: req.params.userId,
    });

    console.log(habits);
    return res.status(200).json(habits);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch habits" });
  }
});

app.get("/:userId/:category", async (req, res) => {
  const { category } = req.params;

  try {
    const habits = await Habit.find({
      user: req.params.userId,
      category: category,
    });

    console.log(habits);
    return res.status(200).json(habits);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch habits" });
  }
});

app.delete("/habit/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const deleteHabit = await Habit.findByIdAndDelete(id);
    return res.status(200).json({ message: "delete successful" });
  } catch (error) {
    console.log(error.message);
  }
});

app.put("/:id/complete", async (req, res) => {
  const habit = await Habit.findById(req.params.id);
  console.log(habit);
  let time = 1;

  if (habit.frequency === "Weekly") {
    time = 7;
  } else if (habit.frequency === "Monthly") {
    time = 30;
  } else if (habit.frequency === "Yearly") {
    time = 365;
  }

  console.log(time);
  const today = new Date();
  const lastDate = new Date(habit.lastCompleted);

  const isSameDay = lastDate.toDateString() === today.toDateString();
  const isYesterday =
    new Date(lastDate.setDate(lastDate.getDate() + time)).toDateString() ===
    today.toDateString();

  if (isSameDay) {
    return res.status(400).json({ message: "Already completed today!" });
  }

  if (isYesterday) {
    habit.currentStreak += 1;
  } else {
    habit.currentStreak = 1; // Reset streak
  }

  habit.lastCompleted = today;
  habit.completedDates.push(new Date());

  // Optional: Update best streak
  if (habit.currentStreak > habit.bestStreak) {
    habit.bestStreak = habit.currentStreak;
  }

  await habit.save();
  console.log(habit);

  res.json(habit);
});

app.listen(process.env.PORT, () => {
  console.log(`server start at port ${process.env.PORT}`);
});
