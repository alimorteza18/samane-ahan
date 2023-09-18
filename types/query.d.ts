import { AxiosPromise } from "axios";

type IncludesType =
  | string[]
  | {
      name?: string;
      fields?: string[] | string;
    };

type FieldsAndFilter = {
  fields?: string[];
  includes?: IncludesType;
  ids?: string | string[] | number | number[];
  [key: string]: any;
};

type QueryType = {
  product_types?: FieldsAndFilter;
  products?: FieldsAndFilter;
  user_vendors?: FieldsAndFilter;
  grouped_products?: FieldsAndFilter;
  product_filters?: FieldsAndFilter;
  shop_package_groups?: FieldsAndFilter;
};
