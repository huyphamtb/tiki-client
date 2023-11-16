import axiosClient from "./instances/axiosClient";

const queryNotifications = (userId) => {
  return axiosClient({
    method: "GET",
    url: `/notifications/${userId}`,
  });
};

const NOTIFICATION_API = {
  queryNotifications,
};

export default NOTIFICATION_API;
