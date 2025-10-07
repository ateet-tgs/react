import { TokenData } from "../interfaces";

export const setToken = (tokenData: TokenData, role: string) => {
  if (role === "admin") {
    localStorage.setItem("accessToken", tokenData.accessToken);
    localStorage.setItem("refreshToken", tokenData.refreshToken);
    return;
  }

  if (role === "customer") {
    localStorage.setItem("customerAccessToken", tokenData.accessToken);
    localStorage.setItem("customerRefreshToken", tokenData.refreshToken);
    return;
  }
};

export const getToken = (field: string) => {
  return localStorage.getItem(field);
};

export const removeTokens = (role: string) => {
  if (role === "admin") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return;
  }

  if (role === "customer") {
    localStorage.removeItem("customerAccessToken");
    localStorage.removeItem("customerRefreshToken");
    return;
  }
};
