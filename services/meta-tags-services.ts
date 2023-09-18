import { PRODUCT_KIND } from "@/services/product-kind-services";
import { PRODUCT_TYPE } from "@/services/product-type-services";

type DefaultTagsType = {
  title: string | undefined;
  description: string | undefined;
};

const defaultTags: DefaultTagsType = {
  title: "سامانه آهن | مرجع مقایسه قیمت انواع آهن آلات در بازار امروز",
  description: 'سامانه آهن قیمت روز انواع آهن آلات بازار از کارخانه‌ها و آهن فروشی‌‌های مختلف ایران', // prettier-ignore
};

const pricePageTags = ({ size = "", factory = "" }: any) => {
  size = size ?? "";
  factory = factory ?? "";

  return {
    [PRODUCT_TYPE.REBAR]: {
      title: `قیمت امروز میلگرد${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} از آهن فروشی‌های مختلف در بازار`, // prettier-ignore
      description: `قیمت امروز میلگرد (کارخانه)(سایز) آهن فروشی‌ها در بازار امروز. جهت مشاهده قیمت و خرید بدون واسطه انواع میلگرد ${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} وارد سایت شوید.`, // prettier-ignore
      kinds: {
        [PRODUCT_KIND.REBAR_RIBBED]: {
          title: `قیمت امروز میلگرد${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} از آهن فروشی‌های مختلف در بازار`, // prettier-ignore
          description: `قیمت امروز میلگرد (کارخانه)(سایز) آهن فروشی‌ها در بازار امروز. جهت مشاهده قیمت و خرید بدون واسطه انواع میلگرد آجدار${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} وارد سایت شوید.`, // prettier-ignore
        },
        [PRODUCT_KIND.REBAR_SIMPLE]: {
          title: `قیمت امروز میلگرد ساده${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} از آهن فروشی‌های مختلف در بازار`, // prettier-ignore
          description: `قیمت امروز میلگرد ساده${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} آهن فروشی‌ها در بازار امروز. جهت مشاهده قیمت و خرید بدون واسطه انواع میلگرد ساده${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} وارد سایت شوید.`, // prettier-ignore
        },
      },
    },
    [PRODUCT_TYPE.GIRDER]: {
      kinds: {
        title: `قیمت امروز تیرآهن${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} از آهن فروشی‌های مختلف در بازار`, // prettier-ignore
        description: `قیمت امروز تیرآهن${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} آهن فروشی‌ها در بازار امروز. جهت مشاهده قیمت و خرید بدون واسطه انواع تیرآهن${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} وارد سایت شوید.`, // prettier-ignore
        [PRODUCT_KIND.GIRDER_COMMON]: {
          title: `قیمت امروز تیرآهن${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} از آهن فروشی‌های مختلف در بازار`, // prettier-ignore
          description: `قیمت امروز تیرآهن${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} آهن فروشی‌ها در بازار امروز. جهت مشاهده قیمت و خرید بدون واسطه انواع تیرآهن${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} وارد سایت شوید.`, // prettier-ignore
        },
        [PRODUCT_KIND.GIRDER_HASH]: {
          title: `قیمت امروز هاش${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} از آهن فروشی‌های مختلف در بازار`, // prettier-ignore
          description: `قیمت امروز هاش${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} آهن فروشی‌ها در بازار امروز. جهت مشاهده قیمت و خرید بدون واسطه انواع تیرآهن هاش${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} وارد سایت شوید.`, // prettier-ignore
        },
      },
    },
    [PRODUCT_TYPE.SHEET]: {
      title:  `قیمت امروز ورق ${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} میل از آهن فروشی‌های مختلف در بازار`, // prettier-ignore
      description: `قیمت امروز ورق ${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} میل آهن فروشی‌ها در بازار امروز. جهت مشاهده قیمت و خرید بدون واسطه انواع ورق ${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} وارد سایت شوید.`, // prettier-ignore
      kinds: {
        [PRODUCT_KIND.SHEET_BLACK]: {
          title:  `قیمت امروز ورق سیاه${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} میل از آهن فروشی‌های مختلف در بازار`, // prettier-ignore
          description: `قیمت امروز ورق سیاه${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} میل آهن فروشی‌ها در بازار امروز. جهت مشاهده قیمت و خرید بدون واسطه انواع ورق سیاه${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} وارد سایت شوید.`, // prettier-ignore
        },
        [PRODUCT_KIND.SHEET_OILY]: {
          title: `قیمت امروز ورق روغنی${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} میل از آهن فروشی‌های مختلف در بازار`, // prettier-ignore
          description: `قیمت امروز ورق روغنی${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} میل آهن فروشی‌ها در بازار امروز. جهت مشاهده قیمت و خرید بدون واسطه انواع ورق روغنی${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} وارد سایت شوید.`, // prettier-ignore
        },
        [PRODUCT_KIND.SHEET_COLORED]: {
          title: `قیمت امروز ورق رنگی${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} میل از آهن فروشی‌های مختلف در بازار`, // prettier-ignore
          description: `قیمت امروز ورق رنگی${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} میل آهن فروشی‌ها در بازار امروز. جهت مشاهده قیمت و خرید بدون واسطه انواع ورق رنگی${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} وارد سایت شوید.`, // prettier-ignore
        },
        [PRODUCT_KIND.SHEET_GALVANIZED]: {
          title: `قیمت امروز ورق گالوانیزه${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} میل از آهن فروشی‌های مختلف در بازار`, // prettier-ignore
          description: `قیمت امروز ورق گالوانیزه${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} میل آهن فروشی‌ها در بازار امروز. جهت مشاهده قیمت و خرید بدون واسطه انواع ورق گالوانیزه${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} وارد سایت شوید.`, // prettier-ignore
        },
        [PRODUCT_KIND.SHEET_ALLOY]: {
          title: `قیمت امروز ورق آلیاژی${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} میل از آهن فروشی‌های مختلف در بازار`, // prettier-ignore
          description: `قیمت امروز ورق آلیاژی${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} میل آهن فروشی‌ها در بازار امروز. جهت مشاهده قیمت و خرید بدون واسطه انواع ورق آلیاژی${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} وارد سایت شوید.`, // prettier-ignore
        },
        [PRODUCT_KIND.SHEET_TIN_PLATED]: {
          title: `قیمت امروز ورق قلع‌اندود${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} میل از آهن فروشی‌های مختلف در بازار`, // prettier-ignore
          description: `قیمت امروز ورق قلع‌اندود${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} میل آهن فروشی‌ها در بازار امروز. جهت مشاهده قیمت و خرید بدون واسطه انواع ورق قلع‌اندود${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} وارد سایت شوید.`, // prettier-ignore
        },
        [PRODUCT_KIND.SHEET_PICKLING]: {
          title: `قیمت امروز ورق اسیدشویی${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} میل از آهن فروشی‌های مختلف در بازار`, // prettier-ignore
          description: `قیمت امروز ورق اسیدشویی${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} میل آهن فروشی‌ها در بازار امروز. جهت مشاهده قیمت و خرید بدون واسطه انواع ورق اسیدشویی${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} وارد سایت شوید.`, // prettier-ignore
        },
        [PRODUCT_KIND.SHEET_RIBBED]: {
          title: `قیمت امروز ورق آجدار${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} میل از آهن فروشی‌های مختلف در بازار`, // prettier-ignore
          description: `قیمت امروز ورق آجدار${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} میل آهن فروشی‌ها در بازار امروز. جهت مشاهده قیمت و خرید بدون واسطه انواع ورق آجدار${factory ? ` ${factory}` : ""}${size ? ` ${size}` : ""} وارد سایت شوید.`, // prettier-ignore
        },
      },
    },
    [PRODUCT_TYPE.CORNER]: {
      title: `قیمت امروز نبشی ${size} از آهن فروشی‌های مختلف در بازار`, // prettier-ignore
      description: `قیمت امروز نبشی ${size} آهن فروشی‌ها در بازار امروز. جهت مشاهده قیمت و خرید بدون واسطه انواع نبشی ${size} وارد سایت شوید.`, // prettier-ignore
    },
    [PRODUCT_TYPE.CAN]: {
      title: `قیمت امروز قوطی و پروفیل ${size}  از آهن فروشی‌های مختلف در بازار`, // prettier-ignore
      description: `قیمت امروز قوطی و پروفیل ${size} آهن فروشی‌ها در بازار امروز. جهت مشاهده قیمت و خرید بدون واسطه انواع قوطی و پروفیل ${size} وارد سایت شوید.`, // prettier-ignore
    },
    [PRODUCT_TYPE.STUD]: {
      title: "قیمت ناودانی |  قیمت روز ناودانی آهن فروشی‌ها در بازار امروز ", // prettier-ignore
      description: "قیمت انواع ناودانی | قیمت روز ناودانی آهن فروشی‌ها در بازار امروز . جهت مشاهده قیمت و خرید انواع میلگرد وارد سایت شوید.", // prettier-ignore
    },
  };
};

