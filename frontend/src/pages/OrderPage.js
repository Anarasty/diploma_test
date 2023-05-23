import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import { MainLogic } from "../MainLogic";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const getError = (error) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};

// Defines a reducer function that updates 
//the state based on different action types, 
//such as setting loading and error states for data 
//retrieval, updating the state with fetched order data, 
//handling payment-related actions and returning the current state 
//if the action type is not recognized.
function reducer(state, action) {
  switch (action.type) {
    case "GET_DATA_REQUEST":
      return { ...state, loading: true, error: "" };
    case "GET_DATA_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "GET_DATA_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "GET_PAY_REQUEST":
      return { ...state, loadingPay: true };
    case "GET_PAY_SUCCESS":
      return { ...state, loadingPay: false, successPay: true };
    case "GET_PAY_FAIL":
      return { ...state, loadingPay: false };
    case "GET_PAY_RESET":
      return { ...state, loadingPay: false, successPay: false };
    default:
      return state;
  }
}

export default function OrderPage() {
  const { state } = useContext(MainLogic);
  const { userInfo } = state;

  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();

  const [{ loading, error, order, successPay, loadingPay }, dispatch] =
    useReducer(reducer, {
      loading: true,
      order: {},
      error: "",
      successPay: false,
      loadingPay: false,
    });

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();


  //Defines a function named createOrder 
  //that receives data and actions as arguments, and 
  //it uses the actions.order.create method to create a 
  //new order with the provided purchase_units data (including 
  //the order total price), and it returns a promise that resolves with the orderID.
  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  //Defines a function named onApprove that 
  //receives data and actions as arguments, 
  //and it uses the actions.order.capture method 
  //to capture the payment for an order, 
  //dispatches appropriate actions to update the 
  //state with payment-related status, 
  //sends an asynchronous PUT request to update the 
  //order payment status on the server, displays success 
  //or error messages using the toast library, and returns a promise.
  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: "GET_PAY_REQUEST" });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: "GET_PAY_SUCCESS", payload: data });
        // toast.success("Order is paid");
      } catch (err) {
        dispatch({ type: "GET_PAY_FAIL", payload: getError(err) });
        toast.error(getError(err));
      }
    });
  }


  function onError(err) {
    toast.error(getError(err));
  }

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "GET_DATA_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "GET_DATA_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "GET_DATA_FAIL", payload: getError(err) });
      }
    };

    if (!userInfo) {
      return navigate("/login");
    }
    if (!order._id || successPay || (order._id && order._id !== orderId)) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: "GET_PAY_RESET" });
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get("/api/keys/paypal", {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      loadPaypalScript();
    }
  }, [order, userInfo, orderId, navigate, paypalDispatch, successPay]);
  return loading ? (
    <h1>Page loading...</h1>
  ) : error ? (
    <div className="error-box">{error}</div>
  ) : (
    <div className="order-page-main-section">
      <h1 className="my-3 text-center">Order Payment</h1>
      <Row>
        <Row md={8}>
          <Card className="mb-3">
            <Card.Body className="card-order-body">
              <h3 className="text-center">Devilery info</h3>
              <div className="devilery-container-order">
                {" "}
                <span>Name: {order.deliveryAddress.fullName}</span>
                <span>Address: {order.deliveryAddress.address}</span>
                <span>City: {order.deliveryAddress.city}</span>
                <span>County: {order.deliveryAddress.country}</span>
                <span>Postal: {order.deliveryAddress.postalCode}</span>
              </div>
              <div className="line-horizontal"></div>
              <h3 className="text-center">Payment</h3>
              <div className="devilery-container-order">
                <span>Method: {order.paymentMethod}</span>
                <span>
                  {" "}
                  Payment status:{" "}
                  {order.paymentChecked ? (
                    <span className="status-box-done">
                      Paid at {order.paymentData.substring(0, 10)}
                    </span>
                  ) : (
                    <span className="status-box-undone">Not Paid</span>
                  )}
                </span>
              </div>
              <div className="line-horizontal"></div>
              <h3 className="text-center">Products</h3>
              <ListGroup variant="flush">
                {order.orderItems.map((product) => (
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
                <Col>{order.totalPrice.toFixed(2)} $</Col>
                <Col>
                {!order.paymentChecked && (
                  <div>
                    {isPending ? (
                      <h1>Page loading...</h1>
                    ) : (
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    )}
                    {loadingPay && <h1>Page loading...</h1>}
                  </div>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      </Row>
    </div>
  );
}
