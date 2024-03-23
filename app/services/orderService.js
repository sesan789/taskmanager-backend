const Order = require("../models/orderModel");
const Transaction = require("../models/transactionModel");

const addOrder = async (orderData, transaction) => {
  try {
    const transactionData = new Transaction(transaction);
    const newTrans = await transactionData.save();

    orderData.transaction_id = newTrans._id;
    const newOrder = new Order(orderData);
    await newOrder.save();
    console.log(orderData, newOrder);

    return newOrder;
  } catch (error) {
    throw new Error("Error adding new Order");
  }
};

module.exports = { addOrder };
