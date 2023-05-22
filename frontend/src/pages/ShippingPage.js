import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

export default function ShippingPage() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [userInfo, navigate]);

  const [country, setCountry] = useState(shippingAddress.country || "");
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
      "shippingAddress",
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
