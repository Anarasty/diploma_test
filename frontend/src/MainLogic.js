import { createContext, useReducer } from "react";

export const MainLogic = createContext();

//This code initializes an object named getAllLocalStates 
//that retrieves data from the local storage and assigns it to 
//corresponding properties, such as user information, shipping address, 
//payment method, and cart items, parsing them from JSON if they exist 
//or setting default values if they don't.
const getAllLocalStates = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  cart: {
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: localStorage.getItem("paymentMethod")
      ? localStorage.getItem("paymentItem")
      : "",
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

//This code defines a reducer function that updates the 
//state based on different action types, such as adding 
//or removing items from the cart, resetting the cart, 
//logging in or out the user, remembering the shipping address, 
//or saving the payment method, and returns the updated state.
function reducer(state, action) {
  switch (action.type) {
    case "ACTION_CART_ADDING":
      const addedProduct = action.payload;
      const checkExistedProduct = state.cart.cartItems.find(
        (prod) => prod._id === addedProduct._id
      );
      const cartItems = checkExistedProduct
        ? state.cart.cartItems.map((prod) =>
            prod._id === checkExistedProduct._id ? addedProduct : prod
          )
        : [...state.cart.cartItems, addedProduct];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };

    case "ACTION_CART_REMOVING": {
      const cartItems = state.cart.cartItems.filter(
        (prod) => prod._id !== action.payload._id
      );
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "ACTION_CART_RESET":
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    case "ACTION_USER_LOGIN":
      return { ...state, userInfo: action.payload };
    case "ACTION_USER_LOGOUT":
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: [],
          paymentMethod: "",
        },
      };
    case "ACTION_REMEBER_ADDRESS":
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      };
    case "SAVE_PAYMENT_METHOD":
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload,
        },
      };
    default:
      return state;
  }
}

export function MainLogicProvider(props) {
  const [state, dispatch] = useReducer(reducer, getAllLocalStates);
  const value = { state, dispatch };
  return (
    <MainLogic.Provider value={value}>{props.children}</MainLogic.Provider>
  );
}
