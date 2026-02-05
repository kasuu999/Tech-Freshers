import Project from "../models/Project.js";
import { fetchGitRepos } from "../services/githubService.js";

// Fetch repos
export const getRepos = async (req, res) => {
  try {
    const { username } = req.params;
    if (!username) return res.status(400).json({ error: "Username required" });

    const repos = await fetchGitRepos(username);
    return res.json(repos);

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch repos" });
  }
};

// Save project
export const saveProject = async (req, res) => {
  try {
    const { userId, repo, description, tech, live } = req.body;

    const project = await Project.create({
      userId,
      repo,
      description,
      tech,
      live,
    });

    return res.json({ message: "Project added", project });

  } catch (err) {
    console.log("PROJECT SAVE ERROR:", err);
    res.status(500).json({ error: "Failed to save project" });
  }
};
