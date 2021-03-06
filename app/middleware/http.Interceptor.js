import axios from 'axios';
import { Base } from '../constants';
import { getUserToken } from './storage'
axios.defaults.baseURL = Base.API_ROOT;

axios.interceptors.request.use(async (config) => {
  const auth = await getUserToken();
  if (auth) {
    config.headers.common['Authorization'] = `${auth}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 404) {
      return axios.request(error.response.config);
    } else {
      return Promise.reject(error);
    }
  },
);
