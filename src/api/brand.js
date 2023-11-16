import axiosClient from "./instances/axiosClient";

const queryBrands = () => {
  return axiosClient({
    method: "GET",
    url: `/brands?status=true`,
  });
};

const BRAND_API = {
  queryBrands,
};

export default BRAND_API;
