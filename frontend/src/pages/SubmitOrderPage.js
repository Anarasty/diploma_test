import React, { useContext, useEffect, useReducer } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { MainLogic } from "../MainLogic";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "axios";

const getError = (error) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ORDER_CREATE_REQUEST":
      return { ...state, loading: true };
    case "ORDER_CREATE_SUCCESS":
      return { ...state, loading: false };
    case "ORDER_CREATE_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default function SubmitOrderPage() {
  const navigate = useNavigate();

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const { state, dispatch: ctxDispatch } = useContext(MainLogic);
  const { cart, userInfo } = state;

  const getRoundTwo = (number) =>
    Math.round(number * 100 + Number.EPSILON) / 100;
  cart.itemsPrice = getRoundTwo(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = 0;
  cart.taxPrice = 0;
  cart.totalPrice = cart.itemsPrice;

  const submitOrderAction = async () => {
    try {
      dispatch({ type: "ORDER_CREATE_REQUEST" });
      const { data } = await Axios.post(
        "/api/orders",
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: "ACTION_CART_RESET" });
      dispatch({ type: "ORDER_CREATE_SUCCESS" });
      localStorage.removeItem("cartItems");
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      dispatch({ type: "ORDER_CREATE_FAIL" });
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart, navigate]);

  return (
    <div className="submit-order-page-main-section">
      <h1 className="submit-order-page-title">Submit order</h1>
      <Row>
        <Row md={8}>
          <Card className="mb-3">
            <Card.Body className="submit-order-body">
              <h3 className="text-center">Devilery info</h3>
              <div className="devilery-container-order">
                {" "}
                <span>Name: {cart.shippingAddress.fullName}</span>
                <span>Address: {cart.shippingAddress.address}</span>
                <span>City: {cart.shippingAddress.city}</span>
                <span>County: {cart.shippingAddress.country}</span>
                <span>Postal: {cart.shippingAddress.postalCode}</span>
              </div>
              <div className="line-horizontal"></div>
              <h3 className="text-center">Payment info</h3>
              <div>
                <span>Method: {cart.paymentMethod}</span>
              </div>
              <div className="line-horizontal"></div>
              <h3 className="text-center">Products</h3>
              <ListGroup variant="flush">
                {cart.cartItems.map((product) => (
                  <ListGroup.Item key={product._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img src={product.image} alt={product.name}></img>{" "}
                        <Link to={`/product/${product.productTag}`}>
                          {product.name}
                        </Link>
                      </Col>
                      <Col md={3}>
                        <span>{product.quantity}x</span>
                      </Col>
                      <Col md={3}>{product.price} $</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Row className="total-confirm-container">
                <Col>Order Total:</Col>
                <Col>{cart.totalPrice.toFixed(2)} $</Col>
                <Col>
                  <div>
                    <button
                      onClick={submitOrderAction}
                      disabled={cart.cartItems.length === 0}
                      className="submit-order-btn-confirmation"
                    >
                      Confirm <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                  {loading && <h1>Page loading...</h1>}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      </Row>
    </div>
  );
}
