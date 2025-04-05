import axios from "axios";
import { toast } from "react-toastify";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data && error.response.data.message) {
      if (error.response.data.message === "Unauthenticated.") {
        toast.error("Token inválido");
        window.location.href = "/auth/login";
      }
      toast.error(error.response.data.message);
    } else {
      toast.error("Ocurrió un error inesperado");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
