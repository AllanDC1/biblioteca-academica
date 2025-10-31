import axios from "axios";

const ip = "192.168.0.0"; // Substitua aqui pelo o IPv4 do seu dispositivo

export const BASE_URL = "http://" + ip + ":8080";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;