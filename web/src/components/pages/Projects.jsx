import React, { useState } from "react";
import API from "../../api/axiosConfig";
import BackButton from "../BackButton";

const Projects = () => {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRepos = async () => {
    if (!username.trim()) {
      alert("Enter a valid GitHub username");
      return;
    }

    try {
      setLoading(true);

      const res = await API.get(`/projects/repos/${username}`);
      setRepos(res.data);

    } catch (err) {
      console.log("Front-end Fetch Error:", err);
      alert("Failed to fetch repos");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------ SAVE PROJECT ------------------------
  const saveProject = async (repo) => {
    try {
      const userId = JSON.parse(localStorage.getItem("user"))._id;

      const payload = {
        userId,
        repo: repo.html_url,
        description: repo.description || "",
        tech: "",
        live: repo.homepage || "",
      };

      const res = await API.post("/projects/save", payload);
      alert("Project Saved Successfully!");

      // ---------- Save to localStorage ----------
      const existing = JSON.parse(localStorage.getItem("projects")) || [];
      existing.push(res.data.project);
      localStorage.setItem("projects", JSON.stringify(existing));

    } catch (err) {
      console.log("Save Project Error:", err);
      alert("Failed to save project");
    }
  };

  return (
    <div className="projects-bg">

      <BackButton />

      <h2 className="projects-title">GitHub Projects</h2>

      <input
        placeholder="Enter GitHub Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 mb-3 w-64"
      />

      <button
        onClick={fetchRepos}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {loading ? "Loading..." : "Fetch Repos"}
      </button>

      <div className="projects-grid">
        {repos.map((repo) => (
          <div key={repo.id} className="project-card">
            <h3 className="font-bold">{repo.name}</h3>
            <p>{repo.description || "No description available"}</p>

            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600"
            >
              View on GitHub →
            </a>

            {/* ADD BUTTON */}
            <button
              onClick={() => saveProject(repo)}
              className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
            >
              + Add to Dashboard
            </button>
          </div>
        ))}

        {repos.length === 0 && !loading && (
          <p className="text-gray-500 mt-4">No repos found</p>
        )}
      </div>
    </div>
  );
};

export default Projects;
