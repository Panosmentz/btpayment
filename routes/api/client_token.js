const express = require("express");
const router = express.Router();
const braintree = require("braintree");
require("dotenv").config({ path: "../../config/config.env" });

//Generate a client token
//gateway.clientToken.generate({}, (err, response) => {
//  // pass clientToken to your front-end
//  const clientToken = response.clientToken;
//  console.log("Client token from gateway generate", clientToken);
//});

// Send a client token to your client
router.get("/", (req, res) => {
  const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
  });

  const sendToken = gateway.clientToken.generate({}, (err, response) => {
    res.send(response.clientToken);
    // console.log(
    //   "Client token from app.get /client token",
    //   response.clientToken
    // );

    if (result) {
      res.send(result);
    } else {
      res.status(500).send(error);
    }
  });
});

module.exports = router;
