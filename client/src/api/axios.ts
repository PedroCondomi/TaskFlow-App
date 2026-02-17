import axios from "axios";
import { getToken } from "../store/authStore";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080/api";

const instance = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// Adjuntar token dinamicamente antes de cada request
instance.interceptors.request.use(config => {
  // store guarda el estado, axios lo consume
  const token = getToken();
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
