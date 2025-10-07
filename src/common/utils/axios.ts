import axios from "axios";

// Factory function to create axios instances with common config & interceptors
const createAxiosInstance = (baseURL: string) => {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
  });

  // Request interceptor (adds token)
  instance.interceptors.request.use(
    (config) => {
      const path =
        typeof window !== "undefined" ? window.location.pathname : "/";
      let tokenKey = "accessToken";
      if (path.startsWith("/")) tokenKey = "accessToken";
      if (path.startsWith("/customer")) tokenKey = "customerAccessToken";

      const token = tokenKey ? localStorage.getItem(tokenKey) : null;
      console.log("Token Key:", tokenKey, "Token:", token);

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor (handles 401, etc.)
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/auth/login";
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

// Define all your service base URLs (can also use .env)
const AUTH_BASE_URL = process.env.REACT_APP_AUTH_API_URL!;
const ORDER_BASE_URL = process.env.REACT_APP_ORDER_API_URL!;
const PRODUCT_BASE_URL = process.env.REACT_APP_PRODUCT_API_URL!;

// Create instances for each service
export const authApi = createAxiosInstance(AUTH_BASE_URL);
export const orderApi = createAxiosInstance(ORDER_BASE_URL);
export const productApi = createAxiosInstance(PRODUCT_BASE_URL);
