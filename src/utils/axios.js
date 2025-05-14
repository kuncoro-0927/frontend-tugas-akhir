import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_APIURL,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedRequestsQueue = [];

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({ resolve, reject });
        }).then(() => instance(originalRequest));
      }

      isRefreshing = true;

      try {
        await axios.post(
          `${import.meta.env.VITE_APIURL}/refresh-token`,
          {},
          { withCredentials: true }
        );

        failedRequestsQueue.forEach(({ resolve }) => resolve());
        failedRequestsQueue = [];

        return instance(originalRequest);
      } catch (refreshError) {
        failedRequestsQueue.forEach(({ reject }) => reject(refreshError));
        failedRequestsQueue = [];

        document.cookie =
          "user_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        document.cookie =
          "user_refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export { instance };
