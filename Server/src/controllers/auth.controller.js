const genToken = require("../config/token");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const validator = require("validator");

// Register
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Something is missing!" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "User is already present!" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please Enter the valid email" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Enter the Strong password!",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashPassword });

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User Created successfully!",
      data: user,
    });
  } catch (err) {
    return res.status(400).json({ message: `Error: ${err}` });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Something is missing!", success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found!", success: false });
    }

    const decode = await bcrypt.compare(password, user.password);

    if (!decode) {
      return res
        .status(400)
        .json({ message: "Invalid password!", success: false });
    }

    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "User Logged in successfully!",
      data: user,
      success: true,
    });
  } catch (err) {
    return res.status(400).json({ message: `Error: ${err}` });
  }
};

// Log out
const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ message: "User logged out succesfully!", success: true });
  } catch (err) {
    return res.status(400).json({ message: `Error: ${err}`, success: false });
  }
};
module.exports = { register, login, logout };
