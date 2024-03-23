const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, maxlength: 5000 },
  status: { type: String, required: true },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model("Task", taskSchema);
