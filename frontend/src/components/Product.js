import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Store } from "../Store";
import axios from "axios";

function Product(props) {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "ACTION_CART_ADDING",
      payload: { ...item, quantity },
    });
  };

  return (
    <Card className="solo-product-card">
      <Link to={`/product/${product.productTag}`}>
        <img src={product.image} className="card-img-top" alt='prod name' />
      </Link>
      <Card.Body>
        <Link className="solo-product-name" to={`/product/${product.productTag}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Card.Text>Price: {product.price}$</Card.Text>
        {product.countInStock === 0 ? (
          <button className="solo-product-btn-finished">Finished</button>
        ) : (
          <button className="solo-product-btn-available" onClick={() => addToCartHandler(product)}>Add cart</button>
        )}
      </Card.Body>
    </Card>
  );
}

export default Product;
