import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axiosConfig";

const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Glassmorphism Card */}
      <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg p-10 rounded-2xl w-96 text-white">
        
        <h1 className="text-3xl font-bold text-center mb-6">Welcome Back</h1>

        <input
          name="email"
          className="w-full mb-3 p-3 rounded bg-white/20 border border-white/30 placeholder-white"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          className="w-full mb-4 p-3 rounded bg-white/20 border border-white/30 placeholder-white"
          placeholder="Password"
          onChange={handleChange}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded font-semibold shadow-lg"
        >
          Login
        </button>

        <p className="text-center text-sm mt-4 text-white">
          New here?{" "}
          <span
            className="text-blue-300 cursor-pointer hover:underline"
            onClick={() => navigate("/")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
