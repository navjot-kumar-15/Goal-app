const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const dotenv = require("dotenv").config();

// @ desc   Register new user
//@  route  POST/api/users
//@  access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exit or not
  const userExit = await User.findOne({ email });
  if (userExit) {
    res.status(400);
    throw new Error("Please enter the valid credentials");
  }
  // If user is new then we have to hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  //   Create a user
  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user credetials");
  }
});

//@ desc   Authenticate a user
//@  route  POST/api/users/login
//@  access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Checking the user by their email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user credetials");
  }

  res.json({ message: "Login User Succesfully " });
});

// @ desc   Get user data
//@  route  GET/api/users/me
//@  access Public
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);
  res.status(200).json(req.user);
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
