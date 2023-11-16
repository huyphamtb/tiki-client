import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "./common";
import cartReducer from "./cart";

export default configureStore({
  reducer: {
    common: commonReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
