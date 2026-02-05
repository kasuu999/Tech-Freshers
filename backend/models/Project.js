import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  userId: String,
  repo: String,
  description: String,
  tech: String,
  live: String,
});

const Project = mongoose.model("Project", projectSchema);
export default Project;
