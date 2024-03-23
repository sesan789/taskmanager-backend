const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  status: { type: String, required: true },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  quantity: { type: Number, required: true },
  task_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  transaction_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transaction",
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
