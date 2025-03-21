import axios from "axios";

const API_INSTANCE = axios.create({
  baseURL: import.meta.env.VITE_API_BACKEND_URL,
  withCredentials: true,
});

export default API_INSTANCE;
