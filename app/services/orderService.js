const Order = require("../models/orderModel");
const Transaction = require("../models/transactionModel");

//  add new task service
const addOrder = async (orderData,transaction) => {
  try {

    const transactionData = new Transaction(transaction);
    const newTrans = await transactionData.save();


    orderData.transaction_id = newTrans._id;
    const newOrder = new Order(orderData);
    await newOrder.save();

    return newOrder;
  } catch (error) {
    throw new Error("Error adding new order");
  }
};

module.exports = {
    addOrder,
  };