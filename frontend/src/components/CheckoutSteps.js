import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function CheckoutSteps(props) {
  return (
    <Row className="checkout-steps">
      <Col id="first-step" className={props.step1 ? "active" : ""}>Sign-In <i className="fas fa-check-circle"></i></Col>
      <Col className={props.step2 ? "active" : ""}>Shipping <i className="fas fa-check-circle"></i></Col>
      <Col className={props.step3 ? "active" : ""}>Payment <i className="fas fa-check-circle"></i></Col>
      <Col id="last-step" className={props.step4 ? "active" : ""}>Submit Order <i className="fas fa-check-circle"></i></Col>
    </Row>
  );
}
