interface Province {
  id: number;
  name: string;
  location: MapLocation;
}

interface City {
  id: number;
  name: string;
  province_id: number;
  province: Province;
}

interface ProductType {
  id: number;
  type: string;
  vendor_category: string;
  next_step: string;
  allow_multiple: string;
  statistics_with: string;
  slug: string;
  img: string;
  meta_title: string;
  meta_description: string;
  meta_keyword: string;
  image_alt: string;
  deleted_at: string;
  pivot: string;
}

interface ProductKind {
  id: number;
  kind: string;
  type_id: number;
  image: string;
}

interface Gallery {
  id: number;
  owner_type: string;
  owner_id: number;
  file_type: string;
  file_path: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  category: string;
  fa_category: string;
  Introduction: boolean;
}

interface GalleryIntroduction {
  id: number;
  file_type: string;
  file_path: string;
}

interface User {
  id: number;
  referral_id: string;
  old_id: string;
  username: string;
  mobile: string;
  credit: string;
  signal_id: string;
  province_id: number;
  city_id: number;
  name: string;
  father_name: string;
  national_code: string;
  identity_card_number: string;
  birthday: string;
  company_name: string;
  economic_code: string;
  organization_registration_number: string;
  address: string;
  send_type: string;
  email: string;
  fax: string;
  last_use: string;
  referral_code: string;
  user_status: string;
  deactivated_until: string;
  created_at: string;
  updated_at: string;
  type: string;
  img: string;
  profile_img: string;
}

interface Admin {
  id: number;
  is_super_admin: boolean;
  mobile: string;
  name: string;
  role: string;
  username: string;
}

interface MapLocation {
  lat: number;
  lng: number;
}

interface UserVendor {
  id: number;
  user_id: number;
  slug: string;
  name: string;
  modir_name: string;
  phone: string;
  signal_id: string;
  location: MapLocation;
  address_location: MapLocation;
  description: string;
  address: string;
  rate: string;
  vendor_profile_img: string;
  union_number: string;
  business_license: string;
  vendor_status: string;
  verified: string;
  deactivated_until: string;
  province_id: string;
  city_id: string;
  category: string;
  vendor_img: string;
  license_img: string;
  suspended: string;
  suspended_date: string;
  last_use: string;
  activity: string;
  auto_intro: string;
  is_free: string;
  last_need_sms_at: string;
  admin_id: number;
  admin_desc: string;
  admin_wage: string;
  commentable: string;
  location: string;
  email: string;
  short_url: string;
  mobile: string;
  website_url: string;
  ig_url: string;
  tg_url: string;
  whatsapp_url: string;
  crawler_settings: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  province: Province;
  city: City;
  user: User;
  permissions: ProductType[];
  single_gallery: Gallery;
}

interface Details {
  type: string;
  kind: string;
  factory: string;
  thickness: string;
  length: string;
  standard: string;
  width: string;
  color: string;
  mode: string;
  size: string;
  freight_place: string;
  dimension: string;
  weight_scale: string;
  height: string;
}

interface ProductDetails {
  id: number;
  product_id: number;
  detail_field:
    | "type"
    | "kind"
    | "factory"
    | "thickness"
    | "length"
    | "standard"
    | "width"
    | "color"
    | "mode"
    | "size"
    | "freight_place"
    | "dimension"
    | "weight_scale"
    | "height";
  detail_id: number;
  detail_value: string;
}

