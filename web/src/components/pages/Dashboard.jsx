import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  // -------------------------
  // 🔹 CALCULATE PROFILE COMPLETION
  // -------------------------
  const calculateProfileCompletion = () => {
    let fields = ["name", "education", "skill", "goal"];
    let filled = 0;

    fields.forEach((field) => {
      if (user[field] && user[field]?.trim() !== "") filled++;
    });

    return Math.round((filled / fields.length) * 100);
  };

  const completion = calculateProfileCompletion();

  // -------------------------
  // 🔹 PROJECT COUNT (DYNAMIC)
  // -------------------------
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  const projectCount = projects.length;

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* ---------- SIDEBAR ---------- */}
      <div className="w-64 bg-white shadow-lg hidden md:block">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-blue-600">TechFresher</h1>
          <p className="text-sm text-gray-500 mt-1">Career Dashboard</p>
        </div>

        <div className="p-5 space-y-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full text-left p-3 rounded hover:bg-blue-50 font-medium"
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="w-full text-left p-3 rounded hover:bg-blue-50 font-medium"
          >
            👤 Profile
          </button>
          <button
            onClick={() => navigate("/projects")}
            className="w-full text-left p-3 rounded hover:bg-blue-50 font-medium"
          >
            🗂 Projects
          </button>
          <button
            onClick={() => navigate("/cv-builder")}
            className="w-full text-left p-3 rounded hover:bg-blue-50 font-medium"
          >
            📝 CV Builder
          </button>
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            className="w-full text-left p-3 rounded hover:bg-red-100 text-red-600 font-medium"
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* ---------- MAIN CONTENT ---------- */}
      <div className="flex-1 p-6">

        {/* TOP NAV */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome, {user.name || "User"} 👋
          </h2>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold">{user.email}</p>
              <p className="text-sm text-gray-500">{user.goal || "Career Goal"}</p>
            </div>
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
              {user.name?.charAt(0) || "U"}
            </div>
          </div>
        </div>

        {/* ANALYTICS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          {/* PROFILE COMPLETION */}
          <div className="bg-white shadow p-6 rounded-lg">
            <p className="text-gray-500">Profile Completion</p>

            {completion === 100 ? (
              <h2 className="text-2xl font-bold text-green-600">Completed ✅</h2>
            ) : (
              <h2 className="text-3xl font-bold text-blue-600">{completion}%</h2>
            )}

            {completion < 100 && (
              <p className="text-sm text-gray-500 mt-1">Complete your profile details</p>
            )}
          </div>

          {/* GITHUB STATUS */}
          <div className="bg-white shadow p-6 rounded-lg">
            <p className="text-gray-500">GitHub Status</p>
            <h2 className="text-3xl font-bold text-purple-600">
              {user.github ? "Connected" : "Not Linked"}
            </h2>
          </div>

          {/* PROJECT COUNT */}
          <div className="bg-white shadow p-6 rounded-lg">
            <p className="text-gray-500">Projects Added</p>
            <h2 className="text-3xl font-bold text-green-600">{projectCount}</h2>
          </div>

        </div>

        {/* QUICK ACTIONS */}
        <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* PROFILE CARD */}
          <div className="bg-white shadow p-5 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Update Profile</h3>
            <p className="text-sm text-gray-500 mb-3">
              Add education, skills and career goals.
            </p>
            <button
              onClick={() => navigate("/profile")}
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              Complete Profile →
            </button>
          </div>

          {/* PROJECT CARD */}
          <div className="bg-white shadow p-5 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Manage Projects</h3>
            <p className="text-sm text-gray-500 mb-3">
              Add your GitHub repositories & highlight your work.
            </p>
            <button
              onClick={() => navigate("/projects")}
              className="bg-black text-white px-4 py-2 rounded w-full"
            >
              View Projects →
            </button>
          </div>

          {/* CV CARD */}
          <div className="bg-white shadow p-5 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Generate CV</h3>
            <p className="text-sm text-gray-500 mb-3">
              Build a job-ready CV instantly.
            </p>
            <button
              onClick={() => navigate("/cv-builder")}
              className="bg-green-600 text-white px-4 py-2 rounded w-full"
            >
              Download CV →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
