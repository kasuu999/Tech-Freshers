import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axiosConfig";

const CVBuilder = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const downloadCV = async () => {
    try {
      setLoading(true);

      const userId = JSON.parse(localStorage.getItem("user"))._id;

      const res = await API.post(
        "/cv/generate",
        { userId },
        { responseType: "blob" }
      );

      // ---- Download PDF ----
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "TechFresher_CV.pdf";
      a.click();

      // ---- Redirect to Dashboard ----
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert("❌ Please complete your profile & add projects first");
    }
  };

  return (
    <div className="cv-bg flex items-center justify-center min-h-screen">
      <div className="cv-card shadow-xl bg-white p-8 rounded-xl w-[90%] md:w-[450px] text-center">

        <h2 className="text-3xl font-bold mb-3 text-gray-900">
          Generate Professional CV
        </h2>

        <p className="text-slate-600 mb-5 text-sm leading-6">
          Your CV will be auto-generated based on your <br />
          <span className="font-medium text-black">Profile Details</span> and{" "}
          <span className="font-medium text-black">GitHub Projects</span>.
        </p>

        <button
          onClick={downloadCV}
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition disabled:bg-gray-400"
        >
          {loading ? "Generating PDF..." : "Download CV"}
        </button>

      </div>
    </div>
  );
};

export default CVBuilder;
