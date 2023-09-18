import { PRODUCT_KIND, PRODUCT_KIND_DETAILS } from "@/services/product-kind-services"; //prettier-ignore
import { PRODUCT_KIND_AND_TYPE, PRODUCT_TYPE, PRODUCT_TYPE_DETAILS } from "@/services/product-type-services"; //prettier-ignore
import _ from "lodash";
import { sprintf } from "sprintf";

export const getTypeIdByTitle = (typeTitle: string) => {
  let type = 0;
  switch (typeTitle) {
    case "تیرآهن":
      type = PRODUCT_TYPE.GIRDER;
      break;
    case "میلگرد":
      type = PRODUCT_TYPE.REBAR;
      break;
    case "قوطی و پروفیل":
      type = PRODUCT_TYPE.CAN;
      break;
    case "ورق":
      type = PRODUCT_TYPE.SHEET;
      break;
    case "نبشی":
      type = PRODUCT_TYPE.CORNER;
      break;
    case "ناودانی":
      type = PRODUCT_TYPE.STUD;
      break;
  }
  return type;
};

export const getTypeByEnTitle = (typeTitle: string = "beam") => {
  let result = PRODUCT_TYPE_DETAILS[PRODUCT_TYPE.GIRDER];

  Object.keys(PRODUCT_TYPE_DETAILS).map((type: any) => {
    if (PRODUCT_TYPE_DETAILS[type].enLabel === typeTitle) {
      result = PRODUCT_TYPE_DETAILS[type];
    }
  });
  return result;
};

export const getProductKindByTypeAndKindTitle = (
  type_title: string,
  kind_title: string
) => {
  let result = PRODUCT_KIND_DETAILS[PRODUCT_KIND.GIRDER_NORMAL];
  Object.keys(PRODUCT_KIND_AND_TYPE).map((type: any) => {
    if (
      PRODUCT_KIND_AND_TYPE[type].label === type_title &&
      !_.isEmpty(PRODUCT_KIND_AND_TYPE[type]?.kinds)
    ) {
      Object.keys(PRODUCT_KIND_AND_TYPE[type].kinds).map((kind: any) => {
        if (PRODUCT_KIND_AND_TYPE[type].kinds[kind].label === kind_title)
          result = PRODUCT_KIND_AND_TYPE[type].kinds[kind];
        return;
      });
    }
  });
  return result;
};

export const getProductKindByTypeAndKindEnTitle = (
  type_title: string,
  kind_title: string
) => {
  let result = PRODUCT_KIND_DETAILS[PRODUCT_KIND.GIRDER_NORMAL];
  Object.keys(PRODUCT_KIND_AND_TYPE).map((type: any) => {
    if (
      PRODUCT_KIND_AND_TYPE[type].enLabel === type_title &&
      !_.isEmpty(PRODUCT_KIND_AND_TYPE[type]?.kinds)
    ) {
      Object.keys(PRODUCT_KIND_AND_TYPE[type].kinds).map((kind: any) => {
        if (PRODUCT_KIND_AND_TYPE[type].kinds[kind].enLabel === kind_title)
          result = PRODUCT_KIND_AND_TYPE[type].kinds[kind];
        return;
      });
    }
  });
  return result;
};

export const extractPricePageParamsFromUrl = (query: any) => {
  const typeKindSize: string = query.type_kind_size
    ? query.type_kind_size?.toString()
    : "";

  const factory: string | null = query.factory
    ? query.factory?.toString()
    : null;

  let types = "";
  let kinds = "";

  Object.keys(PRODUCT_TYPE_DETAILS).map((t: any, i: any) => {
    types = types + PRODUCT_TYPE_DETAILS[t]?.enLabel;
    if (i + 1 !== Object.keys(PRODUCT_TYPE_DETAILS).length) types = types + "|";
  });

  Object.keys(PRODUCT_KIND_DETAILS).map((t: any, i: any) => {
    kinds = kinds + PRODUCT_KIND_DETAILS[t]?.enLabel;
    if (i + 1 !== Object.keys(PRODUCT_KIND_DETAILS).length) kinds = kinds + "|";
  });

  const numbers = "[0-9]";
  const all_numbers = `${numbers}+[/.]?${numbers}*`; // including decimal numbers

  const typeRegex = `(?<type>${types})`;
  const kindRegex = `(?<kind>${kinds})`;
  const sizeRegex = `(?<size>${all_numbers})(?!\\*)`;
  const dimensionRegex = `(?<x>${all_numbers})\\*(?<y>${all_numbers})`;

  const rejex = [
    `${typeRegex}-${kindRegex}?[-]?${dimensionRegex}`,
    `${typeRegex}-${kindRegex}?[-]?${sizeRegex}`,
    `${typeRegex}-?${kindRegex}?`,
  ];

  let hasType = false,
    hasKind = false,
    hasSize = false,
    hasDimension = false;

  let type;
  let kind;
  let size;
  let x, y;

  for (const re of rejex) {
    const reg = new RegExp(re, "g");

    if (typeKindSize.match(reg)) {
      const results = reg.exec(typeKindSize);

      if (results?.groups?.type) {
        type = getTypeByEnTitle(results?.groups?.type);
        hasType = true;
        if (results?.groups?.kind) {
          kind = getProductKindByTypeAndKindEnTitle(
            results?.groups?.type,
            results?.groups?.kind
          );
          hasKind = true;
        }

        if (results?.groups?.size) {
          size = results?.groups?.size;
          hasSize = true;
        } else if (results?.groups?.x && results?.groups?.y) {
          x = results?.groups?.x;
          y = results?.groups?.y;
          hasDimension = true;
        }
      }

      break;
    }
  }

  let component: "products" | "kinds" = "products"; // products, kinds

  if (
    hasType &&
    !hasKind &&
    !hasSize &&
    type &&
    type.enLabel !== PRODUCT_TYPE_DETAILS[PRODUCT_TYPE.CORNER].enLabel &&
    type.enLabel !== PRODUCT_TYPE_DETAILS[PRODUCT_TYPE.STUD].enLabel
  ) {
    component = "kinds";
  }

  return { type, kind, size, x, y, factory, component };
};

export const formatJSONAsTable = (array: any) => {
  if (!Array.isArray(array) || array.length === 0) {
    return "";
  }

  // Extract the keys from the first object to use as table headers
  const headers = Object.keys(array[0]);

  // Calculate the maximum width for each column
  const columnWidths = headers.map((header) =>
    Math.max(header.length, ...array.map((obj) => String(obj[header]).length))
  );

  // Generate the table headers row with padded values
  const headerRow = `| ${headers
    .map((header, index) => header.padEnd(columnWidths[index]))
    .join(" | ")} |`;

  // Generate the table header separator row
  const separatorRow = `| ${columnWidths
    .map((width) => "-".repeat(width))
    .join(" | ")} |`;

  // Generate the table rows with padded values
  const dataRows = array.map((obj) => {
    const rowData = headers.map((header, index) =>
      String(obj[header]).padEnd(columnWidths[index])
    );
    return `| ${rowData.join(" | ")} |`;
  });

  // Combine the header row, separator row, and data rows
  const markdownTable = [headerRow, separatorRow, ...dataRows].join("\n");

  return markdownTable;
};
