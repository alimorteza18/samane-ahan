// ** Hooks
import useColumn from "@/hooks/use-column";
import useHttp from "@/hooks/use-http";
import useWindowDimensions from "@/hooks/use-window-dimension";
// ** Components
import { Col, Container, Row } from "reactstrap";
import Link from "next/link";
import DynamicTable from "@/components/elements/dynamic-table";
import TableHeadLine from "../price/tables/table-headline";
import Button from "@/components/input/button";
// ** Services
import { PRODUCT_TYPE, PRODUCT_TYPE_DETAILS } from "@/services/product-type-services"; //prettier-ignore
import TypeHorizontall from "../price/filters/types-horizontal";
import { useState } from "react";
import { fetchGroupedProducts } from "@/services/product-services";
import { KindProp, TypeProp } from "../price/page-component";
import { RawData } from "@/types";
import { dateToPersian } from "@/services/datetime-services";

interface ProductsSectionProps {
  sectionId?: string;
  type: TypeProp;
  groupedProducts: RawData<GroupedProduct[]>;
}

const ProductsSection = ({
  sectionId = "products-section",
  type: typeProp,
  groupedProducts,
}: ProductsSectionProps) => {
  const [type, setType] = useState<TypeProp>(typeProp);
  //@ts-ignore
  const [kind, setKind] = useState<KindProp | null>(typeProp?.defaultKind);

  const [mainFilter, setMainFilter] = useState<any>({ sizeValue: [16, 18] });

  /**
   * @description getting products
   */
  const { data, setData, loading, setLoading, setSingleFieldValue } = useHttp<
    GroupedProduct[]
  >(fetchGroupedProducts, {
    initialState: groupedProducts,
    type_id: type?.id,
    kind_id: kind?.id,
    per_page: 100,
    order: "created_at",
    ...mainFilter,
    includes: [
      { name: "userVendor", fields: ["id", "name", "vendor_profile_img"] },
    ],
  });

  const getFactoryGroupedColumns = (columns: any) => {
    return columns.filter((item: any) => item.name !== "factory");
  };

  const handleMainFilterChange = (typeId: any = null) => {
    switch (parseInt(typeId)) {
      case PRODUCT_TYPE.GIRDER:
        return setMainFilter({ sizeValue: [18] });
      case PRODUCT_TYPE.REBAR:
        return setMainFilter({ sizeValue: [16, 18] });
      default:
        return setMainFilter(null);
    }
  };

  /**
   * @description set type and also set default kind of that type
   * @param typeId
   * @returns void
   */
  const handleTypeChange = (typeId: any): void => {
    handleMainFilterChange(typeId);
    setType(PRODUCT_TYPE_DETAILS[typeId]);
    if (PRODUCT_TYPE_DETAILS[typeId]?.defaultKind)
      //@ts-ignore
      setKind(PRODUCT_TYPE_DETAILS[typeId]?.defaultKind);
    else setKind(null);
  };

  const handleDateUpdate = async (
    price_confirmed_at: any,
    table: any,
    tableIndex: any
  ) => {
    setLoading(true);

    const results = await fetchGroupedProducts({
      type_id: type?.id,
      kind_id: kind?.id ?? null,
      per_page: 30,
      priceConfirmedAt: price_confirmed_at,
      order: "created_at",
      [`${table.group_by}Value`]: table.group_by_value,
      includes: [
        { name: "userVendor", fields: ["id", "name", "vendor_profile_img"] },
      ],
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
      newData[tableIndex].date = price_confirmed_at;
      newData[tableIndex].date_fa = dateToPersian(price_confirmed_at);

      return newData;
    });

    setLoading(false);
  };

  const { columns, ExpandedView } = useColumn({
    type_id: type.id,
    kind_id: type.defaultKind?.id,
  });

  const { isMobile } = useWindowDimensions();

  return (
    <section id={sectionId} className="featured  section-padding mt-100">
      <Container
        className="mb-50 pt-50 pb-50 position-relative"
        style={{
          border: "5px solid #FFEFC6",
          borderRadius: "30px",
          backgroundColor: "#fff",
        }}
      >
        <Row
          className="text-center position-absolute"
          style={{
            height: "40px",
            top: "-20px",
            left: isMobile ? "20%" : "40%",
          }}
        >
          <Col>
            <h2
              className="pt-10 pb-10 pr-20 pl-20 pr-sm-40 pl-sm-40"
              style={{
                backgroundColor: "#FFEFC6",
                fontSize: "20px",
                borderRadius: "30px",
                color: "black",
                fontWeight: "bold",
              }}
            >
              لیست قیمت آهن‌فروشی‌ها
            </h2>
          </Col>
        </Row>
        <Row>
          <TypeHorizontall
            type={type}
            setType={handleTypeChange}
            autoScrollTop={false}
          />
        </Row>
        <Row className="mt-50 justify-content-center">
          <Col md={9}>
            <div className="mb-20">
              <h3>لیست برخی قیمت‌ها</h3>
            </div>
            {data?.length ? (
              <>
                <div
                  style={{
                    padding: isMobile ? "15px 10px" : "15px 40px",
                    width: "100%",
                    backgroundColor: "#ffefc6",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                    color: "black",
                    borderRadius: "8px",
                  }}
                >
                  <TableHeadLine
                    da={data[0]}
                    type={type}
                    setSingleFieldValue={setSingleFieldValue}
                    kind={kind}
                    tableIndex={0}
                    setData={setData}
                  />
                </div>

                {/* @ts-ignore */}
                {data[0]?.group_by_factory ?? false ? (
                  data[0]?.grouped_by_factory
                    ?.slice(0, 5)
                    ?.map((factory_group_item) => (
                      <DynamicTable
                        scroll
                        expandableRows={true}
                        // @ts-ignore
                        expandedView={ExpandedView}
                        loading={loading}
                        styles={{ container: { marginBottom: "30px" } }}
                        columns={getFactoryGroupedColumns(columns)}
                        rows={factory_group_item.items?.slice(0, 5)}
                        components={{
                          fullWidthIndexColumn: () => (
                            <span
                              className={
                                factory_group_item.group_by_value.length > 10 &&
                                factory_group_item.items?.length === 1
                                  ? "dt-full-width-text-animate"
                                  : "dt-full-width-text"
                              }
                              style={{
                                color: "black",
                                fontSize: "0.9rem",
                                fontWeight: 800,
                              }}
                            >
                              {factory_group_item.group_by_value}
                            </span>
                          ),
                        }}
                      />
                    ))
                ) : (
                  <DynamicTable
                    expandableRows={true}
                    // @ts-ignore
                    expandedView={ExpandedView}
                    loading={loading}
                    styles={{ container: { marginBottom: "30px" } }}
                    columns={columns}
                    rows={data[0].items.slice(0, 5)}
                    scroll
                  />
                )}
              </>
            ) : null}
          </Col>
        </Row>
        <Row style={{ marginTop: "40px", textAlign: "center" }}>
          <Col>
            <Button
              id="index-products-all"
              href={"/price/rebar-ribbed"}
              color="primary"
              label="مشاهده تمام محصولات"
              style={{ borderRadius: "20px", fontSize: "20px", color: "black" }}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductsSection;
