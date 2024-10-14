import axios from "axios";
import env from "./constants";

export const axiosInstance = axios.create({
  baseURL: env.apiBaseURL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    config.headers["Content-Type"] = "application/json";
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
