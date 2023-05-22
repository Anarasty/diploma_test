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

export default function LogInPage() {
  const navigate = useNavigate();

  const { search } = useLocation();

  const URLSearchParamsRedirect = new URLSearchParams(search).get("redirect");
  const URLredirect = URLSearchParamsRedirect ? URLSearchParamsRedirect : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(MainLogic);
  const { userInfo } = state;

  //Defines an asynchronous function named formSubmitAction 
  //that is triggered when a form is submitted, sending a POST request 
  //to the server with the provided email and password, dispatching a login 
  //action with the received data, storing the user information in local storage, 
  //and navigating to a specified URL or the homepage if successful, or 
  //displaying an error message using the toast library if there is an error.
  const formSubmitAction = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post("/api/users/signin", {
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

  //Sets up an effect that triggers when the 
  //userInfo variable changes, and if userInfo is truthy 
  //navigates to the specified 
  //URLredirect using the navigate function.
  useEffect(() => {
    if (userInfo) {
      navigate(URLredirect);
    }
  }, [navigate, URLredirect, userInfo]);

  return (
    <div className="container small-container login-page-main">
      <h1 className="login-page-title">LogIn</h1>
      <Form className="login-form" onSubmit={formSubmitAction}>
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
        <div className="login-btns-container">
          <button className="submit-login-btn" type="submit">LogIn</button>
          <Link to={`/signup?redirect=${URLredirect}`}>Register</Link>
        </div>
      </Form>
    </div>
  );
}
