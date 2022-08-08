// @ts-nocheck
const reducer = (state, action) => {
  switch (action.type) {
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    /*case "INCREASE_AMOUNT":
      let tempCart = state.cart.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            amount: item.amount + 1,
          };
        }
        return item;
      });
      return {
        ...state,
        cart: tempCart,
      };

    case "DECREASE_AMOUNT":
      let newCart = state.cart
        .map((item) => {
          if (item.id === action.payload) {
            return {
              ...item,
              amount: item.amount - 1,
            };
          }
          return item;
        })
        .filter((item) => item.amount !== 0);
      return {
        ...state,
        cart: newCart,
      };
      */

    case "LOADING":
      return {
        ...state,
        loading: true,
      };

    case "DISPLAY_ITEMS":
      return {
        ...state,
        cart: action.payload,
        loading: false,
      };

    case "TOGGLE_AMOUNT":
      let tempCart = state.cart
        .map((item) => {
          if (item.id === action.payload.id) {
            if (action.payload.type === "custom") {
              console.log(item.amount);
              return {
                ...item,
                amount: Number(action.payload.amount),
              };
            }
            if (action.payload.type === "inc") {
              return {
                ...item,
                amount: item.amount + 1,
              };
            }
            if (action.payload.type === "dec") {
              return {
                ...item,
                amount: item.amount - 1,
              };
            }
          }
          return item;
        })
        .filter((item) => item.amount !== 0);
      return {
        ...state,
        cart: tempCart,
      };

    case "GET_TOTALS":
      let { total, amount } = state.cart.reduce(
        (cartTotal, cartItem) => {
          //cartTotal obje döndürür: code 2'deki değeri döndürür.
          const { price, amount } = cartItem; //cartItem = cart içerisindeki elemanlar.
          const itemTotal = price * amount;
          cartTotal.total += itemTotal;
          cartTotal.amount += amount;
          return cartTotal;
        },
        {
          //code 2
          total: 0,
          amount: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      return {
        ...state,
        total,
        amount,
      };

    case "INPUT_AMOUNT_CHANGE":
      return {
        ...state,
        amount: action.payload,
      };

    default:
      break;
  }

  return state;
};

export default reducer;
