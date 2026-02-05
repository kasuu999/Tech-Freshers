import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axiosConfig";
import "../../components/styles/register.css";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    goal: "Frontend Developer", // Default selected
    level: "Beginner",          // Default selected
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      return alert("Please fill all fields");
    }

    if (!form.goal || !form.level) {
      return alert("Select valid Goal & Skill Level");
    }

    try {
      const res = await API.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      console.log("ERROR:", err.response?.data);
      alert("Registration Failed!");
    }
  };

  return (
    <div className="register-bg">
      <div className="register-card">
        <h1 className="text-3xl font-bold text-center mb-2">
          Create Your Career Profile
        </h1>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Start building your job-ready profile
        </p>

        <input
          name="name"
          type="text"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full mb-3 p-3 border rounded"
        />

        <input
          name="email"
          type="email"
          placeholder="Email Address"
          onChange={handleChange}
          className="w-full mb-3 p-3 border rounded"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded"
        />

        {/* Career Goal */}
        <select
          name="goal"
          value={form.goal}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded"
        >
          <option value="Frontend Developer">Frontend Developer</option>
          <option value="Backend Developer">Backend Developer</option>
          <option value="Full Stack Developer">Full Stack Developer</option>
          <option value="DevOps Engineer">DevOps Engineer</option>
        </select>

        {/* Skill Level */}
        <select
          name="level"
          value={form.level}
          onChange={handleChange}
          className="w-full mb-6 p-3 border rounded"
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition"
        >
          Create Account
        </button>

        <p className="text-center text-sm mt-4">
          Already registered?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
