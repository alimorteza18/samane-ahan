import {
  fetchProductTypesProps,
  GetTypeMainFilterService,
  TypeMainFilters,
} from "@/types/services";
import http, { apiUrlV3 } from "./http-service";
import { PRODUCT_KIND_DETAILS } from "./product-kind-services";
import { PRODUCT_KIND } from "./product-kind-services";

export const PRODUCT_TYPE = {
  /**
   * تیرآهن
   */
  GIRDER: 1,

  /**
   * میلگرد
   */
  REBAR: 2,

  /**
   * قوطی و پروفیل
   */
  CAN: 3,

  /**
   * شمش
   */
  BULLION: 4,

  /**
   * ورق
   */
  SHEET: 5,

  /**
   * نبشی
   */
  CORNER: 6,

  /**
   * ناودانی
   */
  STUD: 7,

  /**
   * لوله
   */
  PIPE: 8,

  /**
   * فولاد آلیاژی
   */
  ALLOY_STEEL: 9,

  /**
   * ضایعات
   */
  WASTAGE: 10,

  /**
   * استیل
   */
  STEEL: 11,
};

export const PRODUCT_TYPE_DETAILS = {
  [PRODUCT_TYPE.GIRDER]: {
    id: PRODUCT_TYPE.GIRDER,
    label: "تیرآهن",
    enLabel: "beam",
    defaultKind: PRODUCT_KIND_DETAILS[PRODUCT_KIND.GIRDER_COMMON],
  },
  [PRODUCT_TYPE.REBAR]: {
    id: PRODUCT_TYPE.REBAR,
    label: "میلگرد",
    enLabel: "rebar",
    defaultKind: PRODUCT_KIND_DETAILS[PRODUCT_KIND.REBAR_RIBBED],
  },
  [PRODUCT_TYPE.CAN]: {
    id: PRODUCT_TYPE.CAN,
    label: "قوطی", // قوطی و پروفیل
    enLabel: "profile",
    defaultKind: PRODUCT_KIND_DETAILS[PRODUCT_KIND.CAN_COMMON],
  },
  [PRODUCT_TYPE.SHEET]: {
    id: PRODUCT_TYPE.SHEET,
    label: "ورق",
    enLabel: "steel_plate",
    defaultKind: PRODUCT_KIND_DETAILS[PRODUCT_KIND.SHEET_BLACK],
  },
  [PRODUCT_TYPE.CORNER]: {
    id: PRODUCT_TYPE.CORNER,
    label: "نبشی",
    enLabel: "channel_bar",
  },
  [PRODUCT_TYPE.STUD]: {
    id: PRODUCT_TYPE.STUD,
    label: "ناودانی",
    enLabel: "angle_bar",
    // defaultKind: PRODUCT_KIND_DETAILS[PRODUCT_KIND.STUD_EUROPIAN_STANDARD],
  },
};

