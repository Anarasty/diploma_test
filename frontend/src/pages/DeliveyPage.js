import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { MainLogic } from "../MainLogic";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

export default function DeliveyPage() {
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(MainLogic);

  const {
    userInfo,
    cart: { deliveryAddress },
  } = state;

  const [fullName, setFullName] = useState(deliveryAddress.fullName || "");
  const [address, setAddress] = useState(deliveryAddress.address || "");
  const [city, setCity] = useState(deliveryAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    deliveryAddress.postalCode || ""
  );

  useEffect(() => {
    if (!userInfo) {
      navigate("/login?redirect=/delivery");
    }
  }, [userInfo, navigate]);

  //Initializes a state variable country with the value 
  //from deliveryAddress.country or an empty string, 
  //defines a form submit action that dispatches an 
  //action to remember the address with form input values, 
  //stores the address in local storage, and navigates 
  //to the "/payment" page when the form is submitted.
  const [country, setCountry] = useState(deliveryAddress.country || "");
  const formSubmitAction = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: "ACTION_REMEBER_ADDRESS",
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    });
    localStorage.setItem(
      "deliveryAddress",
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate("/payment");
  };

  return (
    <div className="shipping-page-main-section">
      <div className="container small-container">
        <h1 className="shipping-page-title">Delivery Information</h1>
        <Form className="shipping-form" onSubmit={formSubmitAction}>
          <Row>
            <Form.Group controlId="fullName">
              <Form.Label>Full name</Form.Label>
              <Form.Control
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="Max Peterson"
              />
            </Form.Group>{" "}
          </Row>
          <Row className="row-delivery-address">
            <Col>
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  placeholder="28 Saint st. 20"
                />
              </Form.Group>
              <Form.Group controlId="postalCode">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                  placeholder="201020"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  placeholder="Kyiv"
                />
              </Form.Group>
              <Form.Group controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  placeholder="Ukraine"
                />
              </Form.Group>
            </Col>
          </Row>
          <div>
            <button className="shipping-btn" type="submit">
              Payment <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