const companiesPageTags = {
  // vendor: {
  //   title: "لیست بنگاه‌های فولادی ایران|  فهرست بنگاه‌های فولادی در ایران", // prettier-ignore
  //   description: "لیست بنگاه‌های عرضه فولاد، شمش، میلگرد، تیرآهن، ورق، نبشی و ناودانی و قوطی و پروفیل. جهت مشاهده وارد شوید.", // prettier-ignore
  // },
  factory: {
    title: "لیست کارخانه‌های فولادی ایران|  فهرست تولیدکنندگان محصولات فولادی در ایران", // prettier-ignore
    description: "لیست کارخانه‌های تولیدی فولاد، شمش، میلگرد، تیرآهن، ورق، نبشی و ناودانی و قوطی و پروفیل. جهت مشاهده وارد شوید.", // prettier-ignore
  },
  consumer: {
    title: "لیست مشتری‌های فولادی|  فهرست کارخانه‌ها و تولیدی‌های مصرف کننده آهن‌الات و فولادی", // prettier-ignore
    description: "لیست کارخانه‌ها، تولیدی‌ها، کارگاه‌ها، شرکت‌های مصرف‌کننده و خریداران آهن‌آلات و محصولات فولادی، میلگرد، تیرآهن، ورق، نبشی و ناودانی و قوطی و پروفیل. جهت مشاهده وارد شوید.", // prettier-ignore
  },
};

