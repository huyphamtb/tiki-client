import axiosClient from "./instances/axiosClient";

const register = (data) => {
  return axiosClient({
    method: "POST",
    url: "/users",
    data,
  });
};

const login = (data) => {
  return axiosClient({
    method: "POST",
    url: "/sign-in",
    data,
  });
};

const verify = (accessToken) => {
  return axiosClient({
    method: "GET",
    url: `/verify/${accessToken}`,
  });
};

const loginWithGoogle = (data) => {
  return axiosClient({
    method: "POST",
    url: `/users/google`,
    data,
  });
};

const AUTH_API = {
  register,
  login,
  verify,
  loginWithGoogle,
};

export default AUTH_API;
