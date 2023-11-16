import axiosClient from "./instances/axiosClient";

const updateUser = (userId, data) => {
  return axiosClient({
    method: "PUT",
    url: `/users/${userId}`,
    data,
  });
};

const getUserInfo = (userId) => {
  return axiosClient({
    method: "GET",
    url: `/users/${userId}`,
  });
};

const updatePassword = (userId, data) => {
  return axiosClient({
    method: "PUT",
    url: `/users/update-password/${userId}`,
    data,
  });
};

const USER_API = {
  updateUser,
  getUserInfo,
  updatePassword,
};

export default USER_API;
