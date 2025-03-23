import axios from "axios";
import { BACKEND_URL } from "../utils/constants";

const API_INSTANCE = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

// API_INSTANCE.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error: AxiosError) => {
//     if (error.status === 403) {
//     }
//     return Promise.reject(error);
//   }
// );

export default API_INSTANCE;
