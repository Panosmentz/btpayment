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
  // console.log("req.body from refund.js : ", req.body);
  const id = req.body.id;

  const refundRequest = gateway.transaction.refund(id, (err, result) => {
    if (result) {
      res.send(result);
    } else {
      res.status(500).send(error);
    }
  });
});

module.exports = router;
