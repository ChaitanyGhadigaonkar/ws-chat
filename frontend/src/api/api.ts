import axios from "axios";
import { BACKEND_URL } from "../utils/constants";

const API_INSTANCE = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

export default API_INSTANCE;
