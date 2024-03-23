const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  status: { type: String, required: true },
  reference: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transaction", transactionSchema);
