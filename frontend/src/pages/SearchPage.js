import React, { useEffect, useReducer, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/Product";
import Button from "react-bootstrap/Button";
import LinkContainer from "react-router-bootstrap/LinkContainer";
import axios from "axios";

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
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case "GET_DATA_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const prices = [
  {
    name: "1 - 30",
    value: "1-30",
  },
  {
    name: "30 - 100",
    value: "30-100",
  },
  {
    name: "100 - 400",
    value: "101-400",
  },
  {
    name: "400+",
    value: "401-2000",
  },
];

export default function SearchPage() {
  const navigate = useNavigate();
  const { search } = useLocation();

  const searchParams = new URLSearchParams(search); // /search?category=Shirts
  const category = searchParams.get("category") || "all";
  const query = searchParams.get("query") || "all";
  const price = searchParams.get("price") || "all";
  const rating = searchParams.get("rating") || "all";
  const order = searchParams.get("order") || "newest";
  const page = searchParams.get("page") || 1;

  const [{ loading, error, products, pages }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/products/search", {
          params: {
            page: page,
            query: query,
            category: category,
            price: price,
            rating: rating,
            order: order,
          },
        });
        dispatch({ type: "GET_DATA_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "GET_DATA_FAIL",
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [category, error, order, page, price, query, rating]);

  const [categories, setCategories] = useState([]);
  useEffect(
    () => {
      const getCategoriesFunc = async () => {
        try {
          const { data } = await axios.get(`/api/products/categories`);
          setCategories(data);
        } catch (err) {
          toast.error(getError(err));
        }
      };
      getCategoriesFunc();
    },
    [dispatch],
    categories
  );

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;
    return {
      pathname: "/search",
      search: `?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`,
    };
  };

  return (
    <div className="search-page-main-section">
      <Row>
        <Col md={3}>
          <h3>Category</h3>
          <div>
            <ul>
              <li>
                <Link
                  className={"all" === category ? "text-bold active-filter" : ""}
                  to={getFilterUrl({ category: "all" })}
                >
                  Any
                </Link>
              </li>
              {categories.map((categoryName) => (
                <li key={categoryName}>
                  <Link
                    className={categoryName === category ? "text-bold active-filter" : ""}
                    to={getFilterUrl({ category: categoryName })}
                  >
                    {categoryName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Price</h3>
            <ul>
              <li>
                <Link
                  className={"all" === price ? "text-bold active-filter" : ""}
                  to={getFilterUrl({ price: "all" })}
                >
                  Any
                </Link>
              </li>
              {prices.map((pricesFilter) => (
                <li key={pricesFilter.value}>
                  <Link
                    to={getFilterUrl({ price: pricesFilter.value })}
                    className={pricesFilter.value === price ? "text-bold active-filter" : ""}
                  >
                    {pricesFilter.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Col>
        <Col md={9}>
          {loading ? (
            <h1>Page loading...</h1>
          ) : error ? (
            <div className="error-box">{error}</div>
          ) : (
            <>
              <Row className="justify-content-between mb-3">
                <Col md={6}>
                  <div>Filters
                    {/* {countProducts === 0 ? "No" : countProducts} Results */}
                    {query !== "all" && " : " + query}
                    {category !== "all" && " : " + category}
                    {price !== "all" && " : Price " + price}
                    {rating !== "all" && " : Rating " + rating + " & up"}
                    {query !== "all" ||
                    category !== "all" ||
                    rating !== "all" ||
                    price !== "all" ? (
                      <button className="reset-filter-btn" onClick={() => navigate("/search")} ><i className="fa-solid fa-xmark"></i></button>
                    ) : null}
                  </div>
                </Col>
              </Row>
              {products.length === 0 && (
                <div className="error-box">Product nor found!</div>
              )}
              <Row>
                {products.map((product) => (
                  <Col sm={6} lg={4} className="mb-3" key={product._id}>
                    <Product product={product}></Product>
                  </Col>
                ))}
              </Row>

              <div>
                {[...Array(pages).keys()].map((x) => (
                  <LinkContainer
                    key={x + 1}
                    className="mx-1"
                    to={getFilterUrl({ page: x + 1 })}
                  >
                    <Button
                      className={Number(page) === x + 1 ? "text-bold" : ""}
                      variant="light"
                    >
                      {x + 1}
                    </Button>
                  </LinkContainer>
                ))}
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}
