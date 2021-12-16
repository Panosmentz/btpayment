const express = require("express");
const router = express.Router();
const braintree = require("braintree");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./config/config.env" });

const app = express();
app.use(bodyParser.json());
app.use("/api/checkout", require("./routes/api/checkout"));
app.use("/api/refund", require("./routes/api/refund"));
app.use("/api/client_token", require("./routes/api/client_token"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build")); //serve static frontend - npm run build

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
