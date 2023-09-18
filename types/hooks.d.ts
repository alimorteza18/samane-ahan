import { SingleDropdownItem } from "./input";
/**
 * UseHttp
 */

type OptionsType<p> = p & {
  page?: string | number;
  per_page?: string | number;
  /**
   * @default true
   */
  paginate?: boolean;
  initialState?: RawData<t>;
  mapper?: (row: t) => object;
  dropdownEmptyItems?: boolean;
  /**
   * @default normal
   */
  formType?: "normal" | "multipart";
  /**
   * @description default is set to data. if set to false, it takes whole response data from root
   */
  dataField?: "data" | false;
  [key: string]: any;
};

interface RawData<t> {
  current_page: number;
  data: t;
  first_page_url: string;
  from: string;
  last_page: string;
  last_page_url: string;
  links: {
    url: string;
    label: string;
    active: boolean;
  }[];
  next_page_url: string;
  path: string;
  per_page: string;
  prev_page_url: string;
  to: number;
  total: number;
  meta: {
    current_page: number;
    from: string;
    last_page: string;
    links: {
      url: string;
      label: string;
      active: boolean;
    }[];
    path: string;
    per_page: string;
    to: number;
    total: number;
  };
}

/**
 * (UseHttp End)
 */
