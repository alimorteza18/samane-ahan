// ** Hooks
import { useEffect, useState } from "react";
// ** Partials
// ** Services
import { createColumnHelper } from "@tanstack/react-table";
import PriceCol from "./price-col";
import VendorCol from "./vendor-col";
import useWindowDimensions, { breakpoints } from "../use-window-dimension";
import FactoryCol from "./factory-col";
import FreightPlaceCol from "./freight-place-col";
import { useDispatch, useSelector } from "react-redux";
import ShowPhoneCol from "./show-phone-col";
import useAuth from "../use-auth";
import { PRODUCT_TYPE } from "@/services/product-type-services";
import UnitCol from "./unit-col";
import { PRODUCT_KIND } from "@/services/product-kind-services";
import IdCol from "./id-col";

interface UseColumnProps {
  type_id: any;
  kind_id: any;
  calling?: boolean;
  handleCallVendor?: (vendor: UserVendor) => void;
}

const useColumn = ({
  type_id,
  kind_id,
  calling,
  handleCallVendor,
}: UseColumnProps) => {
  const columnHelper = createColumnHelper<any>();

  const { isMobile, width } = useWindowDimensions();
  const { profile } = useSelector((state: any) => state.auth);
  const { isEditMode } = useAuth();

  const dispatch = useDispatch();

  const [columns, setColumns] = useState<any>([]);

  const prepareColumnsForTanstackTable = (columns: Array<any>) => {
    const results = columns.map((col) =>
      columnHelper.accessor(col.name, {
        header: col.header,
        size: col?.size,
        cell: (info) =>
          col.render ? (
            <col.render
              row={info.row.original}
              isMobile={isMobile}
              width={width}
              profile={profile}
              dispatch={dispatch}
              calling={calling}
              handleCallVendor={handleCallVendor}
            />
          ) : (
            info.getValue()
          ),
      })
    );

    return results;
  };

  const getColumns = () => {
    let columns: Array<any> = [];
    let mobileColumns: Array<any> = [];
    let expandedColumns: Array<any> = [];

    let tableColumns: Array<any> = [];

    switch (type_id) {
      case PRODUCT_TYPE.GIRDER:
        columns = [{ name: "unit", header: "واحد", render: UnitCol }];
        expandedColumns = [
          { header: "استاندارد", name: "standard" },
          { header: "طول", name: "length" },
          { header: "عرض", name: "width" },
          { header: "ساعت", name: "jalali_price_confirmed_at" },
        ];
        break;
      case PRODUCT_TYPE.CORNER:
        columns = [
          { header: "ضخامت", name: "thickness" },
          { header: "واحد", name: "unit" },
        ];
        expandedColumns = [{ header: "طول", name: "length" }];
        break;
      case PRODUCT_TYPE.REBAR:
        columns = [
          // { header: "استاندارد", name: "standard" },
          { header: "واحد", name: "unit" },
        ];
        expandedColumns = [
          { header: "طول", name: "mode" },
          { header: "استاندارد", name: "standard" },
        ];
        break;
      case PRODUCT_TYPE.STUD:
        columns = [{ header: "واحد", name: "unit" }];
        expandedColumns = [
          { header: "طول", name: "mode" },
          { header: "استاندارد", name: "standard" },
        ];
        break;
      case PRODUCT_TYPE.CAN:
        switch (kind_id) {
          case PRODUCT_KIND.CAN_Z_PROFILE:
            columns = [
              { header: "ضخامت", name: "thickness" },
              { header: "ارتفاع", name: "height" },
            ];
            break;
          default:
            columns = [{ header: "ضخامت", name: "thickness" }];
            break;
        }
        expandedColumns = [
          { header: "طول", name: "length" },
          { header: "استاندارد", name: "standard" },
        ];
        break;
      case PRODUCT_TYPE.SHEET:
        switch (kind_id) {
          case PRODUCT_KIND.SHEET_COLORED:
            columns = [
              { header: "عرض", name: "width" },
              { header: "رنگ", name: "color" },
              { header: "واحد", name: "unit" },
            ];
            mobileColumns = [
              { header: "عرض", name: "width" },
              { header: "رنگ", name: "color" },
            ];
            break;
          default:
            columns = [
              { header: "عرض", name: "width" },
              { header: "واحد", name: "unit" },
            ];
            mobileColumns = [{ header: "عرض", name: "width" }];
            break;
        }
        expandedColumns = [
          { header: "طول", name: "length" },
          { header: "استاندارد", name: "standard" },
        ];
        break;
      case PRODUCT_TYPE.PIPE:
        columns = [
          { header: "ضخامت", name: "thickness" },
          { header: "واحد", name: "unit" },
        ];
        mobileColumns = [{ header: "ضخامت", name: "thickness" }];
        expandedColumns = [{ header: "طول", name: "length" }];
        break;
      case PRODUCT_TYPE.ALLOY_STEEL:
        columns = [{ header: "دسته", name: "category" }];
        expandedColumns = [{ header: "استاندارد", name: "standard" }];
        break;
      case PRODUCT_TYPE.WASTAGE:
        columns = [{ header: "دسته", name: "category" }];
        break;
    }

    if (width <= breakpoints.md) {
      (expandedColumns = [
        { header: "محل بار", name: "freight_place" },
        { header: "واحد", name: "unit" },

        ...expandedColumns,
      ]),
        (tableColumns = [
          {
            name: "vendor_name",
            header: "فروشنده",
            size: "240px",
            render: VendorCol,
          },
          { name: "factory", header: "کارخانه", render: FactoryCol },
          ...mobileColumns,
          { name: "price", header: "قیمت (تومان)", render: PriceCol },
          { name: "show_phone", header: "تماس", render: ShowPhoneCol },
        ]);
    } else {
      tableColumns = [
        {
          name: "vendor_name",
          header: "فروشنده",
          size: "140px",
          render: VendorCol,
        },
        { name: "factory", header: "کارخانه", render: FactoryCol },
        { name: "freight_place", header: "محل بار", render: FreightPlaceCol },
        ...columns,
        { name: "price", header: "قیمت (تومان)", render: PriceCol },
        { name: "show_phone", header: "تماس", render: ShowPhoneCol },
      ];
    }

    if (isEditMode) {
      tableColumns.splice(1, 0, {
        name: "id", header: "شناسه", render: IdCol }); //prettier-ignore
    }

    setColumns(tableColumns);
  };

  useEffect(() => getColumns(), [width, type_id, kind_id, profile, isEditMode]);

  return {
    columns: prepareColumnsForTanstackTable(columns),
  };

  return {};
};

export default useColumn;
