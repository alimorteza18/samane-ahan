import ReactDataTable from "react-data-table-component";
import { Spinner } from "react-bootstrap";
import type { IDataTableProps } from "react-data-table-component";

const DataTable = (props: IDataTableProps<any>) => {
  const {
    onChangePage = null,
    subHeaderComponent = null,
    paginationPerPage = 10,
    paginationTotalRows = 10,
    onChangeRowsPerPage = null,
    data,
    ...rest
  } = props || {};

  return (
    <ReactDataTable
      noHeader
      pagination
      noDataComponent={<h5>باری ثبت نشده است</h5>}
      subHeader
      responsive={true}
      progressComponent={<Spinner animation="border" />}
      paginationServer
      className="react-dataTable"
      data={data}
      {...rest}
    />
  );
};

export default DataTable;
