import { jsPDF } from "jspdf";
import Profile from "../models/Profile.js";
import Project from "../models/Project.js";

export const generateCV = async (req, res) => {
  try {
    const { userId } = req.body;

    const profile = await Profile.findOne({ userId });
    if (!profile) {
      return res
        .status(400)
        .json({ error: "Please complete your profile first!" });
    }

    const projects = await Project.find({ userId });

    const doc = new jsPDF();

    // ---------------- HEADER ----------------
    doc.setFontSize(22);
    doc.text(profile.name || "Your Name", 10, 15);

    doc.setFontSize(11);
    doc.text(`Email: ${profile.email || "N/A"}`, 10, 22);
    doc.text(`Phone: ${profile.phone || "N/A"}`, 10, 28);
    doc.text(`Location: ${profile.location || "N/A"}`, 10, 34);

    // ---------------- SUMMARY ----------------
    doc.setFontSize(14);
    doc.text("Professional Summary", 10, 48);

    doc.setFontSize(11);
    doc.text(profile.summary || "No summary added.", 10, 55, {
      maxWidth: 180,
    });

    // ---------------- SKILLS ----------------
    doc.setFontSize(14);
    doc.text("Technical Skills", 10, 75);

    doc.setFontSize(11);
    doc.text(
      (profile.skills || ["Not added"]).join(", "),
      10,
      82,
      { maxWidth: 180 }
    );

    // ---------------- EDUCATION ----------------
    doc.setFontSize(14);
    doc.text("Education", 10, 100);

    doc.setFontSize(11);
    doc.text(profile.education || "Not added", 10, 107);

    // ---------------- EXPERIENCE ----------------
    doc.setFontSize(14);
    doc.text("Experience", 10, 125);

    doc.setFontSize(11);
    doc.text(profile.experience || "Fresher", 10, 132, {
      maxWidth: 180,
    });

    // ---------------- PROJECTS ----------------
    doc.setFontSize(14);
    doc.text("Projects", 10, 150);

    doc.setFontSize(11);
    projects.forEach((p, i) => {
      const y = 160 + i * 10;
      doc.text(
        `${i + 1}. ${p.repo || "Project"} — ${p.description || "No description"}`,
        10,
        y,
        { maxWidth: 180 }
      );
    });

    const pdfBuffer = Buffer.from(doc.output("arraybuffer"));
    res.setHeader("Content-Type", "application/pdf");
    res.send(pdfBuffer);

  } catch (err) {
    console.log("CV ERROR:", err);
    res.status(500).json({ error: "Failed to generate CV" });
  }
};
