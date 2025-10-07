import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { ApiResponse } from "../common/interfaces";
import { adminApi } from "../common/utils";

export const useGetItemsList = () => {
  return useMutation<AxiosResponse<ApiResponse>, Error, any>({
    mutationFn: () => adminApi.get<ApiResponse>("/items"),
  });
};
