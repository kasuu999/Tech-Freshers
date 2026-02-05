import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  userId: String,
  name: String,
  email: String,
  phone: String,
  location: String,
  summary: String,
  education: String,
  skills: [String],
  experience: String,
});

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
