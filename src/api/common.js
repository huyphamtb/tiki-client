import axiosClient from "./instances/axiosClient";

const getProducts = () => {
  return axiosClient({
    method: "GET",
    url: `/products?status=true&page=1`,
  });
};

const getCategories = () => {
  return axiosClient({
    method: "GET",
    url: `/categories?status=true&page=1`,
  });
};

const getBrands = () => {
  return axiosClient({
    method: "GET",
    url: `/brands?status=true&page=1`,
  });
};

const COMMON_API = {
  getProducts,
  getCategories,
  getBrands,
};

export default COMMON_API;
