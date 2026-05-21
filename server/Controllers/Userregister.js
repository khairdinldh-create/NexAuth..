const users = require("../Models/Users");
const bcrypt = require("bcrypt");

const Register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new users({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role // Default role is 'user' if not provided
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = Register;