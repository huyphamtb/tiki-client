import { createSlice } from "@reduxjs/toolkit";

export const initState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initState,
  reducers: {
    loadCart(state, { payload }) {
      state.cartItems = payload;
    },
    addToCart(state, action) {
      state.cartItems.push(action.payload);
    },
    updateCart(state, { payload }) {
      const { _id } = payload;
      const index = state.cartItems.findIndex((item) => item._id === _id);

      state.cartItems[index] = payload;
    },
    removeCartItem(state, { payload }) {
      state.cartItems = state.cartItems.filter((item) => item._id !== payload);
    },
  },
});

const { actions, reducer } = cartSlice;

export const cartActions = actions;
export default reducer;
