import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_LOCAL_URL,
});

// export const tokenApi = axios.create({
//   baseURL: process.env.REACT_APP_LOCAL_URL,
// });

// tokenApi.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       const jsonToken = JSON.parse(token);
//       config.headers.Authorization = `Bearer ${jsonToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
