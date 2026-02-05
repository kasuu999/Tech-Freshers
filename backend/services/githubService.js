import axios from "axios";

export const fetchGitRepos = async (username) => {
  try {
    const res = await axios.get(`https://api.github.com/users/${username}/repos`);
    return res.data;
  } catch (err) {
    console.log("GitHub API Error:", err.message);
    return [];
  }
};
