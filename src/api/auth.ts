import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { authApi } from "../common/utils/axios";
import {
  ApiResponse,
  ForgotPassword,
  LoginPayload,
} from "../common/interfaces";

export const useLogin = () => {
  return useMutation<AxiosResponse<ApiResponse>, Error, LoginPayload>({
    mutationFn: (data) => authApi.post<ApiResponse>("/auth/login", data),
  });
};

export const refreshTokenAPI = async (
  refreshToken: string
): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {
  const response: AxiosResponse<ApiResponse> = await authApi.post("/refresh", {
    refreshToken,
  });

  if (!response.data.status) {
    window.location.href = "/auth/login";
  }

  return response.data.data;
};

export const useGetProfileDetails = () => {
  return useMutation<AxiosResponse<ApiResponse>, Error, any>({
    mutationFn: () => authApi.get<ApiResponse>("/auth/me"),
  });
};
