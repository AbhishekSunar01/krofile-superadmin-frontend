import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import useAuthStore from "../../store/authStore";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the access token
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = Cookies.get("access_token"); // Retrieve from cookies
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for refreshing tokens
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = Cookies.get("refresh_token"); // Retrieve from cookies
      if (refreshToken) {
        try {
          const response = await axios.post(`${baseUrl}/auth/refresh`, {
            refresh_token: refreshToken,
          });
          const {
            access_token: newAccessToken,
            refresh_token: newRefreshToken,
          } = response.data.token;

          // Update cookies with new tokens
          Cookies.set("access_token", newAccessToken, {
            secure: true,
            sameSite: "Strict",
          });
          Cookies.set("refresh_token", newRefreshToken, {
            secure: true,
            sameSite: "Strict",
          });

          // Update the access_token in Zustand store
          useAuthStore.getState().setTokens(newAccessToken, newRefreshToken);

          // Retry the original request with the new access token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // Handle token refresh failure (logout user, redirect to login, etc.)
          useAuthStore.getState().logout();
          toast.error("Your session has expired. Please log in again.");
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
