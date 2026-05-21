const users = require("../Models/Users");
const validator = require("validator");

const registerValidator = async (req, res, next) => {
  let { name, email, password, confirmPassword } = req.body;

  // Normalize input
  name = name?.trim();
  email = email?.trim().toLowerCase();

  const errors = [];

  // =========================
  // 1. Required fields
  // =========================
  if (!name) errors.push("Name is required");
  if (!email) errors.push("Email is required");
  if (!password) errors.push("Password is required");
  if (!confirmPassword) errors.push("Confirm password is required");

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // =========================
  // 2. Email validation
  // =========================
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // =========================
  // 3. Password strength
  // =========================
  const strongPassword = validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  });

  if (!strongPassword) {
    return res.status(400).json({
      message:
        "Password must be at least 8 chars and include uppercase, lowercase, number and symbol",
    });
  }

  // =========================
  // 4. Password match
  // =========================
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  // =========================
  // 5. Check existing user
  // =========================
  try {
    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Database error during validation" });
  }

  // attach cleaned data to request
  req.body.email = email;
  req.body.name = name;

  next();
};

module.exports = registerValidator;