import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { ApiResponse, CartItem } from "../common/interfaces";
import { orderApi } from "../common/utils";
import { ShippingFormData } from "../common/validators/cart.validator";

export const useCreateOrder = () => {
  return useMutation<
    AxiosResponse<ApiResponse>,
    Error,
    { items: CartItem[]; shipping: ShippingFormData }
  >({
    mutationFn: (data) => orderApi.post<ApiResponse>("/create", data),
  });
};

export const useGetOrderDetail = (id: string) => {
  return useMutation<AxiosResponse<ApiResponse>, Error, any>({
    mutationFn: () => orderApi.get<ApiResponse>(`/get-order/${id}`),
  });
};
