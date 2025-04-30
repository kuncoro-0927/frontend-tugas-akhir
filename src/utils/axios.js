import axios from "axios";
import { showSnackbar } from "../components/CustomSnackbar";

const instance = axios.create({
  baseURL: import.meta.env.VITE_APIURL,
  timeout: 10000,
  withCredentials: true,
});

let isRefreshingUser = false; // Variabel khusus untuk user
let failedUserQueue = []; // Queue untuk user

const processUserQueue = (error) => {
  failedUserQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve();
  });
  failedUserQueue = [];
};

instance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshingUser) {
        return new Promise((resolve, reject) => {
          failedUserQueue.push({
            resolve: () => resolve(instance(originalRequest)),
            reject,
          });
        });
      }

      isRefreshingUser = true;

      try {
        await axios.post(
          `${import.meta.env.VITE_APIURL}/refresh-token`,
          {},
          { withCredentials: true }
        );
        processUserQueue(null);
        return instance(originalRequest);
      } catch (refreshError) {
        processUserQueue(refreshError);
        showSnackbar(
          "Sesi login Anda (user) berakhir, silakan login kembali.",
          "error"
        );
        return Promise.reject(refreshError);
      } finally {
        isRefreshingUser = false;
      }
    }

    return Promise.reject(err);
  }
);

export { instance };
