import axiosClient from "./instances/axiosClient";

const queryCategories = () => {
  return axiosClient({
    method: "GET",
    url: `/categories?status=true`,
  });
};

const CATEGORY_API = {
  queryCategories,
};

export default CATEGORY_API;