interface Product {
  id: number;
  full_title: string;
  type_kind_size: string;
  old_id: number;
  type_id: number;
  category_id: number;
  kind_id: number;
  factory_id: number;
  vendor_id: number;
  vendor_price: number;
  factory_price: number;
  vendor_cooperation_price: number;
  factory_cooperation_price: number;
  vendor_hour: number | string;
  vendor_min: number | string;
  price: number;
  weight: number;
  weight_type: "ton" | "branch";
  weight_type_fa: "تن" | "شاخه";
  product_img: string;
  price_confirmed_at: string;
  gregorian_price_confirmed_at: string;
  jalali_price_confirmed_at: string;
  enabled: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  deleter_type: string;
  admin_id: number;
  deleter_id: number;
  start_time_price: number;
  end_time_price: number;
  is_today_price: boolean;
  userVendor: UserVendor;
  details: Details;
  productDetails: ProductDetails[];
  factory: any;
  productKind: ProductKind;
  category: any;
  productType: ProductType;
}

interface GroupedProduct {
  group_by: string;
  group_by_value: string;
  date: string;
  date_fa: string;
  is_today_price: string;
  items: Product[];
  grouped_by_factory?: {
    group_by: "factory";
    group_by_value: string;
    items: Product[];
  }[];
}

interface SingleFilter {
  name: string;
  label: string;
  filters: {
    id: string | number;
    slug: string | null;
    label: string;
    checked: boolean;
    image: string;
  }[];
}

interface SearchFilters {
  kind: SingleFilter;
  freight_place: SingleFilter;
  factory: SingleFilter;
  size: SingleFilter;
  standard: SingleFilter;
  weight_scale: SingleFilter;
  [key: string]: SingleFilter;
}

interface UserVendor {
  id: number;
  vendor_profile_img: string;
  name: string;
  phone: string;
  modir_name: string;
  province_name: string;
  category: string;
}

interface VendorStatistics {
  all_hits: number;
  today_hits: number;
  all_getnumber: number;
  all_submited_products: number;
}

interface AuthUserProfile {
  user?: User;
  vendor?: UserVendor | null;
}

interface AuthAdminProfile {
  admin?: Admin;
  permissions?: Array<
    "crawled_products" | "admins" | "product_details" | "calls"
  >;
}

interface ShopPackageGroup {
  id: number;
  title: string;
  desc?: string;
  packages?: ShopPackage[];
}

interface ShopPackageOption {
  id: number;
  /**
   * ex: month
   */
  title: string;
  /**
   * ex: ماه - ماهه
   */
  label: string;
  /**
   * ex: 3
   */
  value: string;
  shop_package_id: number;
}

interface ShopPackage {
  id: number;
  title: string;
  desc?: string;
  /**
   * in Rial
   */
  price: number;
  old_price?: number;
  group_id: number;
  options?: ShopPackageOption[];
}

interface Transaction {
  id: number;
  user_id: number | null;
  tracking_code: string;
  amount: number;
  name: string;
  phone: string;
  vendor_name: string;
  packages: number[];
  /**
   * @example zarinpal
   */
  payment_method: string;
  /**
   * @example normal
   */
  payment_mode: string;
  details: {
    amount: number;
    fee: number;
    net_amount: number;
    discount_code: number;
    discounted_amount: number;
    discounted_value: number;
  };
  verification: {
    data: [];
    errors: {
      /**
       * @example -51
       */
      code: number;
      message: string;
      validation: [];
    };
  };
  status: "pending" | "done" | "canceled" | "failed";
  delivery_status: "pending" | "done" | "canceled" | "failed";
  created_at: string;
  updated_at: string;
}

interface VerifyPayment {
  message: string;
  success: boolean;
  refrence_id: string;
  transaction: Transaction;
}

interface DiscountCode {
  id: number;
  code: string;
  operation_type: "percentage" | "amount";
  operation_value: number;
  expires_at: string;
  used_at: string;
}

interface CheckDiscount {
  success: boolean;
  message: string;
  result?: DiscountCode;
}

interface Vendor {
  name: string;
  modir_name: string;
  address: string;
  province_id: number;
  city_id: number;
  mobile: string;
  phone: string;
  email: string;
}

interface Overview {
  id: number;
  query_identifier: string;
  table_name: string;
  query_desc: string;
  query_object: any;
  query_result: any;
  created_at: string;
  updated_at: string;
}

