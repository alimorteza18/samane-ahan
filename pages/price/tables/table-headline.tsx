// ** Hooks
import { useEffect, useState } from "react";
// ** Components
import { Col, Row } from "react-bootstrap";
// ** Services
import dynamic from "next/dynamic";
import { checkProductsTableHeaderDate } from "@/services/datetime-services";
import { fetchGroupedProducts } from "@/services/product-services";
import { dateToPersian } from "@/services/datetime-services";
// ** Types
import { SetSingleFieldValueProps } from "@/hooks/use-http";
import type { KindProp, TypeProp } from "../page-component";

const Select = dynamic(() => import("@/components/input/select"));

interface TableHeadLineProps {
  setSingleFieldValue: (props: SetSingleFieldValueProps) => void;
  da: GroupedProduct;
  tableIndex: number;
  type: TypeProp;
  kind: KindProp | null;
  town?: any;
  selectedFilters?: { [key: string]: string | string[] };
  setData: (data: any) => void;
}

const TableHeadLine = ({
  setSingleFieldValue,
  town,
  da,
  type,
  kind,
  selectedFilters,
  setData,
  tableIndex,
}: TableHeadLineProps) => {
  let dateOptions: DataOption[] = [];
  const [lable, setLable] = useState(true);
  const [hasPadding, setHasPadding] = useState(true);

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const formatter = new Intl.DateTimeFormat("fa-IR", {
    timeZone: "Asia/Tehran",
  });

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const hejry = formatter.format(date);

    let labelValue = "";
    if (date.toDateString() === today.toDateString()) {
      labelValue = "امــــــــــروز";
    } else if (date.toDateString() === yesterday.toDateString()) {
      labelValue = "دیــــــــــروز";
    } else {
      labelValue = hejry;
    }

    dateOptions.push({
      label: labelValue,
      value: date.toISOString().slice(0, 10),
    });
  }
  const targetDate = new Date(da.date);
  const targetOption = dateOptions.find((option) => option.value === da.date);
  if (!targetOption) {
    dateOptions.push({
      label: formatter.format(targetDate),
      value: da.date,
    });
  }
  useEffect(() => {
    if (da.date === today.toISOString().slice(0, 10)) {
      setLable(true);
    } else {
      setLable(false);
    }
  }, [da.date, today]);

  const handleCircle = (e: any) => {
    setLable(today.toISOString().slice(0, 10) === e);

    if (
      today.toISOString().slice(0, 10) === e ||
      yesterday.toISOString().slice(0, 10) === e
    ) {
      setHasPadding(true);
    } else {
      setHasPadding(false);
    }
  };

  const handleDateUpdate = async (
    price_confirmed_at: any,
    table: any,
    tableIndex: any
  ) => {
    setSingleFieldValue({ index: tableIndex, field: "loading", value: true });

    const results = await fetchGroupedProducts({
      type_id: type?.id,
      kind_id: kind?.id ?? null,
      per_page: 300,
      priceConfirmedAt: price_confirmed_at,
      order: "created_at",
      [`${table.group_by}Value`]: table.group_by_value,
      includes: [
        {
          name: "userVendor",
          fields: ["id", "name", "vendor_profile_img", "category"],
        },
      ],
      ...selectedFilters,
    });
    setData((prev: GroupedProduct[]) => {
      const newData = [...prev];

      if (results.data.data.length) {
        newData[tableIndex].items = [...results.data.data[0].items];
        newData[tableIndex].grouped_by_factory =
          results.data.data[0].grouped_by_factory;
      } else {
        newData[tableIndex].items = [];
        newData[tableIndex].grouped_by_factory = [];
      }

      //@ts-ignore
      newData[tableIndex].loading = false;
      newData[tableIndex].date = price_confirmed_at;
      newData[tableIndex].date_fa = dateToPersian(price_confirmed_at);

      return newData;
    });

    // setSingleFieldValue({ index: tableIndex, field: "loading", value: false });
  };

  return (
    <div className="top-header-table">
      <div className="header-table">
        {town ? (
          <Row>
            <Col xs={6} lg={7}>
              <div className="d-flex flex-wrap">
                <i className={`icon icon-${type?.id}`} />
                <h2>
                  <span>{type?.label + " " + (kind?.label ?? "") + " "}</span>
                  <span>{da.group_by_value}</span>
                </h2>
                <span className="mr-5 ml-10 d-none d-lg-flex price-table-head-sep">
                  |
                </span>
                <div className="select-content">
                  <div className={lable ? "circle" : ""} id="circle"></div>
                  <Select
                    options={dateOptions}
                    value={da?.date}
                    onChange={(e) => {
                      handleDateUpdate(e, da, tableIndex);
                      handleCircle(e);
                    }}
                  />
                  <span> به روزرسانی :</span>
                </div>
              </div>
            </Col>
            <Col xs={6} lg={5}></Col>
          </Row>
        ) : (
          <Row>
            <div className="table-headline" style={{ display: "flex" }}>
              <div>
                <i className={`icon icon-${type?.id}`} />
                <h2 style={{ display: "inline" }}>
                  <span>{type?.label + " " + (kind?.label ?? "") + " "}</span>
                  <span>{da.group_by_value}</span>
                </h2>
              </div>
              <span className="mr-10 ml-5 d-lg-flex d-md-flex price-table-head-sep">
                |
              </span>
              <div className="select-content">
                <div className={lable ? "circle" : "circle-off"}></div>

                <div className="price-table-head-date">
                  به روزرسانی :{" "}
                  {checkProductsTableHeaderDate(da.date, da.date_fa)}
                </div>
              </div>
            </div>
          </Row>
        )}
      </div>
    </div>
  );
};

type DataOption = {
  label: string;
  value: string;
};
export default TableHeadLine;
