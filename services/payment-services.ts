import http from "@/services/http-service";
import { RawData } from "@/types";
import {
  ApplyDiscountCode,
  FetchShopPackagesProps,
  RequestPaymentService,
  VerifyPaymentService,
} from "@/types/services";
import { AxiosResponse } from "axios";

export const fetchShopPackages = (
  params?: FetchShopPackagesProps
): Promise<AxiosResponse<RawData<ShopPackage[]>>> =>
  http.get("shop/packages", { params });

export const requestPayment: RequestPaymentService = (data) => {
  return http.post(`payment/request`, data);
};

export const verifyPayment: VerifyPaymentService = (data) => {
  return http.put(`pay/verify`, data);
};

export const applyDiscountCode: ApplyDiscountCode = (data) => {
  return http.put("pay/checkDiscount", data);
};