interface BlogPost {
  id: number;
  author: number;
  categories: number[];
  comment_status: string | "open";
  title: {
    /**
     * @description HTML markup
     */
    rendered: string;
  };
  content: {
    protected: boolean;
    /**
     * @description HTML markup
     */
    rendered: string;
  };
  excerpt: {
    protected: boolean;
    /**
     * @description HTML markup
     */
    rendered: string;
  };
  date: string;
  date_gmt: string;
  featured_media: number;
  format: string | "standard";
  guid: {
    /**
     * @description HTML markup
     */
    rendered: string;
  };
  link: string;
  meta: any[];
  modified: string;
  modified_gmt: string;
  ping_status: string | "open";
  slug: string;
  status: string | "publish";
  sticky: false;
  tags: any[];
  template: string;
  type: string | "post";
  _embedded?: {
    author: Array<{
      id: number;
      name: string;
      url: string;
      description: string;
      link: string;
      slug: string;
      _links: {
        self: Array<{ href: string }>;
        collection: Array<{ href: string }>;
      };
    }>;
    "wp:featuredmedia": Array<{
      id: number;
      date: string;
      slug: string;
      type: string | "attachment";
      link: string;
      title: { rendered: string };
      author: number;
      caption: { rendered: string };
      alt_text: string;
      media_type: string | "image";
      mime_type: string | "image/jpeg";
      media_details: {
        width: number;
        height: number;
        file: string;
        filesize: number;
        /**
         * @example large | normal
         */
        sizes: {
          [key: string]: {
            file: string;
            width: number;
            height: number;
            filesize: number;
            mime_type: string | "image/jpeg";
            source_url: string;
          };
        };
        image_meta: {
          aperture: string;
          credit: string;
          camera: string;
          caption: string;
          created_timestamp: string;
          copyright: string;
          focal_length: string;
          iso: string;
          shutter_speed: string;
          title: string;
          orientation: string;
          keywords: [];
        };
      };
      source_url: string;
      _links: {
        self: Array<{ href: string }>;
        collection: Array<{ href: string }>;
        about: Array<{ href: string }>;
        author: Array<{ embeddable: boolean; href: string }>;
        replies: Array<{ embeddable: boolean; href: string }>;
      };
    }>;
    "wp:term": Array<
      Array<{
        id: number;
        link: string;
        name: string;
        slug: string;
        taxonomy: string;
        _links: {
          self: Array<{ href: string }>;
          collection: Array<{ href: string }>;
          about: Array<{ href: string }>;
          "wp:post_type": Array<{ href: string }>;
          curies: Array<{
            name: string;
            href: string;
            templated: boolean;
          }>;
        };
      }>
    >;
  };
  _links: {
    self: Array<{ href: string }>;
    collection: Array<{ href: string }>;
    about: Array<{ href: string }>;
    author: Array<{ embeddable: boolean; href: string }>;
    replies: Array<{ embeddable: boolean; href: string }>;
    "version-history": Array<{ count: number; href: string }>;
    "predecessor-version": Array<{ id: number; href: string }>;
    "wp:featuredmedia": Array<{ embeddable: boolean; href: string }>;
    "wp:attachment": Array<{ href: string }>;
    "wp:term": Array<{ taxonomy: string; embeddable: boolean; href: string }>;
    curies: Array<{ name: string; templated: boolean; href: string }>;
  };
}

interface BlogCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  meta: Array<any>;
  name: string;
  parent: number;
  slug: string;
  taxonomy: string;
  _links: {
    about: Array<{ href: string }>;
    collection: Array<{ href: string }>;
    curies: Array<{ name: string; templated: boolean; href: string }>;
    self: Array<{ href: string }>;
    "wp:post_type": Array<{ href: string }>;
  };
}

interface RankMathSEO {
  success: boolean;
  /**
   * html tags of head
   */
  head: string;
}
