import Axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useContext, useEffect, useState } from "react";
import { MainLogic } from "../MainLogic";
import { toast } from "react-toastify";

const getError = (error) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const { search } = useLocation();

  const URLSearchParamsRedirect = new URLSearchParams(search).get("redirect");
  const URLredirect = URLSearchParamsRedirect ? URLSearchParamsRedirect : "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(MainLogic);
  const { userInfo } = state;

  // Handles form submission, validates the
  // password and confirm password match, signs up a new user,
  // logs in the user, stores user information, and navigates to a
  // specified URL or the homepage, displaying error messages when necessary.
  const formSubmitAction = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Wrong password!");
      return;
    }
    try {
      const { data } = await Axios.post("/api/usersData/register", {
        name,
        email,
        password,
      });
      ctxDispatch({ type: "ACTION_USER_LOGIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(URLredirect || "/");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  // Utilizes the useEffect hook to check if the userInfo exists,
  // and if so, it navigates the user to the specified URLredirect.
  // This effect is triggered whenever the navigate, URLredirect,
  // or userInfo dependencies change.
  useEffect(() => {
    if (userInfo) {
      navigate(URLredirect);
    }
  }, [navigate, URLredirect, userInfo]);

  return (
    <div className="container small-container register-page-main">
      <h1 className="signin-page-title">Register</h1>
      <Form className="register-form" onSubmit={formSubmitAction}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Max Peterson"
            autoComplete="off"
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="example@gmail.com"
            autoComplete="off"
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>
        <div className="register-btns-container">
          <button className="submit-register-btn" type="submit">
            Submit
          </button>
          <Link to={`/login?redirect=${URLredirect}`}>LogIn</Link>
        </div>
      </Form>
    </div>
  );
}
