import React, { useContext, useReducer, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { MainLogic } from '../MainLogic';
import { toast } from 'react-toastify';
import axios from 'axios';

const getError = (error) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};

//Defines a reducer function that updates 
//the state based on different action types, such 
//as setting the loadingUpdate state when performing 
//an update operation, updating the state with 
//loadingUpdate status upon successful or failed 
//update, and returning the current state if the 
//action type is not recognized.
const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };

    default:
      return state;
  }
};

export default function UserProfilePage() {
  const { state, dispatch: ctxDispatch } = useContext(MainLogic);
  const { userInfo } = state;

  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  //This code defines a function named formSubmitAction 
  //that sends a PUT request to update user data with 
  //the provided name, email, and password, dispatches 
  //actions to update the state with success status and 
  //update the user login information, stores the updated 
  //user information in local storage, and displays success 
  //or error toast messages accordingly.
  const formSubmitAction = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        '/api/usersData/edituser',
        {
          name,
          email,
          password,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      ctxDispatch({ type: 'ACTION_USER_LOGIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (err) {
      dispatch({
        type: 'GET_DATA_FAIL',
      });
      toast.error(getError(err));
    }
  };

  return (
    <div className="container small-container edit-user-section">
      <h1 className="user-page-title">Edit profile</h1>
      <form className='user-update-form' onSubmit={formSubmitAction}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <button className='user-update-btn' type="submit">Update</button>
      </form>
    </div>
  );
}