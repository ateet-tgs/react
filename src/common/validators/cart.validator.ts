import * as yup from "yup";

export const shippingSchema = yup.object({
  method: yup.string().required("Shipping method is required"),
  tracking: yup.string().required("Tracking number is required"),
  address: yup.string().required("Shipping address is required"),
});

export type ShippingFormData = yup.InferType<typeof shippingSchema>;
