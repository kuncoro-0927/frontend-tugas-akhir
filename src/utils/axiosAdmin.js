import axios from "axios";
import { showSnackbar } from "../components/CustomSnackbar";

const instanceAdmin = axios.create({
  baseURL: import.meta.env.VITE_APIURL,
  timeout: 10000,
  withCredentials: true,
});

let isRefreshingAdmin = false; // Variabel khusus untuk admin
let failedAdminQueue = []; // Queue untuk admin

const processAdminQueue = (error) => {
  failedAdminQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve();
  });
  failedAdminQueue = [];
};

instanceAdmin.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    console.log("Intercepted error", err.response?.status, originalRequest.url); // Debug log
    if (err.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshingAdmin) {
        return new Promise((resolve, reject) => {
          failedAdminQueue.push({
            resolve: () => resolve(instanceAdmin(originalRequest)),
            reject,
          });
        });
      }

      isRefreshingAdmin = true;

      try {
        await axios.post(
          `${import.meta.env.VITE_APIURL}/admin-refresh-token`,
          {},
          { withCredentials: true }
        );
        processAdminQueue(null);
        return instanceAdmin(originalRequest);
      } catch (refreshError) {
        processAdminQueue(refreshError);
        showSnackbar(
          "Sesi login Anda (admin) berakhir, silakan login kembali.",
          "error"
        );
        return Promise.reject(refreshError);
      } finally {
        isRefreshingAdmin = false;
      }
    }

    return Promise.reject(err);
  }
);

export { instanceAdmin };
