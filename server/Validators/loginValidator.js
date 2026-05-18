const users = require("../models/Users");
const validator = require("validator");

const loginValidator = async (req, res, next) => {
  let { email, password } = req.body;

  // Normalize input
  email = email?.trim().toLowerCase();

  const errors = [];

  // =========================
  // 1. Required fields
  // =========================
  if (!email) errors.push("Email is required");
  if (!password) errors.push("Password is required");

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // =========================
  // 2. Email validation
  // =========================
  if (!validator.isEmail(email)) {
    return res.status(400).json({
      message: "Invalid email format",
    });
  }

  // =========================
  // 3. Check if user exists
  // =========================
  try {
    const existingUser = await users.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // attach user to request
    req.user = existingUser;

  } catch (err) {
    return res.status(500).json({
      message: "Database error during validation",
    });
  }

  // attach cleaned email
  req.body.email = email;

  next();
};

module.exports = loginValidator;