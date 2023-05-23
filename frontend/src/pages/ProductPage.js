import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Rating from "../components/Rating";
import Col from "react-bootstrap/Col";
import { MainLogic } from "../MainLogic";

const getError = (error) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};

// Reducer function that handles various actions and updates the state based on the action
// type, such as setting the loading state to true, updating the product
// data and setting loading to false on successful data retrieval,
// setting the loading state to false and storing the error on data
// retrieval failure, and returning the current state by default.
const reducer = (state, action) => {
  switch (action.type) {
    case "GET_DATA_REQUEST":
      return { ...state, loading: true };
    case "GET_DATA_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "GET_DATA_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductPage() {
  const navigate = useNavigate();
  const params = useParams();
  const { productTag } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });

  // useEffect hook to fetch data by dispatching appropriate
  // actions and making an API request to retrieve product data
  // based on the specified productTag, and then updating the state
  // based on the success or failure of the request. This effect is
  // triggered whenever the productTag dependency changes.
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "GET_DATA_REQUEST" });
      try {
        const result = await axios.get(
          `/api/productsData/productTag/${productTag}`
        );
        dispatch({ type: "GET_DATA_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "GET_DATA_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [productTag]);

  const { state, dispatch: ctxDispatch } = useContext(MainLogic);
  const { cart } = state;

  // Function handleAddToCart that adds a product to
  // the cart by checking if the product already exists in the cart,
  // determining the quantity accordingly, making an API request to retrieve
  // the product information, checking if the available stock is sufficient,
  // dispatching an action to add the product with the specified quantity to the cart
  // context, and navigating the user to the api page using the navigate function.
  const handleAddToCart = async () => {
    const checkExistedProduct = cart.cartItems.find(
      (existedProd) => existedProd._id === product._id
    );

    const quantity = checkExistedProduct ? checkExistedProduct.quantity + 1 : 1;

    const { data } = await axios.get(`/api/productsData/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert("Product Finished.");
      return;
    }
    ctxDispatch({
      type: "ACTION_CART_ADDING",
      payload: { ...product, quantity },
    });
    navigate("/cart");
  };

  return loading ? (
    <h1>Page loading...</h1>
  ) : error ? (
    <div className="error-box">{error}</div>
  ) : (
    <div className="product-big-page">
      <Row className="row-full-product">
        <Col md={4}>
          <img className="img-large" src={product.image} alt="product"></img>
          <h1 className="full-product-name">{product.name}</h1>
        </Col>
        <Col md={7}>
          <h4>
            <strong>Price:</strong> {product.price} $
          </h4>
          Description:
          <p>{product.description}</p>
          <h5>Seller: {product.brand}</h5>
          <h5>Product category: {product.category}</h5>
          <Rating
            rating={product.rating}
            numReviews={product.numReviews}
          ></Rating>
          {product.countInStock > 0 ? (
            <div>
              <button
                className="product-add-cart-btn"
                onClick={handleAddToCart}
              >
                Add to cart
              </button>
            </div>
          ) : (
            <div>
              <button className="product-add-cart-btn" disabled>
                Add to cart
              </button>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default ProductPage;
