import useColumn from "@/hooks/use-column";
import DynamicDivTable from "@/components/elements/dynamic-table";
import TableHeadLine from "../price/tables/table-headline";
import Link from "next/link";
import { PRODUCT_TYPE_DETAILS } from "@/services/product-type-services";
import { SetSingleFieldValueProps } from "@/hooks/use-http";
import useSecureCall from "@/hooks/use-secure-call";

interface Table {
  currentTime: string;
  product: GroupedProduct;
  setData: (data: any) => void;
  loading: boolean;
  setSingleFieldValue: (props: SetSingleFieldValueProps) => void;
}

export default function Table({
  currentTime,
  product,
  loading,
  setSingleFieldValue,
  setData,
}: Table) {
  const type = PRODUCT_TYPE_DETAILS[product?.items[0]?.type_id];
  const { CallModalsContainer, connecting, handleCallVendor } = useSecureCall({
    time: currentTime,
  });

  const { columns } = useColumn({
    type_id: type?.id,
    kind_id: type?.defaultKind?.id,
    calling: connecting,
    handleCallVendor,
  });

  const getFactoryGroupedColumns = (columns: any) => {
    return columns.filter((item: any) => item.name !== "factory");
  };
  const getFreightPlaceGroupedColumns = (columns: any) => {
    return columns.filter((item: any) => item.name !== "freight_place");
  };

  return (
    <div className="mb-30 product-wrapper" style={{ overflowX: "hidden" }}>
      <CallModalsContainer />
      <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
        <TableHeadLine
          town={true}
          da={product}
          type={type}
          // @ts-ignore
          kind={type?.defaultKind}
          setSingleFieldValue={setSingleFieldValue}
          setData={setData}
          tableIndex={0}
        />
      </div>
      {/* @ts-ignore */}
      {product?.group_by_factory ?? false ? (
        product?.grouped_by_factory?.map((factory_group_item) => (
          <DynamicDivTable
            scroll={false}
            loading={loading}
            styles={{
              container: { marginBottom: "30px" },
              headerRow: {
                position: "sticky",
                top: "50px",
                zIndex: 1,
              },
            }}
            columns={getFactoryGroupedColumns(columns)}
            rows={factory_group_item.items}
            components={{
              fullWidthIndexColumn: () => (
                <span
                  className={
                    factory_group_item.group_by_value.length > 8 &&
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
        <DynamicDivTable
          scroll={true}
          loading={loading}
          height="400px"
          styles={{
            headerRow: {
              position: "sticky",
              top: "55px",
              zIndex: 1,
            },
          }}
          columns={getFreightPlaceGroupedColumns(columns)}
          rows={product.items}
          footer={
            <div
              style={{
                cursor: "pointer",
                width: "100%",
                backgroundColor: "#ffefc6",
                padding: "5px 5px",
                fontSize: "14px",
                fontWeight: "600",
                color: "black",
                textAlign: "center",
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
              }}
            >
              <Link
                className="d-block w-100 text-dark"
                href={"/price/rebar-ribbed"}
              >
                مشاهده سایزها و محصولات دیگر
              </Link>
            </div>
          }
        />
      )}
    </div>
  );
}
