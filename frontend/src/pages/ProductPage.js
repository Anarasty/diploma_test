import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Rating from "../components/Rating";
import { MainLogic } from "../MainLogic";

const getError = (error) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};

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
