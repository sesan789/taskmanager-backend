const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const loginUser = async (email, password) => {
  // check if user is found by email address
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error("Account not found");
  }
  // check if password is correct
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Password is incorrect");
  }
  // Generate JWT Token
  const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {
    expiresIn: 3600,
  });
  // Return the token
  return { token };
};

//  register service
const registerUser = async (userData) => {
  // destruct all neccessary values
  const { first_name, last_name, email, password } = userData;
  // check if user already exists
  const user = await User.findOne({ email: email });
  if (user) {
    throw new Error("User already exists");
  }
  // hash password
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  //  create new user
  const newUser = new User({
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: hashedPassword,
  });
  // save new user
  const savedUser = await newUser.save();
  // return saved user
  return savedUser;
};

module.exports = { loginUser, registerUser };
