import axios from 'axios';
import { GHN_URL } from '../../constants/api';

const transportService = axios.create({
  baseURL: GHN_URL,
  headers: {
    Token: 'b7a48467-b3c8-11ec-ac64-422c37c6de1b',
  },
});

transportService.interceptors.response.use(
  function (response) {
    return response.data;
  },

  function (error) {
    return Promise.reject(error);
  }
);

export default transportService;