const singleVendorPageTags = ({ vendorName }: any) => {
  return {
    // vendor: {
    //   title: "لیست بنگاه‌های فولادی ایران|  فهرست بنگاه‌های فولادی در ایران", // prettier-ignore
    //   description: "لیست بنگاه‌های عرضه فولاد، شمش، میلگرد، تیرآهن، ورق، نبشی و ناودانی و قوطی و پروفیل. جهت مشاهده وارد شوید.", // prettier-ignore
    // },
    factory: {
      title: vendorName,
      description: null,
    },
    consumer: {
      title: vendorName,
      description: null,
    },
    freight: {
      title: null,
      description: null,
    },
  };
};

const pages = {
  about: {
    title:
      "درباره سامانه آهن | سامانه آهن مرجع قیمت میلگرد تیرآهن نبشی ناودانی قوطی پروفیل",
    description: "در مورد سامانه آهن بیشتر بدانید",
  },
  terms: {
    title: "قوانین و مقررات سامانه آهن",
    description: "منابع قیمت‌های درج شده در سامانه آهن",
  },
  account: {
    title: "صفحه حساب کاربری",
    description: undefined,
  },
  createVendor: {
    title: "صفحه فرم ایجاد بنگاه",
    description: undefined,
  },
  login: {
    title: "صفحه ورود",
    description: undefined,
  },
};

export const getMetaTags = (props?: GetMetaTags) => {
  let meta = defaultTags;

  if (props && props.page) {
    switch (props.page) {
      case "price":
        if (props.typeId && props.kindId) {
          const type = pricePageTags(props)[props.typeId];
          if (type.kinds && Object.keys(type.kinds).length) {
            const kind = type.kinds[props.kindId];
            if (kind) {
              meta = kind;
            }
          } else if (type.title && type.description) {
            meta = type;
          }
        } else if (props.typeId && !props.kindId) {
          const type = pricePageTags(props)[props.typeId];
          if (type.title && type.description) {
            meta = type;
          }
        }
        break;
      case "top-companies":
        if (props.vandorCategory != "all" && props.vandorCategory)
          //@ts-ignore
          meta = companiesPageTags[props.vandorCategory];
        break;
      case "index":
      case "about":
        meta = pages.about;
        break;
      case "terms":
        meta = pages.terms;
        break;
      case "account":
        meta = pages.account;
        break;
      case "create-vendor":
        meta = pages.createVendor;
        break;
      case "login":
        meta = pages.login;
        break;
      case "singleVendor":
        //@ts-ignore
        meta = singleVendorPageTags(props)[props.vandorCategory];
        break;
      default:
        meta = defaultTags;
        break;
    }
  }

  return meta;
};

export interface GetMetaTags {
  page?:
    | "index"
    | "top-companies"
    | "price"
    | "about"
    | "terms"
    | "singleVendor"
    | "account"
    | "create-vendor"
    | "login";
  typeId?: number;
  kindId?: number;
  /**
   * main filter. (value can be size,thickness or dimension).
   */
  size?: number | string | null;
  factory?: string | null;
  vendorName?: string;
  vandorCategory?: string | "all" | "factory" | "consumer" | "vendor";
}
