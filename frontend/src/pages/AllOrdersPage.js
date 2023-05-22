import React, { useContext, useEffect, useReducer } from "react";
import { Store } from "../Store";
import { Link } from "react-router-dom";
import { getError } from "../utils";
import axios from "axios";
import Col from "react-bootstrap/esm/Col";

// This code defines a reducer function that updates 
// the state based on different action types, such as setting 
// the loading state, updating orders, handling errors, or returning 
// the current state if the action type is not recognized.
const reducer = (state, action) => {
  switch (action.type) {
    case "GET_DATA_REQUEST":
      return { ...state, loading: true };
    case "GET_DATA_SUCCESS":
      return { ...state, orders: action.payload, loading: false };
    case "GET_DATA_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function AllOrdersPage() {

  // This code retrieves user information from the state, 
  //initializes the reducer with loading and error states, 
  //and triggers an asynchronous request to fetch data (orders) from the 
  //server using the user's authorization token, updating the state 
  //accordingly with loading, success, or error actions.
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  useEffect(() => {
    const getData = async () => {
      dispatch({ type: "GET_DATA_REQUEST" });
      try {
        const { data } = await axios.get(
          `/api/orders/myorders`,

          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        dispatch({ type: "GET_DATA_SUCCESS", payload: data });
      } catch (error) {
        dispatch({
          type: "GET_DATA_FAIL",
          payload: getError(error),
        });
      }
    };
    getData();
  }, [userInfo]);

  return (
    <div className="all-orders-page-main-section">
      <h1 className="all-orders-page-title">All user Orders</h1>
      {loading ? (
         <h1>Page loading...</h1>
      ) : error ? (
        <div className="error-box">{error}</div>
      ) : (
        <div className="orders-boxes">
               {orders.map((order) => (
              <Col key={order._id} className="orders-col-all-orders">
                <span><Link to={`/order/${order._id}`}>Check order</Link></span>
                <span>{order.createdAt.substring(0, 10)}</span>
                <span>{order.totalPrice.toFixed(2)} $</span>
                <span>{order.isPaid ? order.paidAt.substring(0, 10) : "NOT PAID"}</span>
              </Col>

            ))}
        </div>
      )}
    </div>
  );
}
