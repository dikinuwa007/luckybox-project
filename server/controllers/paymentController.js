const axios = require("axios");
const midtransClient = require("midtrans-client");

class paymentController {
  static async tokenMidtrans(req, res, next) {
    const { name, email, phone, gross_amount } = req.body;
    try {
      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.KEYMIDTRANS,
      });
      let parameter = {
        transaction_details: {
          order_id: 
            "TRANSACTION_" + Math.floor(100000 + Math.random() * 900000),
          gross_amount: gross_amount+50000,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: name,
          email: email,
          phone: phone,
        },
      };
      const midtransToken = await snap.createTransaction(parameter);
      res.status(201).json(midtransToken);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = paymentController