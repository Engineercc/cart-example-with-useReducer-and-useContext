// @ts-nocheck
import React, { useContext, useReducer, useEffect } from "react";
import cartItems from "./data";
import reducer from "./reducer";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-useReducer-cart-project";
const AppContext = React.createContext();

const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
};
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  
  const clearCart = () => {
    dispatch({
      type: "CLEAR_CART",
    });
  };

  const removeItem = (id) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: id,
    });
  };

  const increaseAmount = (id) => {
    dispatch({
      type: "INCREASE_AMOUNT",
      payload: id,
    });
  };

  const decreaseAmount = (id) => {
    dispatch({
      type: "DECREASE_AMOUNT",
      payload: id,
    });
  };

  const fetchData = async ()=> {
    dispatch({
      type: 'LOADING',
    })
      const response = await fetch(url);
      const cart= await response.json();
    dispatch({
      type: 'DISPLAY_ITEMS',
      payload: cart
    })
  }

  const toggleAmount = (id,type,amount)=> {
    dispatch({
      type: "TOGGLE_AMOUNT",
      payload: {
        id,
        type,
        amount
      },
    });
  }

  const InputAmountChange =(amount) => {
    dispatch({
      type: 'INPUT_AMOUNT_CHANGE',
      payload: amount
    })
  }
  useEffect(() => {
    fetchData()
  },[])

  useEffect(() => {
    dispatch({
      type: "GET_TOTALS",
    });
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increaseAmount,
        decreaseAmount,
        toggleAmount,
        InputAmountChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
