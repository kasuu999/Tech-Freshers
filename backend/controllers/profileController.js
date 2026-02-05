import Profile from "../models/Profile.js";

export const saveProfile = async (req, res) => {
  try {
    const {
      userId,
      name,
      email,
      phone,
      location,
      summary,
      education,
      skills,
      experience,
    } = req.body;

    let profile = await Profile.findOne({ userId });

    if (profile) {
      Object.assign(profile, {
        name,
        email,
        phone,
        location,
        summary,
        education,
        skills,
        experience,
      });
      await profile.save();
    } else {
      profile = await Profile.create({
        userId,
        name,
        email,
        phone,
        location,
        summary,
        education,
        skills,
        experience,
      });
    }

    res.json({ message: "Profile saved!", profile });
  } catch (err) {
    console.log("PROFILE ERROR:", err);
    res.status(500).json({ error: "Profile save failed" });
  }
};
