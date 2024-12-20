import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_LOCAL_URL || "http://127.0.0.1:8000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const authApi = axios.create({
  baseURL: process.env.REACT_APP_LOCAL_URL || "http://127.0.0.1:8000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

authApi.interceptors.request.use(
  (config) => {
    const jwtToken = sessionStorage.getItem("authToken");

    if (jwtToken) {
      const parsed_jwt_token = JSON.parse(jwtToken);
      config.headers.Authorization = `Bearer ${parsed_jwt_token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
