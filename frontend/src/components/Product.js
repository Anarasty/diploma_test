import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MainLogic } from "../MainLogic";
import axios from "axios";

function Product(props) {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(MainLogic);
  const {
    cart: { cartItems },
  } = state;

  //This code defines a function named handleAddToCart 
  //that checks if the product already exists in the cart, 
  //determines the quantity of the item to be added, 
  //checks if the item is in stock, displays an alert 
  //if it is out of stock, and dispatches an action 
  //to add the item to the cart with the specified quantity.
  const handleAddToCart = async (item) => {
    const checkExistedProduct = cartItems.find((x) => x._id === product._id);
    const quantity = checkExistedProduct ? checkExistedProduct.quantity + 1 : 1;
    const { data } = await axios.get(`/api/productsData/${item._id}`);
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
          <button className="solo-product-btn-available" onClick={() => handleAddToCart(product)}>Add cart</button>
        )}
      </Card.Body>
    </Card>
  );
}

export default Product;
