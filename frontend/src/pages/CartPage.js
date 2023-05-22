import { useContext } from "react";
import { Store } from "../Store";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CartPage() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems }, 
  } = state;

  const handleUpdateCartProducts = async (product, quantity) => {
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert("Product finished.");
      return;
    }
    ctxDispatch({
      type: "ACTION_CART_ADDING",
      payload: { ...product, quantity },
    });
  };

  const handleRemoveCartProduct = (product) => {
    ctxDispatch({ type: "ACTION_CART_REMOVING", payload: product });
  };

  const handleCheckout = () => {
    navigate("/signin?redirect=/shipping");
  };

  return (
    <div className="cart-page-main-section">
      <h1 className="cart-page-title">Your cart</h1>
      <Row>
      <Col md={4}>
          <Card className="card-cart">
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h4>
                    Products amount:{" "}
                    {cartItems.reduce(
                      (productAmound, product) =>
                        productAmound + product.quantity,
                      0
                    )}{" "}
                    products
                  </h4>
                  <h4>
                    Total price:{" "}
                    {cartItems.reduce(
                      (productAmound, product) =>
                        productAmound + product.price * product.quantity,
                      0
                    )}
                    $
                  </h4>
                  <button
                  className="checkout-btn-cart"
                    onClick={handleCheckout}
                    disabled={cartItems.length === 0}
                  >
                    Delivery <i className="fas fa-arrow-right"></i>
                  </button>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8} className="cart-col-products">
          {cartItems.length === 0 ? (
            <div className="empty-cart-message">
              <Link to="/">
                <i className="fas fa-cart-plus"></i>
              </Link>
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((cartProd) => (
                <ListGroup.Item
                  className="cart-product-item-box"
                  key={cartProd._id}
                >
                  <Row className="align-items-center">
                    <Col md={5}>
                      <img src={cartProd.image} alt="product img"></img>{" "}
                      <span>{cartProd.name}</span>
                    </Col>
                    <Col md={2}>${cartProd.price} / 1x</Col>
                    <Col md={3}>
                      <button
                        className="minus-btn-cart"
                        onClick={() =>
                          handleUpdateCartProducts(
                            cartProd,
                            cartProd.quantity - 1
                          )
                        }
                        disabled={cartProd.quantity === 1}
                      >
                        <i className="fas fa-minus fa-lg"></i>
                      </button>
                      <span>{cartProd.quantity}</span>{" "}
                      <button
                        className="plus-btn-cart"
                        onClick={() =>
                          handleUpdateCartProducts(
                            cartProd,
                            cartProd.quantity + 1
                          )
                        }
                        disabled={cartProd.quantity === cartProd.countInStock}
                      >
                        <i className="fas fa-plus fa-lg"></i>
                      </button>
                    </Col>
                    <Col md={2}>
                      <button
                        className="trash-cart-btn"
                        onClick={() => handleRemoveCartProduct(cartProd)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </div>
  );
}
