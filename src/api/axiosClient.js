import axios from "axios";

const axiosClient = axios.create({
  // baseURL: "http://localhost:5000/api"
  baseURL: "https://raynott-e-tech-backend.onrender.com/api"
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("raynott_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosClient;
