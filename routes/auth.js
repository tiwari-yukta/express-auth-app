import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();
//------------------------------------------------REGISTER------------------------------------------------------------------//
router.post("/register", async (req, res) => {
  const { username, password, fullName, gender, dob, country } = req.body;

  // Basic validation
  if (!username || !password || !fullName || !gender || !dob || !country) {
    return res.status(400).json({ message: "All the fields are required" });
  }

  try {
    // Check if user already exists
    const isUserExists = await User.findOne({ username });
    if (isUserExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      password: hashedPassword,
      fullName,
      gender,
      dob,
      country,
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "New User Created", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

//----------------------------------------------------------LOGIN---------------------------------------------------------//
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Validation
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password does not matched" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

//------------------------------------------------SERACH USER-------------------------------------------------------------------//
router.get("/search", async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res
      .status(400)
      .json({ message: "Please enter your valid username" });
  }

  try {
    let user;

    if (username) {
      user = await User.findOne({ username });
    }

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error ", error: error.message });
  }
});
export default router;
