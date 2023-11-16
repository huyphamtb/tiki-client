import axiosClient from "./instances/axiosClient";

const updateConfigs = (data) => {
  return axiosClient({
    method: "PUT",
    url: `/configs`,
    data,
  });
};

const getConfigs = () => {
  return axiosClient({
    method: "GET",
    url: `/configs`,
  });
};

const CONFIGS_API = {
  updateConfigs,
  getConfigs,
};

export default CONFIGS_API;
