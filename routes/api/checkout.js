const express = require("express");
const router = express.Router();
const braintree = require("braintree");
require("dotenv").config({ path: "../../config/config.env" });

router.post("/", (req, res) => {
  const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
  });

  const payment_method_nonce = req.body.payment_method_nonce;
  const newTransaction = gateway.transaction.sale(
    {
      amount: "10.00",
      paymentMethodNonce: payment_method_nonce,
      options: {
        submitForSettlement: true,
      },
    },
    (error, result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(500).send(error);
      }
    }
  );
});

module.exports = router;
