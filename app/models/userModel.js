const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verify_account: { type: Boolean, default: false },
  phone_number: { type: String },
  address: { type: String },
  country: { type: String },
  state: { type: String },
  gender: { type: String },
  profile_image: { type: String },
});

module.exports = mongoose.model("User", userSchema);
