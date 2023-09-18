import http from "./http-service";

export const fetchProductFactories = (params: any) =>
  http.get("product/factory", { params });

export const fetchProductClasses = (params: any) =>
  http.get("product/class", { params });

export const fetchProductColors = (params: any) =>
  http.get("product/color", { params });

export const fetchProductDimensions = (params: any) =>
  http.get("product/dimension", { params });

export const fetchProductWidths = (params: any) =>
  http.get("product/width", { params });

export const fetchProductSizes = (params: any) =>
  http.get("product/size", { params });

export const fetchProductLenghts = (params: any) =>
  http.get("product/length", { params });

export const fetchProductModes = (params: any) =>
  http.get("product/mode", { params });

export const fetchProductStandards = (params: any) =>
  http.get("product/standard", { params });

export const fetchProductThicknesses = (params: any) =>
  http.get("product/thickness", { params });

export const fetchProductWeightScales = (params: any) =>
  http.get("product/weight_scale", { params });

export const fetchProductFreightPlaces = (params: any) =>
  http.get("product/freight_place", { params });

export const fetchProductCategories = (params: any) =>
  http.get("product/category", { params });

export default {
  fetchProductFactories,
  fetchProductClasses,
  fetchProductColors,
  fetchProductDimensions,
  fetchProductWidths,
  fetchProductSizes,
  fetchProductLenghts,
  fetchProductModes,
  fetchProductStandards,
  fetchProductThicknesses,
  fetchProductWeightScales,
  fetchProductFreightPlaces,
  fetchProductCategories,
};
