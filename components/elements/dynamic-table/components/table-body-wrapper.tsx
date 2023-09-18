interface Props {
  children: any;
  fullWidthIndexColumn?: () => JSX.Element;
}

const TableBodyWrapper = ({ children, fullWidthIndexColumn }: Props) => {
  return (
    <div
      className={`dt-table-body-wrapper ${
        fullWidthIndexColumn && "dt-table-body-wrapper-fw-index-col"
      }`}
    >
      {children}
    </div>
  );
};

export default TableBodyWrapper;
