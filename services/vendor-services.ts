import { RawData } from "@/types";
import type { FetchCities, FetchProvinces, FetchVendorGalleryReturn, FetchVendorIntroductionProps, FetchVendorProps, FetchVendorsService } from "@/types/services"; //prettier-ignore
import { AxiosResponse } from "axios";
import http, { apiUrlV2, apiUrlV3 } from "./http-service";

export const fetchTopVendors = ({
  per_page = 10,
  ...params
}): Promise<AxiosResponse<RawData<UserVendor[]>>> => {
  return http.get(`top-vendors/${per_page}`, { baseURL: apiUrlV2, params });
};

export const fetchVendors: FetchVendorsService = (params) => {
  return http.get(`vendor`, { params })
};

export const createVendor: CreateVendorService = (data) => {
  return http.post(`vendor`, data);
};

export const fetchVendor = ({
  id,
}: FetchVendorProps): Promise<AxiosResponse<RawData<UserVendor>>> => {
  return http.get(`vendor/${id}`, { baseURL: apiUrlV3 });
};

export const fetchVendorProfile = ({
  id,
}: FetchVendorProps): Promise<AxiosResponse<UserVendor>> => {
  return http.get(`vendor-profile/${id}`, { baseURL: apiUrlV2 });
};
export const editVendorProfile = (
  data: any
): Promise<AxiosResponse<UserVendor>> => {
  return http.put("profile/vendor", data);
};

export const fetchVendorGallery = ({
  id,
  ...params
}: FetchVendorProps): Promise<AxiosResponse<FetchVendorGalleryReturn>> => {
  return http.get(`vendor/${id}/gallery`, { baseURL: apiUrlV2, params });
};

export const fetchVendorIntroductions = (
  params: FetchVendorIntroductionProps
): Promise<AxiosResponse<RawData<GalleryIntroduction[]>>> => {
  return http.get(`vendor/introduction`, {
    baseURL: apiUrlV2,
    params,
  });
};

export const fetchVendorStatistics = ({
  vendor_id,
}: FetchVendorIntroductionProps): Promise<AxiosResponse<VendorStatistics>> => {
  return http.get(`vendor-statistics/${vendor_id}`, { baseURL: apiUrlV2 });
};

export const fetchProvinces: FetchProvinces = (params) => {
  return http.get("province", { params });
};

export const fetchCities: FetchCities = (params) => {
  return http.get("city", { params });
};

export const makePhoneCallToVendor = ({ vendor_id, caller, ...data }: any) => {
  return http.post(`vendor/${vendor_id}/call`, { caller, ...data });
};

/**
 *
 * @param params vendor_id, caller, ...etc
 * @returns
 */
export const makeConferencePhoneCallToVendor = ({
  vendor_id,
  ...data
}: any) => {
  return http.post(`vendor/${vendor_id}/call/conference`, data);
};

export const createComment = (data: any) =>
  http.post("/comment", data, { baseURL: apiUrlV2 });

interface CreateVendorProps {
  phone: number | string;
  name: string;
  modir_name: string;
  province_id: number | string;
  product_types_ids?: number[];
  just_validate?: boolean;
}

type CreateVendorService = (
  props?: CreateVendorProps
) => Promise<AxiosResponse<RawData<UserVendor>>>;
