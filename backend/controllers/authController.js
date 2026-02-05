import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

// REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, goal, level } = req.body;

    console.log("REGISTER BODY =", req.body);

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      goal,
      level,
    });

    res.json({
      message: "Registered",
      token: generateToken(user._id),
      user,
    });
  } catch (err) {
    console.error("REGISTER ERROR →", err);
    res.status(500).json({ error: "Server Error" });
  }
};

// LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN BODY =", req.body);

    if (!email || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: "Invalid password" });
    }

    res.json({
      message: "Login successful",
      token: generateToken(user._id),
      user,
    });
  } catch (err) {
    console.error("LOGIN ERROR →", err);
    res.status(500).json({ error: "Server Error" });
  }
};
