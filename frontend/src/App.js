// import data from "./data";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ProductPage from "./pages/ProductPage";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavDropdown from "react-bootstrap/NavDropdown";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { useContext, useEffect, useState } from "react";
import { MainLogic } from "./MainLogic";
import CartPage from "./pages/CartPage";
import LogInPage from "./pages/LogInPage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShippingPage from "./pages/ShippingPage";
import RegisterPage from "./pages/RegisterPage";
import PaymentPage from "./pages/PaymentPage";
import SubmitOrderPage from "./pages/SubmitOrderPage";
import OrderPage from "./pages/OrderPage";
import AllOrdersPage from "./pages/AllOrdersPage";
import UserProfilePage from "./pages/UserProfilePage";
import SearchComponent from "./components/SearchComponent";
import SearchPage from "./pages/SearchPage";
import ContactPage from "./pages/ContactPage";

function App() {
  const { state, dispatch: ctxDispatch } = useContext(MainLogic);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };

  return (
    <BrowserRouter>
      <div>
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar
            className="navbar-main"
            //  bg="dark" variant="dark"
            expand="lg"
          >
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand className="logo-nav">EasyShop</Navbar.Brand>
              </LinkContainer>
              {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
              <Navbar.Collapse id="basic-navbar-nav">
                <SearchComponent />
                <Nav className="w-100 justify-content-end navbar-second">
                  <Link to="/cart" className="nav-link">
                    <i className="fa-solid fa-cart-shopping"></i>
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="success">
                        {cart.cartItems.reduce(
                          (productAmount, product) =>
                            productAmount + product.quantity,
                          0
                        )}
                      </Badge>
                    )}
                  </Link>
                  {userInfo ? (
                    <NavDropdown
                      title={userInfo.name}
                      id="basic-nav-dropdown"
                      className="dropdown-user"
                    >
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>Edit Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Orders Info</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/shipping">
                        <NavDropdown.Item>Delivery Info</NavDropdown.Item>
                      </LinkContainer>
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >
                        Logout
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Login
                    </Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:productTag" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/signin" element={<LogInPage />} />
              <Route path="/signup" element={<RegisterPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/profile" element={<UserProfilePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/submitorder" element={<SubmitOrderPage />} />
              <Route path="/order/:id" element={<OrderPage />} />
              <Route path="/orderhistory" element={<AllOrdersPage />}></Route>
              <Route path="/shipping" element={<ShippingPage />}></Route>
              <Route path="/payment" element={<PaymentPage />}></Route>
              <Route path="/" element={<MainPage />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">
            <div className="footer-containers">
              <Row>
                <Col>
                  <h3>Contacts</h3>
                  <ul className="contacts">
                    <li>
                      <Link className="message-btn" to="/contact">
                        Message Us
                      </Link>
                    </li>
                    <li>
                      <i className="fa-solid fa-phone"></i> +987 654 321
                    </li>
                    <li>
                      <i className="fa-solid fa-envelope"></i>{" "}
                      easy1shop@bussines.com
                    </li>
                  </ul>
                </Col>
                <Col>
                  <h3>Social Media</h3>
                  <ul className="social-icons">
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h5>EasyShop 2023 © All right reserved</h5>
                </Col>
              </Row>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
