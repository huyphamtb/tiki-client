import axiosClient from "./instances/axiosClient";

const getProductImages = (productId) => {
  return axiosClient({
    method: "GET",
    url: `/product-images?product_id=${productId}`,
  });
};

const getOneProduct = (slug) => {
  return axiosClient({
    method: "GET",
    url: `/products/${slug}`,
  });
};

const queryProducts = (query) => {
  return axiosClient({
    method: "GET",
    url: `/products${query}`,
  });
};

const rate = (data) => {
  return axiosClient({
    method: "POST",
    url: "/ratings",
    data,
  });
};

const queryRates = (query) => {
  return axiosClient({
    method: "GET",
    url: `/ratings${query}`,
  });
};

const getIsBought = (userId, productId) => {
  return axiosClient({
    method: "GET",
    url: `/ratings/bought?user_id=${userId}&product_id=${productId}`,
  });
};

const PRODUCT_API = {
  getOneProduct,
  queryProducts,
  rate,
  queryRates,
  getIsBought,
  getProductImages,
};

export default PRODUCT_API;
