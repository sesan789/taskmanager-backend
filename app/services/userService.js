const User = require("../models/userModel");

// fetch user data service
const getUserData = async (userId) => {
  try {
    return await User.findById(userId);
  } catch (error) {
    throw new Error("Error fetching user data");
  }
};

// update user profile
const updateUserProfile = async (userId, userData) => {
  try {
    // find user by id and update
    const updatedUser = await User.findByIdAndUpdate(userId, userData, {
      new: true,
    });
    return updatedUser;
  } catch (error) {
    throw new Error("Error updating user data");
  }
};

module.exports = { getUserData, updateUserProfile };