export const PRODUCT_KIND_AND_TYPE = {
  [PRODUCT_TYPE.GIRDER]: {
    ...PRODUCT_TYPE_DETAILS[PRODUCT_TYPE.GIRDER],
    kinds: {
      [PRODUCT_KIND.GIRDER_COMMON]: {
        ...PRODUCT_KIND_DETAILS[PRODUCT_KIND.GIRDER_COMMON],
      },
      [PRODUCT_KIND.GIRDER_HASH]: {
        ...PRODUCT_KIND_DETAILS[PRODUCT_KIND.GIRDER_HASH],
      },
      [PRODUCT_KIND.GIRDER_NORMAL]: {
        ...PRODUCT_KIND_DETAILS[PRODUCT_KIND.GIRDER_NORMAL],
      },
    },
  },
  [PRODUCT_TYPE.REBAR]: {
    ...PRODUCT_TYPE_DETAILS[PRODUCT_TYPE.REBAR],
    kinds: {
      [PRODUCT_KIND.REBAR_RIBBED]: {
        ...PRODUCT_KIND_DETAILS[PRODUCT_KIND.REBAR_RIBBED],
      },
      [PRODUCT_KIND.REBAR_SIMPLE]: {
        ...PRODUCT_KIND_DETAILS[PRODUCT_KIND.REBAR_SIMPLE],
      },
    },
  },
  [PRODUCT_TYPE.CAN]: {
    ...PRODUCT_TYPE_DETAILS[PRODUCT_TYPE.CAN],
    kinds: {
      [PRODUCT_KIND.CAN_MEXICAN]: {
        ...PRODUCT_KIND_DETAILS[PRODUCT_KIND.CAN_MEXICAN],
      },
      [PRODUCT_KIND.CAN_ROMAN]: {
        ...PRODUCT_KIND_DETAILS[PRODUCT_KIND.CAN_ROMAN],
      },
      [PRODUCT_KIND.CAN_FRENCH]: {
        ...PRODUCT_KIND_DETAILS[PRODUCT_KIND.CAN_FRENCH],
      },
      [PRODUCT_KIND.CAN_COMMON]: {
        ...PRODUCT_KIND_DETAILS[PRODUCT_KIND.CAN_COMMON],
      },
      [PRODUCT_KIND.CAN_SHIELD]: {
        ...PRODUCT_KIND_DETAILS[PRODUCT_KIND.CAN_SHIELD],
      },
      [PRODUCT_KIND.CAN_COIL]: {
        ...PRODUCT_KIND_DETAILS[PRODUCT_KIND.CAN_COIL],
      },
      [PRODUCT_KIND.CAN_DOOR_HINGE]: {
        ...PRODUCT_KIND_DETAILS[PRODUCT_KIND.CAN_DOOR_HINGE],
      },
      [PRODUCT_KIND.CAN_Z_PROFILE]: {
        ...PRODUCT_KIND_DETAILS[PRODUCT_KIND.CAN_Z_PROFILE],
      },
    },
  },
  [PRODUCT_TYPE.SHEET]: {
    ...PRODUCT_TYPE_DETAILS[PRODUCT_TYPE.SHEET],
    kinds: {
      [PRODUCT_KIND.SHEET_BLACK]: {
        ...PRODUCT_KIND_DETAILS[PRODUCT_KIND.SHEET_BLACK],
      },
      [PRODUCT_KIND.SHEET_OILY]: {
        ...PRODUCT_KIND_DETAILS[PRODUCT_KIND.SHEET_OILY],
      },
      [PRODUCT_KIND.SHEET_COLORED]: {
        ...PRODUCT_KIND_DETAILS[PRODUCT_KIND.SHEET_COLORED],
      },
      [PRODUCT_KIND.SHEET_GALVANIZED]: {
        ...PRODUCT_KIND_DETAILS[PRODUCT_KIND.SHEET_GALVANIZED],
      },
      [PRODUCT_KIND.SHEET_ALLOY]: {
        ...PRODUCT_KIND_DETAILS[PRODUCT_KIND.SHEET_ALLOY],
      },
      [PRODUCT_KIND.SHEET_PICKLING]: {
        ...PRODUCT_KIND_DETAILS[PRODUCT_KIND.SHEET_PICKLING],
      },
      [PRODUCT_KIND.SHEET_ROLL]: {
        ...PRODUCT_KIND_DETAILS[PRODUCT_KIND.SHEET_ROLL],
      },
      [PRODUCT_KIND.SHEET_RIBBED]: {
        ...PRODUCT_KIND_DETAILS[PRODUCT_KIND.SHEET_RIBBED],
      },
      [PRODUCT_KIND.SHEET_TIN_PLATED]: {
        ...PRODUCT_KIND_DETAILS[PRODUCT_KIND.SHEET_TIN_PLATED],
      },
    },
  },
  [PRODUCT_TYPE.CORNER]: {
    ...PRODUCT_TYPE_DETAILS[PRODUCT_TYPE.CORNER],
    kinds: {},
  },
  [PRODUCT_TYPE.STUD]: {
    ...PRODUCT_TYPE_DETAILS[PRODUCT_TYPE.STUD],
    kinds: {
      // [PRODUCT_KIND.STUD_LIGHT]: {
      //   ...PRODUCT_KIND_DETAILS[PRODUCT_KIND.STUD_LIGHT],
      // },
      // [PRODUCT_KIND.STUD_INTERNAL_STANDARD]: {
      //   ...PRODUCT_KIND_DETAILS[PRODUCT_KIND.STUD_INTERNAL_STANDARD],
      // },
      // [PRODUCT_KIND.STUD_EUROPIAN_STANDARD]: {
      //   ...PRODUCT_KIND_DETAILS[PRODUCT_KIND.STUD_EUROPIAN_STANDARD],
      // },
    },
  },
};

export const fetchProductTypes = (params: fetchProductTypesProps) =>
  http.get("product/type", { params, baseURL: apiUrlV3 });

export const getTypeMainFilter: GetTypeMainFilterService = (typeId = null) => {
  let mainFilter: TypeMainFilters = "sizeValue";

  switch (typeId) {
    case PRODUCT_TYPE.CORNER:
    case PRODUCT_TYPE.SHEET:
      mainFilter = "thicknessValue";
      break;
    case PRODUCT_TYPE.CAN:
      mainFilter = "dimensionValue";
      break;
    default:
      mainFilter = "sizeValue";
  }

  return mainFilter;
};

export const getMainFilterOfType = (typeId: any = null) => {
  let mainFilter: string = "size";

  switch (parseInt(typeId)) {
    case PRODUCT_TYPE.CORNER:
      return "dimension";
    case PRODUCT_TYPE.SHEET:
      return "thickness";
    case PRODUCT_TYPE.CAN:
      return "dimension";
    default:
      return "size";
  }

  return mainFilter;
};

export const getMainFilterLabelOfType = (typeId: any = null) => {
  switch (parseInt(typeId)) {
    case PRODUCT_TYPE.CORNER:
      return "ابعاد";
    case PRODUCT_TYPE.SHEET:
      return "ضخامت";
    case PRODUCT_TYPE.CAN:
      return "ابعاد";
    default:
      return "سایز";
  }
};
