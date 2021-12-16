import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  const [tokenObject, setTokenObject] = useState({});
  const [isPaymentMade, setIsPaymentMade] = useState(false);
  const [transactionData, setTransactionData] = useState({});
  const [refundData, setRefundData] = useState({});
  const [isRefundRequested, setIsRefundRequested] = useState(false);

  useEffect(() => {
    getClientToken();
  }, []);

  async function getClientToken() {
    let result = await axios.get("/api/client_token");
    const tokenObject = result.data;
    setTokenObject(tokenObject);
  }

  async function makePayment(data) {
    //console.log("make payment data ", data);
    let result = await axios.post("/api/checkout", {
      payment_method_nonce: data,
    });

    setTransactionData(result.data);

    setIsPaymentMade(true);
  }

  async function requestRefund(id) {
    // console.log("request refund id : ", id);
    let result = await axios.post("/api/refund", { id: id });
    //  console.log("result", result);
    setRefundData(result.data);
    setIsRefundRequested(true);
  }

  return (
    <GlobalContext.Provider
      value={{
        tokenObject,
        makePayment,
        transactionData,
        setTransactionData,
        isPaymentMade,
        requestRefund,
        refundData,
        setRefundData,
        isRefundRequested,
        setIsRefundRequested,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
