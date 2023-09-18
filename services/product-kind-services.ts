import { fetchProductKindsProps } from "@/types/services";
import http, { apiUrlV3 } from "./http-service";

export const PRODUCT_KIND = {
  /**
   * معمولی - تیرآهن
   */
  GIRDER_COMMON: 1,
  /**
   * هاش - تیرآهن
   */
  GIRDER_HASH: 2,
  /**
   * نرمال - تیرآهن
   */
  GIRDER_NORMAL: 72,
  /**
   * آجدار - میلگرد
   */
  REBAR_RIBBED: 3,
  /**
   * ساده - میلگرد
   */
  REBAR_SIMPLE: 4,
  /**
   * مکیزیکی - قوطی پروفیل
   */
  CAN_MEXICAN: 16,
  /**
   * رومی - قوطی پروفیل
   */
  CAN_ROMAN: 17,
  /**
   * فرانسوی - قوطی پروفیل
   */
  CAN_FRENCH: 18,
  /**
   * ابعادی - قوطی پروفیل
   */
  CAN_COMMON: 19,
  /**
   * سپری - قوطی پروفیل
   */
  CAN_SHIELD: 30,
  /**
   * کلافی - قوطی پروفیل
   */
  CAN_COIL: 31,
  /**
   * لنگه دری - قوطی پروفیل
   */
  CAN_DOOR_HINGE: 33,
  /**
   * پروفیل z - قوطی پروفیل
   */
  CAN_Z_PROFILE: 80,
  /**
   * سیاه - ورق
   */
  SHEET_BLACK: 40,
  /**
   * روغنی - ورق
   */
  SHEET_OILY: 41,
  /**
   * رنگی - ورق
   */
  SHEET_COLORED: 42,
  /**
   * گالوانیزه - ورق
   */
  SHEET_GALVANIZED: 43,
  /**
   * آلیاژی - ورق
   */
  SHEET_ALLOY: 44,
  /**
   * اسیدشویی - ورق
   */
  SHEET_PICKLING: 45,
  /**
   * نورد - ورق
   */
  SHEET_ROLL: 46,
  /**
   * آجدار - ورق
   */
  SHEET_RIBBED: 73,
  /**
   * قلع اندود - ورق
   */
  SHEET_TIN_PLATED: 74,
  /**
   * سبک - ناودانی
   */
  STUD_LIGHT: 68,
  /**
   * استاندارد داخلی - ناودانی
   */
  STUD_INTERNAL_STANDARD: 69,
  /**
   * استاندارد اروپا - ناودانی
   */
  STUD_EUROPIAN_STANDARD: 70,
  /**
   * مانیسمان - لوله
   */
  PIPE_MANISMAN: 50,
  /**
   * مبلی - لوله
   */
  PIPE_SOFA: 51,
  /**
   * صنعتی - لوله
   */
  PIPE_INDUSTRIAL: 52,
  /**
   * درز مستقیم - لوله
   */
  PIPE_STRAIGHT_SEAM: 53,
  /**
   * جداره چاهی - لوله
   */
  PIPE_WELL_WALL: 54,
  /**
   * گالوانیزه - لوله
   */
  PIPE_GALVANIZED: 55,

  /**
   * فولادهای ساختمانی - فولاد آلیاژی
   */
  ALLOY_STEEL_CONSTRUCTION: 60,

  /**
   * فولادهای نیترات - فولاد آلیاژی
   */
  ALLOY_STEEL_NITRATE: 61,
  /**
   * فولادهای بلبرینگ - فولاد آلیاژی
   */
  ALLOY_STEEL_BEARING: 62,
  /**
   * فولادهای قاب پلاستیک - فولاد آلیاژی
   */
  ALLOY_STEEL_PLASTIC_FRAME: 63,
  /**
   * فولادهای قابل عملیات حرارتی - فولاد آلیاژی
   */
  ALLOY_STEEL_HEAT_TREATABLE: 64,
  /**
   * فولادهای ابزاری سردکار - فولاد آلیاژی
   */
  ALLOY_STEEL_COOL_WORK_TOOL: 65,
  /**
   * فولادهای ابزاری گرم‌کار - فولاد آلیاژی
   */
  ALLOY_STEEL_HOT_WORK_TOOL: 66,
  /**
   * فولادهای فنر - فولاد آلیاژی
   */
  ALLOY_STEEL_SPRING: 67,
};

