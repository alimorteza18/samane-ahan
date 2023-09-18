import { Spinner } from "reactstrap";
import { fetchGroupedProducts } from "@/services/product-services"; // prettier-ignore
import { KindProp, TypeProp } from "../page-component";
import { SetSingleFieldValueProps } from "@/hooks/use-http";

interface TableFooterProps {
  tableIndex: number;
  tableData: GroupedProduct;
  allData: GroupedProduct[];
  type: TypeProp;
  kind: KindProp | null;
  setSingleFieldValue: (props: SetSingleFieldValueProps) => void;
  selectedFilters: { [key: string]: string | string[] };
}

const TableFooter = ({
  tableIndex,
  tableData,
  allData,
  type,
  kind,
  selectedFilters,
  setSingleFieldValue,
}: TableFooterProps) => {
  const handleLoadMore = async (tableIndex: number, table: GroupedProduct) => {
    // ** set table footer to loading state
    setSingleFieldValue({
      index: tableIndex,
      field: "loadMore",
      value: { loading: true, hasBtn: true },
    });

    // ** fetching new products
    const results = await fetchGroupedProducts({
      type_id: type?.id,
      kind_id: kind?.id ?? null,
      per_page: 1000,
      notIds: table.items.map((item) => item.id),
      priceConfirmedAt: table.date,
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

    // ** if any data was found, update the table
    if (results.data.data.length) {
      const newData = [...allData];
      setSingleFieldValue({
        index: tableIndex,
        field: "items",
        value: (newData[tableIndex].items = [
          ...newData[tableIndex].items,
          ...results.data.data[0].items,
        ]),
      });
    }

    // ** if all the products were fetched, set table footer state to be hidden
    if (
      !results.data.data.length ||
      (results.data.data.length &&
        results.data.data[0].items &&
        results.data.data[0].items.length < 1000)
    ) {
      setSingleFieldValue({
        index: tableIndex,
        field: "loadMore",
        value: { loading: false, hasBtn: false },
      });
    } else {
      setSingleFieldValue({
        index: tableIndex,
        field: "loadMore",
        value: { loading: false, hasBtn: true },
      });
    }
  };

  return (
    <div
      onClick={() => handleLoadMore(tableIndex, tableData)}
      style={{
        cursor: "pointer",
        padding: "5px 5px",
        fontSize: "12px",
        color: "black",
        textAlign: "center",
        width: "100%",
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px",
      }}
    >
      <div
        style={{
          color: "#0089D6",
          fontWeight: "bold",
          fontSize: "12px",
          padding: "10px",
        }}
      >
        <span className="mr-10">مشاهده بیشتر</span>
        {/* @ts-ignore */}
        {tableData?.loadMore?.loading ? (
          <Spinner
            style={{
              width: "0.7rem",
              height: "0.7rem",
            }}
            type="grow"
            color="#0089D6"
          />
        ) : (
          <i
            style={{
              verticalAlign: "text-bottom",
              fontSize: "20px",
            }}
            className="fi-rs-caret-down"
          />
        )}
      </div>
    </div>
  );
};

export default TableFooter;
