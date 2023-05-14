import { useEffect, useReducer, useState } from "react";
import axios from "axios";
//import data from "../data";
import { Link } from "react-router-dom";
import logger from "use-reducer-logger";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/Product";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <header className="header-mainpage">
        <h3 className="header-greetings">WELCOME TO </h3>
        <h1 className="header-logo">EasyShop</h1>
        <p className="header-discription">"Create coziness and uniqueness with our handmade products"</p>
      </header>
      <div className="home-banners">
        <Carousel className="carousel" responsive={responsive}>
          <div className="carousel-items">
            <img src="/images/homebanner1.png"></img>
          </div>
          <div className="carousel-items">
            <img src="/images/homebanner2.png"></img>
          </div>
          <div className="carousel-items">
            <img src="/images/homebanner3.png"></img>
          </div>
          <div className="carousel-items">
            <img src="/images/homebanner4.png"></img>
          </div>
          <div className="carousel-items">
            <img src="/images/homebanner5.png"></img>
          </div>
        </Carousel>
      </div>

      <h1>Featured products</h1>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3}>
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
