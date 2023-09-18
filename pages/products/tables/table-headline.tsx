import { dateToPersian } from "@/services/datetime-services";
import type { KindProp, TypeProp } from "../page-component";
import { Col, Row } from "react-bootstrap";
import Select from "@/components/input/select";
import { SetSingleFieldValueProps } from "@/hooks/use-http";
import { useEffect, useState } from "react";
import useWindowDimensions from "@/hooks/use-window-dimension";
import useAuth from "@/hooks/use-auth";
import { formatJSONAsTable } from "../service";
import copy from "clipboard-copy";
import { toast } from "react-toastify";
import { fetchGroupedProducts } from "@/services/product-services";

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
  const { isEditMode } = useAuth();

  const { isDesktop } = useWindowDimensions();
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

  const handleExportForTG = async () => {
    const datas = formatJSONAsTable(
      da.items.map((item) => ({
        شناسه: item.id,
        قیمت: item.price,
        "نوع محصول": item.type_id,
      }))
    );

    await copy(datas);
    toast.info("پیام در کلیپ بورد ذخیره شد", { rtl: true });
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
              <div className="d-flex" style={{ flexWrap: "wrap" }}>
                <i className={`icon icon-${type?.id}`} />
                <h2>
                  <span>{type?.label + " " + (kind?.label ?? "") + " "}</span>
                  <span>{da.group_by_value}</span>
                </h2>
                <span
                  className="mr-5 ml-10 d-none d-lg-flex"
                  style={{ fontSize: "26px", color: "#d1d1d1" }}
                >
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
            <Col xs={6} lg={5}>
              <div className="d-flex" style={{ flexWrap: "wrap" }}>
                <div className="wraper-switch-town">
                  <label className="switch">
                    <input
                      type="checkbox"
                      //@ts-ignore
                      checked={da?.group_by_factory}
                      onChange={(e) => {
                        setSingleFieldValue({
                          index: tableIndex,
                          field: "group_by_factory",
                          value: e.target.checked,
                        });
                      }}
                    />
                    <span className="slider round"></span>
                  </label>
                  <span
                    style={{ fontSize: "10px" }}
                    className="mr-5 switch-title"
                  >
                    ارزان ترین هر کارخانه
                  </span>
                </div>
                <div className="wraper-switch-town">
                  <label className="switch">
                    <input
                      type="checkbox" // @ts-ignore
                      checked={!da?.group_by_factory}
                      onChange={(e) => {
                        setSingleFieldValue({
                          index: tableIndex,
                          field: "group_by_factory",
                          value: !e.target.checked,
                        });
                      }}
                    />
                    <span className="slider round"></span>
                  </label>
                  <span
                    style={{ fontSize: "10px" }}
                    className="mr-5 switch-title"
                  >
                    ارزان ترین
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col xs={6} sm={7} md={6} lg={6}>
              <div className="table-headline">
                <i className={`icon icon-${type?.id}`} />
                <h2>
                  <span>{type?.label + " " + (kind?.label ?? "") + " "}</span>
                  <span>{da.group_by_value}</span>
                </h2>
                <span
                  className="mr-10 ml-5 d-none d-lg-flex d-md-flex"
                  style={{ fontSize: "26px", color: "#d1d1d1" }}
                >
                  |
                </span>
                <div className="select-content">
                  <div className={lable ? "circle" : "circle-off"}></div>
                  <Select
                    options={dateOptions}
                    style={{
                      paddingLeft: hasPadding ? "35px" : "45px",
                    }}
                    value={da.date}
                    onChange={(e) => {
                      handleDateUpdate(e, da, tableIndex);
                      handleCircle(e);
                    }}
                  />
                  <span> به روزرسانی :</span>
                </div>
              </div>
            </Col>
            <Col xs={6} sm={5} md={6} lg={6}>
              <div className="wraper-switch">
                {/* <Button
                  onClick={handleExportForTG}
                  icon={<FontAwesomeIcon icon={faShare} className="ml-5" />}
                  style={{ marginTop: 0, marginLeft: "10px" }}
                  size="xs"
                  label="خروجی پیام تلگرام"
                /> */}

                <div className="wraper-switch-town">
                  <label className="switch">
                    <input
                      type="checkbox" // @ts-ignore
                      checked={!da?.group_by_factory}
                      onChange={(e) => {
                        setSingleFieldValue({
                          index: tableIndex,
                          field: "group_by_factory",
                          value: !e.target.checked,
                        });
                      }}
                    />
                    <span className="slider round"></span>
                  </label>
                  <span className="mr-5 switch-title">ارزان ترین</span>
                </div>
                <div className="wraper-switch-town">
                  <label className="switch">
                    <input
                      type="checkbox"
                      //@ts-ignore
                      checked={da?.group_by_factory}
                      onChange={(e) => {
                        setSingleFieldValue({
                          index: tableIndex,
                          field: "group_by_factory",
                          value: e.target.checked,
                        });
                      }}
                    />
                    <span className="slider round"></span>
                  </label>
                  <span className="mr-5 switch-title">
                    ارزان ترین هر کارخانه
                  </span>
                </div>
              </div>
            </Col>
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
