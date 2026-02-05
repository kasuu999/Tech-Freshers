import React, { useState } from "react";
import API from "../../api/axiosConfig";
import BackButton from "../BackButton";
import "../styles/profile.css";

const Profile = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    education: "",
    skills: "",
    experience: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const saveProfile = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("user"))._id;

      await API.post("/profile/save", {
        userId,
        ...form,
        skills: form.skills.split(","), // convert CSV to array
      });

      alert("Profile updated successfully!");
    } catch (err) {
      alert("Error saving profile");
    }
  };

  return (
    <div className="profile-bg">
      <div className="profile-card">
        <BackButton />

        <h2 className="profile-title">Complete Your Profile</h2>

        <div className="profile-form">
          <input name="name" placeholder="Full Name" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input name="phone" placeholder="Phone Number" onChange={handleChange} />
          <input name="location" placeholder="Location" onChange={handleChange} />

          <textarea
            name="summary"
            placeholder="Professional Summary"
            onChange={handleChange}
          />

          <textarea
            name="education"
            placeholder="Education Details"
            onChange={handleChange}
          />

          <input
            name="skills"
            placeholder="Skills (comma separated)"
            onChange={handleChange}
          />

          <textarea
            name="experience"
            placeholder="Experience (or write Fresher)"
            onChange={handleChange}
          />
        </div>

        <button className="profile-btn" onClick={saveProfile}>
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
