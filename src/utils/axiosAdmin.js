import axios from "axios";

const instanceAdmin = axios.create({
  baseURL: import.meta.env.VITE_APIURL,
  withCredentials: true,
});

instanceAdmin.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedRequestsQueue = [];

instanceAdmin.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({ resolve, reject });
        }).then(() => instanceAdmin(originalRequest));
      }

      isRefreshing = true;

      try {
        await axios.post(
          `${import.meta.env.VITE_APIURL}/admin-refresh-token`,
          {},
          { withCredentials: true }
        );

        failedRequestsQueue.forEach(({ resolve }) => resolve());
        failedRequestsQueue = [];

        return instanceAdmin(originalRequest);
      } catch (refreshError) {
        failedRequestsQueue.forEach(({ reject }) => reject(refreshError));
        failedRequestsQueue = [];

        document.cookie =
          "admin_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        document.cookie =
          "admin_refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";

        alert("Session expired. Please login again.");

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export { instanceAdmin };
