import React, { useContext, useEffect, useState } from "react";
import dropin from "braintree-web-drop-in";
import { GlobalContext } from "../Context/GlobalContext";
import "../App.css";

function Dropin() {
  const globalContext = useContext(GlobalContext);
  const { tokenObject, makePayment } = globalContext;
  const [braintreeInstance, setBraintreeInstance] = useState(undefined);

  const onSubmitHandler = () => {
    if (braintreeInstance) {
      braintreeInstance.requestPaymentMethod((error, payload) => {
        if (error) {
          console.error(error);
        } else {
          const paymentMethodNonce = payload.nonce;
          //  console.log("payment method nonce", payload.nonce);
          makePayment(paymentMethodNonce);
        }
      });
    }
  };

  useEffect(() => {
    const initializeBraintree = () =>
      dropin.create(
        {
          authorization: tokenObject,
          container: "#dropin-container",
          paypal: {
            flow: "checkout",
            amount: "10.00",
            currency: "EUR",
          },
        },
        function (error, instance) {
          if (error) console.error(error);
          else setBraintreeInstance(instance);
        }
      );

    if (braintreeInstance) {
      braintreeInstance.teardown().then(() => {
        initializeBraintree();
      });
    } else {
      initializeBraintree();
    }
  }, [tokenObject]);
  return (
    <>
      <div id="dropin-container"></div>
      <button id="submit-button" onClick={onSubmitHandler}>
        Purchase
      </button>
    </>
  );
}

export default Dropin;
