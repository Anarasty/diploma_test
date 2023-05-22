import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { MainLogic } from "../MainLogic";

export default function PaymentPage() {

  // Import the navigate function from the useNavigate hook,
  // accesses the state and ctxDispatch variables from the MainLogic
  // context using the useContext hook, and extracts the deliveryAddress
  // and paymentMethod values from the cart object within the state.
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(MainLogic);
  const {
    cart: { deliveryAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || "PayPal"
  );

  useEffect(() => {
    if (!deliveryAddress.address) {
      navigate("/delivery");
    }
  }, [deliveryAddress, navigate]);

  // Function that handles form submission by preventing the default
  // form submission behavior, dispatching an action to
  // save the selected payment method to the context, storing the
  // payment method in local storage, and navigating the user
  // to the API page using the navigate function.
  const formSubmitAction = (e) => {
    e.preventDefault();
    ctxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMethod", paymentMethodName);
    navigate("/submitorder");
  };
  return (
    <div className="payment-page-main-section">
      <div className="container small-container">
        <h1 className="payment-page-title">Choose payment method</h1>
        <Form onSubmit={formSubmitAction}>
          <div className="form-payment">
            <Form.Check
              type="radio"
              id="PayPal"
              label="PayPal"
              value="PayPal"
              checked={paymentMethodName === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <Form.Check
              disabled
              type="radio"
              id="PrivatPay"
              label="PrivatPay"
              value="PrivatPay"
              checked={paymentMethodName === "PrivatPay"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <Form.Check
              disabled
              type="radio"
              id="Visa/Mastercard"
              label="Visa/Mastercard"
              value="Visa/Mastercard"
              checked={paymentMethodName === "Visa/Mastercard"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <Form.Check
              disabled
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethodName === "Stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div>
            <button type="submit" className="submit-payment-btn">
              Submit <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
