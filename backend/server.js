import dotenv from "dotenv";
dotenv.config();                 // <-- VERY IMPORTANT: TOP PE

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import cvRoutes from "./routes/cvRoutes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/cv", cvRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Backend Running ✔");
});

// Start Server
app.listen(5000, () =>
  console.log("Backend running on http://localhost:5000")
);
