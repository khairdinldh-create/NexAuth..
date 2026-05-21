const Profile = require('../Models/Profile');
const Users = require('../Models/Users');

// ─────────────────────────────────────────────
// USER: Add or Update their own profile
// ─────────────────────────────────────────────
const addprofileRoute = async (req, res) => {
  try {
    const { telephone, country, city } = req.body;

    const existingProfile = await Profile.findOne({ userId: req.user._id });

    if (!existingProfile) {
      const newProfile = new Profile({
        telephone,
        country,
        city,
        userId: req.user._id,
      });

      await newProfile.save();
      return res.status(201).json({ message: "Profile added successfully" });
    }

    const updated = await Profile.findOneAndUpdate(
      { userId: req.user._id },
      { telephone, country, city },
      { new: true }
    ).select("-userId -__v");

    return res.status(200).json({ message: "Profile updated successfully", profile: updated });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ─────────────────────────────────────────────
// USER: Show their own profile
// ─────────────────────────────────────────────
const showprofileRoute = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user._id })
      .select("-_id -userId -__v");

    if (!profile) {
      return res.status(200).json({ telephone: "", country: "", city: "" });
    }

    res.status(200).json(profile);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ─────────────────────────────────────────────
// USER: Update their own profile
// ─────────────────────────────────────────────
const updateprofileRoute = async (req, res) => {
  try {
    const { telephone, country, city } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { userId: req.user._id },
      { telephone, country, city },
      { new: true }
    ).select("-userId -__v");

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", profile });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ─────────────────────────────────────────────
// USER: Delete their own profile
// ─────────────────────────────────────────────
const deleteprofileRoute = async (req, res) => {
  try {
    const profile = await Profile.findOneAndDelete({ userId: req.user._id });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ─────────────────────────────────────────────
// ADMIN: Show all profiles (no userId exposed)
// ─────────────────────────────────────────────
const showallprofilesRoute = async (req, res) => {
  try {
    const profiles = await Profile.find().select("-userId -__v");
    res.status(200).json(profiles);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ─────────────────────────────────────────────
// ADMIN: Show all users (no password exposed)
// ─────────────────────────────────────────────
const showusersbyadminRoute = async (req, res) => {
  try {
    const users = await Users.find().select("-password -__v");
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ─────────────────────────────────────────────
// ADMIN: Show one user info (no password)
// ─────────────────────────────────────────────
const showuserinfobyadminRoute = async (req, res) => {
  try {
    const userinfo = await Users.findById(req.params.id).select("-password -__v");

    if (!userinfo) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(userinfo);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ─────────────────────────────────────────────
// ADMIN: Show specific profile by userId (no userId exposed)
// ─────────────────────────────────────────────
const showspeceficprofilebyadminRoute = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.id })
      .select("-userId -__v");

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ─────────────────────────────────────────────
// ADMIN: Delete a specific user by ID
// ─────────────────────────────────────────────
const deletespeceficuserbyadminRoute = async (req, res) => {
  try {
    const user = await Users.findByIdAndDelete(req.params.id); // ✅ fixed: was findOneAndDelete

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ─────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────
module.exports = {
  addprofileRoute,
  showprofileRoute,
  updateprofileRoute,
  deleteprofileRoute,
  showallprofilesRoute,
  showusersbyadminRoute,
  showuserinfobyadminRoute,
  showspeceficprofilebyadminRoute,
  deletespeceficuserbyadminRoute,
};