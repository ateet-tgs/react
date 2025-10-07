import { TokenData } from "../interfaces";

export const setToken = (tokenData: TokenData, role: string) => {
  // if (role === "admin") {
  //   localStorage.setItem("accessToken", tokenData.accessToken);
  //   localStorage.setItem("refreshToken", tokenData.refreshToken);
  //   return;
  // }

  // if (role === "user") {
  //   localStorage.setItem("customerAccessToken", tokenData.accessToken);
  //   localStorage.setItem("customerRefreshToken", tokenData.refreshToken);
  //   return;
  // }

  localStorage.setItem("accessToken", tokenData.accessToken);
  localStorage.setItem("refreshToken", tokenData.refreshToken);
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

  if (role === "user") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return;
  }
  localStorage.removeItem("managerAccessToken");
  localStorage.removeItem("managerRefreshToken");
};
