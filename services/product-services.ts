import http, { apiUrlV2 } from "@/services/http-service";
import { RawData } from "@/types";
import {
  CreateUserProductService,
  FetchProductSearchFilters,
  FetchProductsProps,
  FetchUserProductsService,
  FetchVendorProductsProps,
} from "@/types/services";
import { AxiosResponse } from "axios";

export const fetchProducts = (
  params?: FetchProductsProps
): Promise<AxiosResponse<RawData<Product[]>>> =>
  http.get("product", { params });

export const fetchVendorProducts = ({
  vendor_id,
  ...params
}: FetchVendorProductsProps): Promise<AxiosResponse<RawData<Product[]>>> => {
  return http.get(`product/${vendor_id}`, { baseURL: apiUrlV2, params });
};

export const fetchGroupedProducts = (
  params?: FetchProductsProps
): Promise<AxiosResponse<RawData<GroupedProduct[]>>> =>
  http.get("product/grouped", { params });

export const fetchProductSearchFilters = (
  params?: FetchProductSearchFilters
): Promise<AxiosResponse<RawData<SearchFilters>>> =>
  http.get("product/search_filters", { params });

export const fetchUserProducts: FetchUserProductsService = (params) =>
  http.get(`product/own`, { params });

export const toggleUserProductVisibility = ({
  id,
}: {
  id: any;
}): Promise<AxiosResponse<RawData<Product>>> =>
  http.put(`my/product/${id}/enable`, {}, { baseURL: apiUrlV2 });

export const deleteUserProduct = ({ id }: { id: any }) =>
  http.delete(`my/products/${id}`, { baseURL: apiUrlV2 });

export const editUserProduct = ({ id, ...data }: { id: any }) =>
  http.put(`my/products/${id}`, data, { baseURL: apiUrlV2 });

export const createUserProduct: CreateUserProductService = (data) =>
  http.post("product", data);
