// ** Hooks
import { useEffect, useState } from "react";
import useWindowDimensions, { breakpoints } from "@/hooks/use-window-dimension";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "@/hooks/use-auth";
// ** Partials
import PriceCol from "./price-col";
import ShowPhoneCol from "./show-phone-col";
import VendorCol from "./vendor-col";
import FactoryCol from "./factory-col";
import ExpandedView from "./expanded-view";
import FreightPlaceCol from "./freight-place-col";
import UnitCol from "./unit-col";
import IdCol from "./id-col";
// ** Services
import { PRODUCT_KIND } from "@/services/product-kind-services";
import { PRODUCT_TYPE } from "@/services/product-type-services";

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
  const { width, isMobile } = useWindowDimensions();
  const { profile } = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();
  const { isEditMode } = useAuth();

  const [columns, setColumns] = useState<ColumnType[]>([
    { name: "vendor_name", label: "فروشنده", width: "240px", render: (row) => <VendorCol row={row} isMobile={isMobile}   /> }, // prettier-ignore
    { name: "factory", label: "کارخانه", render: FactoryCol },
    { name: "freight_place", label: "محل بار", render: FreightPlaceCol },
    { name: "price", label: "قیمت (تومان)", render: PriceCol },
    { name: "show_phone", label: "تماس", render: (row) => <ShowPhoneCol row={row} profile={profile} dispatch={dispatch} width={width} calling={calling} handleCallVendor={handleCallVendor} /> }, // prettier-ignore
  ]);
  const [expandedColumns, setExpandedColumns] = useState<ColumnType[]>([
    { label: "طول", name: "length" },
    { label: "واحد", name: "unit" },
    { label: "استاندارد", name: "standard" },
  ]);

  const getColumns = () => {
    let columns: ColumnType[] = [];
    let mobileColumns: ColumnType[] = [];
    let expandedColumns: ColumnType[] = [];

    let tableColumns: ColumnType[] = [];

    switch (type_id) {
      case PRODUCT_TYPE.GIRDER:
        columns = [{ name: "unit", label: "واحد", render: UnitCol }];
        expandedColumns = [
          { label: "استاندارد", name: "standard" },
          { label: "طول", name: "length" },
          { label: "عرض", name: "width" },
          { label: "ساعت", name: "jalali_price_confirmed_at" },
        ];
        break;
      case PRODUCT_TYPE.CORNER:
        columns = [
          { label: "ضخامت", name: "thickness" },
          { label: "واحد", name: "unit" },
        ];
        expandedColumns = [{ label: "طول", name: "length" }];
        break;
      case PRODUCT_TYPE.REBAR:
        columns = [
          // { label: "استاندارد", name: "standard" },
          { label: "واحد", name: "unit" },
        ];
        expandedColumns = [
          { label: "طول", name: "mode" },
          { label: "استاندارد", name: "standard" },
        ];
        break;
      case PRODUCT_TYPE.STUD:
        columns = [{ label: "واحد", name: "unit" }];
        expandedColumns = [
          { label: "طول", name: "mode" },
          { label: "استاندارد", name: "standard" },
        ];
        break;
      case PRODUCT_TYPE.CAN:
        switch (kind_id) {
          case PRODUCT_KIND.CAN_Z_PROFILE:
            columns = [
              { label: "ضخامت", name: "thickness" },
              { label: "ارتفاع", name: "height" },
            ];
            break;
          default:
            columns = [{ label: "ضخامت", name: "thickness" }];
            break;
        }
        expandedColumns = [
          { label: "طول", name: "length" },
          { label: "استاندارد", name: "standard" },
        ];
        break;
      case PRODUCT_TYPE.SHEET:
        switch (kind_id) {
          case PRODUCT_KIND.SHEET_COLORED:
            columns = [
              { label: "عرض", name: "width" },
              { label: "رنگ", name: "color" },
              { label: "واحد", name: "unit" },
            ];
            mobileColumns = [
              { label: "عرض", name: "width" },
              { label: "رنگ", name: "color" },
            ];
            break;
          default:
            columns = [
              { label: "عرض", name: "width" },
              { label: "واحد", name: "unit" },
            ];
            mobileColumns = [{ label: "عرض", name: "width" }];
            break;
        }
        expandedColumns = [
          { label: "طول", name: "length" },
          { label: "استاندارد", name: "standard" },
        ];
        break;
      case PRODUCT_TYPE.PIPE:
        columns = [
          { label: "ضخامت", name: "thickness" },
          { label: "واحد", name: "unit" },
        ];
        mobileColumns = [{ label: "ضخامت", name: "thickness" }];
        expandedColumns = [{ label: "طول", name: "length" }];
        break;
      case PRODUCT_TYPE.ALLOY_STEEL:
        columns = [{ label: "دسته", name: "category" }];
        expandedColumns = [{ label: "استاندارد", name: "standard" }];
        break;
      case PRODUCT_TYPE.WASTAGE:
        columns = [{ label: "دسته", name: "category" }];
        break;
    }

    if (width <= breakpoints.md) {
      (expandedColumns = [
        { label: "محل بار", name: "freight_place" },
        { label: "واحد", name: "unit" },

        ...expandedColumns,
      ]),
        (tableColumns = [
          { name: "vendor_name", label: "فروشنده", width: "240px", render: (row) => <VendorCol row={row} isMobile={isMobile}   /> }, // prettier-ignore
          { name: "factory", label: "کارخانه", render: FactoryCol },
          ...mobileColumns,
          { name: "price", label: "قیمت (تومان)", render: PriceCol },
          { name: "show_phone", label: "تماس", render: (row) => <ShowPhoneCol row={row} profile={profile} dispatch={dispatch} width={width} calling={calling} handleCallVendor={handleCallVendor} /> }, // prettier-ignore
        ]);
    } else {
      tableColumns = [
        { name: "vendor_name", label: "فروشنده", width: "140px", render: (row) => <VendorCol row={row} isMobile={isMobile}   /> }, // prettier-ignore
        { name: "factory", label: "کارخانه", render: FactoryCol },
        { name: "freight_place", label: "محل بار", render: FreightPlaceCol },
        ...columns,
        { name: "price", label: "قیمت (تومان)", render: PriceCol },
        { name: "show_phone", label: "تماس", render: (row) => <ShowPhoneCol row={row} profile={profile} dispatch={dispatch} width={width} calling={calling} handleCallVendor={handleCallVendor} /> }, // prettier-ignore
      ];
    }

    if (isEditMode) {
      tableColumns.splice(1, 0, {
        name: "id", label: "شناسه", render: IdCol }); //prettier-ignore
    }

    setColumns(tableColumns);
    setExpandedColumns(expandedColumns);
  };

  useEffect(() => getColumns(), [width, type_id, kind_id, profile, isEditMode]);

  return {
    columns,
    expandedColumns,
    ExpandedView: ExpandedView(expandedColumns),
  };
};

export default useColumn;
