import express from "express";
import { saveProfile } from "../controllers/profileController.js";

const router = express.Router();

// ONLY PROFILE SAVE — NOTHING ELSE
router.post("/save", saveProfile);

export default router;
