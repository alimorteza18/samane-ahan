import { AxiosResponse } from "axios";

interface BaseProps {
  page?: number;
  per_page?: number;
  notIds?: number | string | number[] | string[];
  fields?: string[];
  includes?: { name: string; fields?: string[] }[];
  createdAt?: string;
  updatedAt?: string;
  order?: string;
}

interface FetchVendorProductsProps extends BaseProps {
  vendor_id?: number | string;
  type_id?: number | string;
}

interface FetchProductsProps extends BaseProps {
  vendor_id?: number | string;
  type_id?: number | string;
  kind_id?: number | string | null;
  category_id?: number | string;
  factory_id?: number | string;
  color_id?: number | string;
  standard_id?: number | string;
  freight_place_id?: number | string;
  length_id?: number | string;
  size_id?: number | string;
  class_id?: number | string;
  mode_id?: number | string;
  width_id?: number | string;
  dimension_x?: number | string;
  dimension_y?: number | string;
  dimensionXValue?: number | string;
  dimensionYValue?: number | string;
  thickness_id?: number | string;
  weight_scale_id?: number | string;
  factoryValue?: string;
  colorValue?: string;
  lengthValue?: string;
  sizeValue?: string | string[] | number | number[];
  uniqueVendors?: boolean;
  thicknessValue?: string;
  weightScaleValue?: string;
  freightPlaceValue?: string;
  dimensionValue?: string;
  minPrice?: number;
  widthValue?: string;
  start_date?: string;
  end_date?: string;
  priceConfirmedAt?: string;
  /**
   * created_at
   */
  order?: string;
}

interface FetchProductSearchFilters {
  type_id?: number | string;
  kind_id?: number | string | null;
}

interface FetchVendorProps {
  id: number | string;
}

interface FetchVendorGalleryReturn {
  data: Gallery[];
  categories: {
    products: "محصولات و انبار";
    office: "دفتر بنگاه";
    videos: "ویدئوها";
    catalog: "کاتالوگ";
  };
}

interface FetchVendorIntroductionProps {
  vendor_id: number | string;
}

interface GetLoginOTPProps {
  /**
   * ex: 09123456789
   */
  mobile: string | number;
}

interface getLoginOTPReturn {
  data: {
    message: string;
    is_vendor: boolean;
    new_user: boolean;
  };
}

interface LoginProps {
  grant_type: "sms" | "password";
  /**
   * ex: 09123456789
   */
  mobile: string | number;
  login_code?: string | number;
}

interface LoginReturn {
  /**
   * Bearer
   */
  token_type: "string";
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

interface FetchUserProfileProps {
  access_token?: string | null;
}

interface FetchShopPackagesProps extends BaseProps {
  group_id?: number;
}

interface VerifyPaymentProps {
  transaction_id: string | any;
}

interface RequestPaymentProps {
  name: string;
  vendor_name?: string;
  detail: any;
  user_id?: string;
  phone: string | any;
  packages: number[];
  discount_code?: string;
  /**
   * window.location.origin/pay/invoice?redirect=/price
   */
  callback_url: string;
}

type VerifyPaymentService = (
  props: VerifyPaymentProps
) => Promise<AxiosResponse<RawData<VerifyPayment>>>;

type RequestPaymentService = (
  props: RequestPaymentProps
) => Promise<AxiosResponse<>>;

type FetchProvinces = (
  props: any
) => Promise<AxiosResponse<RawData<Province[]>>>;

interface FetchCitiesProps {
  province_id?: number;
}

type FetchCities = (
  props: FetchCitiesProps
) => Promise<AxiosResponse<RawData<City[]>>>;

type ApplyDiscountCodeProps = {
  discount_code: string | number;
};

type ApplyDiscountCode = (
  props: ApplyDiscountCodeProps
) => Promise<AxiosResponse<RawData<CheckDiscount>>>;

type fetchProductTypesProps = {};
type fetchProductKindsProps = {};

interface FetchVendorsProps extends BaseProps {
  similar?: number | string;
  /**
   * @example rate
   */
  order?: string;
  category: "vendor" | "factory" | "consumer";
}

type FetchVendorsService = (
  props?: FetchVendorsProps
) => Promise<AxiosResponse<RawData<UserVendor[]>>>;

type FetchUserProductsService = (
  props?: FetchProductsProps
) => Promise<AxiosResponse<RawData<Product[]>>>;

type CreateUserProductDetailProp = { id: number; value: string };

type CreateUserProductProps = {
  type_id: number;
  kind_id: number;
  factory_id: number;
  weight_type?: "branch" | "ton";
  weight?: string | number;
  vendor_price?: string | number;
  details: {
    freight_place?: CreateUserProductDetailProp;
    size?: CreateUserProductDetailProp;
    color?: CreateUserProductDetailProp;
    thickness?: CreateUserProductDetailProp;
    mode?: CreateUserProductDetailProp;
    width?: CreateUserProductDetailProp;
    length?: CreateUserProductDetailProp;
    standard?: CreateUserProductDetailProp;
    category?: CreateUserProductDetailProp;
    dimension?: {
      x: CreateUserProductDetailProp;
      y: CreateUserProductDetailProp;
    };
  };
};

type CreateUserProductService = (
  props?: CreateUserProductProps
) => Promise<AxiosResponse>;

type TypeMainFilters = "sizeValue" | "thicknessValue" | "dimensionValue";

type GetTypeMainFilterService = (
  typeId?: number | string | null
) => TypeMainFilters;
