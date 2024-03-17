const orderService = require("../services/orderService");
const axios = require("axios")


// add new order methods
const addNewOrder = async (req, res) => {
    try {
        const { body } = req;
        const { user_id } = req.auth;

        const {order, transaction} = body;
        order.user_id = user_id;
    
        const mypayRef = transaction.reference;

        // Verify transaction
        const paymentResp = await axios.get(`https://api.paystack.co/transaction/verify/${mypayRef}`,{
            headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`}
        });

        // confirm payment status
        if (paymentResp.data.data.status === 'success') {
            transaction.status = 'paid';
        }else{
            transaction.status = 'unpaid';
        }

        const newOrder = await orderService.addOrder(order, transaction);
    
        res.status(201).json({
            message: "Order added successfully",
            task: newOrder,
        });

    } catch (error) {
        console.log(error);
      res.status(500).json({
        message: error.message,
      });
    }
};


module.exports = {
    addNewOrder,
  };