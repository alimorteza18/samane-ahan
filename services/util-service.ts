import axios, { AxiosResponse } from "axios";
import http, { apiUrlV3 } from "./http-service";
import { BaseProps, RawData } from "@/types";

export const randomString = (len: number = 5) => {
  return Math.random()
    .toString(36)
    .substring(2, len + 2);
};

export const getItemsForDropdown = (
  items: any,
  value: string,
  ...labels: string[]
) =>
  !arrayIsEmpty(items) &&
  items.map((item: any) => {
    return {
      value: item[value],
      label: labels ? getLabel(labels, item) : value,
    };
  });

const getLabel = (labels: string[], item: any) => {
  let result = "";
  labels.map((label) => (result += (item[label] ?? label) + " "));

  return result;
};

const arrayIsEmpty = (array: any) => !Array.isArray(array) || !array.length;

export const getImageWidthAndHeight = (src: string) => {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const img = new Image();
  img.src = src;

  return {
    height: img.height,
    width: img.width,
  };
};

/**
 * @description convert keys like "details.size.id" to nested objects (split by dot)
 * @param obj
 * @returns
 */
export const convertErrors = (obj: any) => {
  const result: any = {};
  Object.entries(obj).forEach(([key, value]) => {
    const parts = key.split(".");
    let current = result;
    parts.forEach((part, index) => {
      if (index === parts.length - 1) {
        current[part] = value;
      } else {
        current[part] = current[part] || {};
        current = current[part];
      }
    });
  });
  return result;
};

export const removeMetaByName = (elements: any, metaName: string) => {
  return elements.filter((element: any) => {
    if (element.type === "meta" && element.props.name === metaName) {
      return false; // Remove the meta tag with the specified name
    }
    return true; // Keep other elements
  });
};

export interface FindSingleFieldProps {
  data: Array<any>;
  want: string;
  value: string | number | boolean | any;
  findBy: number | string;
}

export const findSingleField = ({
  data,
  want,
  value,
  findBy = "id",
}: FindSingleFieldProps) => {
  //@ts-ignore
  if (!data?.length) return null;

  //@ts-ignore
  let targetIndex = data?.findIndex((item) => item[findBy] === value);

  //@ts-ignore
  return data[targetIndex] && data[targetIndex][want]
    ? data[targetIndex][want]
    : null;
};

export const query = (params: FetchIndexPageParams) => {
  return http.get("query", {
    baseURL: apiUrlV3,
    params,
  });
};

type FetchOverViewServiceParams = BaseProps & {
  queryDesc?: string | string[];
};

type FetchOverViewService = (
  params: FetchOverViewServiceParams
) => Promise<AxiosResponse<RawData<Overview[]>>>;

export const fetchOverviews: FetchOverViewService = (params) => {
  return axios.get("overview", { params });
};

type IncludesType =
  | string[]
  | {
      name?: string;
      fields?: string[] | string;
    }[];

type FieldsAndFilter = {
  fields?: string[];
  includes?: IncludesType;
  [key: string]: any;
};

type FetchIndexPageParams = {
  product_types?: FieldsAndFilter;
  products?: FieldsAndFilter;
  user_vendors?: FieldsAndFilter;
  grouped_products?: FieldsAndFilter;
  product_filters?: FieldsAndFilter;
  crawled_products?: FieldsAndFilter;
  product_freight_places?: FieldsAndFilter;
  factories?: FieldsAndFilter;
  product_sizes?: FieldsAndFilter;
  product_lengths?: FieldsAndFilter;
  product_widths?: FieldsAndFilter;
  product_colors?: FieldsAndFilter;
  product_thicknesses?: FieldsAndFilter;
  product_standards?: FieldsAndFilter;
  product_modes?: FieldsAndFilter;
};
