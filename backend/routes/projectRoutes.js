import express from "express";
import { getRepos, saveProject } from "../controllers/projectController.js";

const router = express.Router();

router.get("/repos/:username", getRepos);
router.post("/save", saveProject);

export default router;
