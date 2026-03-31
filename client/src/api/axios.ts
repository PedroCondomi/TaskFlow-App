import axios from "axios";
import { getToken } from "../store/authStore";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080/api";
if (!API_BASE) {
  throw new Error("VITE_API_BASE is not defined");
}

const instance = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// Adjust token before each request
instance.interceptors.request.use(config => {
  // save store state, axios uses
  const token = getToken();
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
