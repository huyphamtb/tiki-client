import axiosClient from "./instances/axiosClient";

const addToCart = (data) => {
  return axiosClient({
    method: "POST",
    url: "/cart-items",
    data,
  });
};

const removeCartItems = (data) => {
  return axiosClient({
    method: "DELETE",
    url: `/cart-items`,
    data,
  });
};

const queryCart = (userId) => {
  return axiosClient({
    method: "GET",
    url: `/cart-items?user_id=${userId}`,
  });
};

const CART_API = {
  addToCart,
  queryCart,
  removeCartItems,
};

export default CART_API;
