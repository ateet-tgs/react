import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import axiosInstance from "../common/utils/axios";
import {
  ApiResponse,
  ForgotPassword,
  LoginPayload,
} from "../common/interfaces";

export const useLogin = () => {
  return useMutation<AxiosResponse<ApiResponse>, Error, LoginPayload>({
    mutationFn: (data) => axiosInstance.post<ApiResponse>("/auth/login", data),
  });
};

export const refreshTokenAPI = async (
  refreshToken: string
): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {
  const response: AxiosResponse<ApiResponse> = await axiosInstance.post(
    "/refresh",
    { refreshToken }
  );

  if (!response.data.status) {
    const isManager = window.location.pathname.includes("/manager");
    window.location.href = isManager ? "/manager/auth/login" : "/auth/login";
  }

  return response.data.data;
};

export const useGetProfileDetails = () => {
  return useMutation<AxiosResponse<ApiResponse>, Error, any>({
    mutationFn: () => axiosInstance.get<ApiResponse>("/auth/me"),
  });
};
