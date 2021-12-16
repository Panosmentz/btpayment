import React, { useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext";

const Results = () => {
  const globalContext = useContext(GlobalContext);
  const {
    transactionData,
    isPaymentMade,
    requestRefund,
    refundData,
    isRefundRequested,
  } = globalContext;
  const onSubmitHandler = () => {
    requestRefund(transactionData.transaction.id);
  };
  return (
    <div>
      {isPaymentMade ? (
        <>
          <div className="results-container">
            <h1>Payment Successful</h1>
            <h3>Transaction ID: {transactionData.transaction.id}</h3>
          </div>
          <div className="refund-container">
            <button id="submit-button" onClick={onSubmitHandler}>
              Request refund
            </button>
          </div>
        </>
      ) : null}
      {isRefundRequested ? <h3>Refund status: {refundData.message}</h3> : null}
    </div>
  );
};

export default Results;
