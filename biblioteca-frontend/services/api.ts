import axios from "axios";

export const BASE_URL = "http://192.168.15.6:8080";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;