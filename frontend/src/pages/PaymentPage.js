import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Store } from "../Store";

export default function PaymentPage() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || "PayPal"
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

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