export const PRODUCT_KIND_DETAILS = {
  // ** Girder
  [PRODUCT_KIND.GIRDER_COMMON]: {
    id: PRODUCT_KIND.GIRDER_COMMON,
    label: "معمولی",
    enLabel: "common",
  },
  [PRODUCT_KIND.GIRDER_HASH]: {
    id: PRODUCT_KIND.GIRDER_HASH,
    label: "هاش",
    enLabel: "hash",
  },
  [PRODUCT_KIND.GIRDER_NORMAL]: {
    id: PRODUCT_KIND.GIRDER_NORMAL,
    label: "نرمال",
    enLabel: "normal",
  },

  // ** REBAR
  [PRODUCT_KIND.REBAR_RIBBED]: {
    id: PRODUCT_KIND.REBAR_RIBBED,
    label: "آجدار",
    enLabel: "ribbed",
  },
  [PRODUCT_KIND.REBAR_SIMPLE]: {
    id: PRODUCT_KIND.REBAR_SIMPLE,
    label: "ساده",
    enLabel: "simple",
  },

  // ** CAN
  [PRODUCT_KIND.CAN_MEXICAN]: {
    id: PRODUCT_KIND.CAN_MEXICAN,
    label: "مکزیکی",
    enLabel: "mexican",
  },
  [PRODUCT_KIND.CAN_ROMAN]: {
    id: PRODUCT_KIND.CAN_ROMAN,
    label: "رومی",
    enLabel: "roman",
  },
  [PRODUCT_KIND.CAN_FRENCH]: {
    id: PRODUCT_KIND.CAN_FRENCH,
    label: "فرانسوی",
    enLabel: "french",
  },
  [PRODUCT_KIND.CAN_COMMON]: {
    id: PRODUCT_KIND.CAN_COMMON,
    label: "ابعادی",
    enLabel: "common",
  },
  [PRODUCT_KIND.CAN_SHIELD]: {
    id: PRODUCT_KIND.CAN_SHIELD,
    label: "سپری",
    enLabel: "shield",
  },
  [PRODUCT_KIND.CAN_COIL]: {
    id: PRODUCT_KIND.CAN_COIL,
    label: "کلافی",
    enLabel: "coil",
  },
  [PRODUCT_KIND.CAN_DOOR_HINGE]: {
    id: PRODUCT_KIND.CAN_DOOR_HINGE,
    label: "لنگه دری",
    enLabel: "door_hinge",
  },
  [PRODUCT_KIND.CAN_Z_PROFILE]: {
    id: PRODUCT_KIND.CAN_Z_PROFILE,
    label: "پروفیل z",
    enLabel: "profile_z",
  },

  // ** SHEET
  [PRODUCT_KIND.SHEET_BLACK]: {
    id: PRODUCT_KIND.SHEET_BLACK,
    label: "سیاه",
    enLabel: "black",
  },
  [PRODUCT_KIND.SHEET_OILY]: {
    id: PRODUCT_KIND.SHEET_OILY,
    label: "روغنی",
    enLabel: "sheet_oily",
  },
  [PRODUCT_KIND.SHEET_COLORED]: {
    id: PRODUCT_KIND.SHEET_COLORED,
    label: "رنگی",
    enLabel: "colored",
  },
  [PRODUCT_KIND.SHEET_GALVANIZED]: {
    id: PRODUCT_KIND.SHEET_GALVANIZED,
    label: "گالوانیزه",
    enLabel: "galvanized",
  },
  [PRODUCT_KIND.SHEET_ALLOY]: {
    id: PRODUCT_KIND.SHEET_ALLOY,
    label: "آلیاژی",
    enLabel: "alloy",
  },
  [PRODUCT_KIND.SHEET_PICKLING]: {
    id: PRODUCT_KIND.SHEET_PICKLING,
    label: "اسیدشویی",
    enLabel: "pickling",
  },
  [PRODUCT_KIND.SHEET_ROLL]: {
    id: PRODUCT_KIND.SHEET_ROLL,
    label: "نورد",
    enLabel: "roll",
  },
  [PRODUCT_KIND.SHEET_RIBBED]: {
    id: PRODUCT_KIND.SHEET_RIBBED,
    label: "آجدار",
    enLabel: "ribbed",
  },
  [PRODUCT_KIND.SHEET_TIN_PLATED]: {
    id: PRODUCT_KIND.SHEET_TIN_PLATED,
    label: "قلع اندود",
    enLabel: "tin_plated",
  },

  // ** STUD
  [PRODUCT_KIND.STUD_LIGHT]: {
    id: PRODUCT_KIND.STUD_LIGHT,
    label: "سبک",
    enLabel: "light",
  },
  [PRODUCT_KIND.STUD_INTERNAL_STANDARD]: {
    id: PRODUCT_KIND.STUD_INTERNAL_STANDARD,
    label: "استاندارد داخلی",
    enLabel: "internal_standard",
  },
  [PRODUCT_KIND.STUD_EUROPIAN_STANDARD]: {
    id: PRODUCT_KIND.STUD_EUROPIAN_STANDARD,
    label: "استاندارد اروپا",
    enLabel: "europian_standard",
  },

  // ** PIPE
  [PRODUCT_KIND.PIPE_MANISMAN]: {
    id: PRODUCT_KIND.PIPE_MANISMAN,
    label: "مانیسمان",
    enLabel: "pipe_manisman",
  },
  [PRODUCT_KIND.PIPE_SOFA]: {
    id: PRODUCT_KIND.PIPE_SOFA,
    label: "مبلی",
    enLabel: "sofa",
  },
  [PRODUCT_KIND.PIPE_INDUSTRIAL]: {
    id: PRODUCT_KIND.PIPE_INDUSTRIAL,
    label: "صنعتی",
    enLabel: "industrial",
  },
  [PRODUCT_KIND.PIPE_STRAIGHT_SEAM]: {
    id: PRODUCT_KIND.PIPE_STRAIGHT_SEAM,
    label: "درز مستقیم",
    enLabel: "industrial",
  },
  [PRODUCT_KIND.PIPE_WELL_WALL]: {
    id: PRODUCT_KIND.PIPE_WELL_WALL,
    label: "جداره چاهی",
    enLabel: "well_wall",
  },
  [PRODUCT_KIND.PIPE_GALVANIZED]: {
    id: PRODUCT_KIND.PIPE_GALVANIZED,
    label: "گالوانیزه",
    enLabel: "galvanized",
  },

  // ** ALLOY STEEL
  [PRODUCT_KIND.ALLOY_STEEL_CONSTRUCTION]: {
    id: PRODUCT_KIND.ALLOY_STEEL_CONSTRUCTION,
    label: "فولادهای ساختمانی",
    enLabel: "steel_construction",
  },
  [PRODUCT_KIND.ALLOY_STEEL_NITRATE]: {
    id: PRODUCT_KIND.ALLOY_STEEL_NITRATE,
    label: "فولادهای نیترات",
    enLabel: "nitrate",
  },
  [PRODUCT_KIND.ALLOY_STEEL_BEARING]: {
    id: PRODUCT_KIND.ALLOY_STEEL_BEARING,
    label: "فولادهای بلبرینگ",
    enLabel: "bearing",
  },
  [PRODUCT_KIND.ALLOY_STEEL_PLASTIC_FRAME]: {
    id: PRODUCT_KIND.ALLOY_STEEL_PLASTIC_FRAME,
    label: "فولادهای قاب پلاستیک",
    enLabel: "plastic_frame",
  },
  [PRODUCT_KIND.ALLOY_STEEL_HEAT_TREATABLE]: {
    id: PRODUCT_KIND.ALLOY_STEEL_HEAT_TREATABLE,
    label: "فولادهای قابل عملیات حرارتی",
    enLabel: "heat_treatable",
  },
  [PRODUCT_KIND.ALLOY_STEEL_COOL_WORK_TOOL]: {
    id: PRODUCT_KIND.ALLOY_STEEL_COOL_WORK_TOOL,
    label: "فولادهای ابزاری سردکار",
    enLabel: "cool_work_tool",
  },
  [PRODUCT_KIND.ALLOY_STEEL_HOT_WORK_TOOL]: {
    id: PRODUCT_KIND.ALLOY_STEEL_HOT_WORK_TOOL,
    label: "فولادهای ابزاری گرم‌کار",
    enLabel: "hot_work_tool",
  },
  [PRODUCT_KIND.ALLOY_STEEL_SPRING]: {
    id: PRODUCT_KIND.ALLOY_STEEL_SPRING,
    label: "فولادهای فنر",
    enLabel: "spring",
  },
};

export const fetchProductKinds = (params: fetchProductKindsProps) =>
  http.get("product/kind", { params, baseURL: apiUrlV3 });
