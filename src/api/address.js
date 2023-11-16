import axiosClient from './instances/axiosClient';

const createAddress = (data) => {
  return axiosClient({
    url: '/addresses',
    data,
    method: 'POST',
  });
};

const updateAddress = (_id, data) => {
  return axiosClient({
    url: `/addresses/${_id}`,
    data,
    method: 'PUT',
  });
};

const getAddressesByUser = (user) => {
  return axiosClient({
    url: `/addresses?user=${user}`,
    method: 'GET',
  });
};

const removeAddress = (_id) => {
  return axiosClient({
    url: `/addresses/${_id}`,
    method: 'DELETE',
  });
};

const ADDRESS_API = {
  createAddress,
  getAddressesByUser,
  removeAddress,
  updateAddress
};

export default ADDRESS_API;
