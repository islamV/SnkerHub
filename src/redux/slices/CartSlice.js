import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartFromLocalStorage: (state, action) => {
      return [...state, ...action.payload];
    },
    checkoutCart: (state, action) => {
      return [];
    },
    addToCart: (state, action) => {
      return [...state, action.payload];
    },
    removeFromCart: (state, action) => {
      return state.filter((product) => action.payload !== product.id);
    },
    increaseQty: (state, action) => {
      return state.map((product) =>
        product.id === action.payload ? { ...product, qty: product.qty + 1 } : product
      );
    },
    decreaseQty: (state, action) => {
      return state.map((product) =>
        product.id === action.payload ? { ...product, qty: product.qty - 1 } : product
      );
    },
    clearCart: (state, action) => {
      return [];
    },
  },
});

export const {
  setCartFromLocalStorage,
  checkoutCart,
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart ,
} = CartSlice.actions;
export default CartSlice.reducer;
