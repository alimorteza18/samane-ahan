// ** Hooks
import useColumn from "@/hooks/use-tanstack-column";
// ** Partials
// ** Components
// ** Services
import { KindProp, TypeProp } from "../page-component";
import { SetSingleFieldValueProps } from "@/hooks/use-http";
import useSecureCall from "@/hooks/use-secure-call";
import ReactTable from "@/components/elements/tanstack-table";

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
  const { columns } = useColumn({
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
        <ReactTable
          columns={columns}
          data={da.items}
          styles={{ container: { display: "content" } }}
        />
      ))}
    </div>
  );
};

export default Tables;
