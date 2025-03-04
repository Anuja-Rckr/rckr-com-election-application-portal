import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_LOCAL_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
