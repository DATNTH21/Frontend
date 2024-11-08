import axios, { InternalAxiosRequestConfig, AxiosError } from 'axios';

const customAxios = axios.create({
  baseURL: 'http://localhost:8080/api/v1/',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});

// Ensure credentials are sent with requests
customAxios.defaults.withCredentials = true;

// Request interceptor
customAxios.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    return config;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

export default customAxios;
