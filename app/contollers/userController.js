const userService = require("../services/userService");

//  fetch user profile
const getUserProfile = async (req, res) => {
  try {
    // get authenticated user id
    const { user_id } = req.auth;

    const myProfile = await userService.getUserData(user_id);
    res.status(200).json({
      message: "User profile fetched successfully",
      user: myProfile,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    // get authenticated user id
    const { user_id } = req.auth;

    const myProfile = await userService.updateUserProfile(user_id, req.body);
    res.status(200).json({
      message: "User profile updated successfully",
      user: myProfile,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
};
