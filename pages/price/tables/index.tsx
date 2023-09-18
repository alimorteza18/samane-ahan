// ** Hooks

import useColumn from "@/hooks/use-column";
// ** Partials
import TableHeadLine from "./table-headline";
import TableFooter from "./table-footer";
import FullWidthIndexColumn from "./full-width-index-col";
// ** Components
import DynamicTable from "@/components/elements/dynamic-table";
// ** Services
import { KindProp, TypeProp } from "../page-component";
import { SetSingleFieldValueProps } from "@/hooks/use-http";
import useSecureCall from "@/hooks/use-secure-call";

interface TablesProps {
  type: TypeProp;
  kind: KindProp | null;
  data: GroupedProduct[];
  setSingleFieldValue: (props: SetSingleFieldValueProps) => void;
  selectedFilters: { [key: string]: string | string[] };
  setData: (data: any) => void;
}

const Tables = ({
  type,
  kind,
  data,
  setSingleFieldValue,
  selectedFilters,
  setData,
}: TablesProps) => {
  const { CallModalsContainer, connecting, handleCallVendor } = useSecureCall();

  /**
   * @description getting columns and details of tables according to type, kind and window width
   */
  const { columns, ExpandedView } = useColumn({
    type_id: type?.id,
    kind_id: kind?.id ?? null,
    calling: connecting,
    handleCallVendor,
  });

  const getFactoryGroupedColumns = (columns: any) => {
    return columns.filter((item: any) => item.name !== "factory");
  };

  return (
    <div className="product-grid">
      <CallModalsContainer />
      {data.length === 0 && <h3>محصولی یافت نشد</h3>}

      {data.map((da, i) => (
        <div className="product-wrapper">
          <TableHeadLine
            da={da}
            type={type}
            setSingleFieldValue={setSingleFieldValue}
            kind={kind}
            tableIndex={i}
            selectedFilters={selectedFilters}
            setData={setData}
          />
          {/* @ts-ignore */}
          {da?.group_by_factory ?? false ? (
            da?.grouped_by_factory?.map((factory_group_item) => (
              <DynamicTable
                scroll={false}
                reactWindow
                // @ts-ignore
                loading={da?.loading}
                classNames={{ container: "mb-5" }}
                columns={getFactoryGroupedColumns(columns)}
                rows={factory_group_item.items}
                components={{
                  fullWidthIndexColumn: () => (
                    <FullWidthIndexColumn
                      factory_group_item={factory_group_item}
                    />
                  ),
                }}
              />
            ))
          ) : (
            <DynamicTable
              scroll={false}
              reactWindow
              height="500px"
              // @ts-ignore
              loading={da?.loading}
              columns={columns}
              rows={da.items}
              footer={
                //@ts-ignore
                da?.loadMore?.hasBtn ?? true ? (
                  <TableFooter
                    allData={data}
                    kind={kind}
                    type={type}
                    selectedFilters={selectedFilters}
                    setSingleFieldValue={setSingleFieldValue}
                    tableData={da}
                    tableIndex={i}
                  />
                ) : null
              }
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Tables;
