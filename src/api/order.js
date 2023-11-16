import axiosClient from './instances/axiosClient';

const createOrder = (data) => {
  return axiosClient({
    method: 'POST',
    data,
    url: '/orders',
  });
};

const createOrderItems = (data) => {
  return axiosClient({
    method: 'POST',
    data,
    url: '/order-items',
  });
};

const queryUserOrdersList = (userId) => {
  return axiosClient({
    method: 'GET',
    url: `/orders/user?user=${userId}`,
  });
};

const canceledOrder = (_id) => {
  return axiosClient({
    method: 'PUT',
    url: `/orders/cancel-order/${_id}`,
  });
};

const getOneOrder = (_id) => {
  return axiosClient({
    method: 'GET',
    url: `/orders/${_id}`,
  });
};

const ORDER_API = {
  createOrder,
  createOrderItems,
  queryUserOrdersList,
  canceledOrder,
  getOneOrder,
};

export default ORDER_API;
