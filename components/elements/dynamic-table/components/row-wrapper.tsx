import { renderCell } from "../services";
import { Column, Row } from "../types";

interface Props {
  index: number;
  columns: ColumnType[];
  rows: any[];
  row: Row;
  footer?: JSX.Element | null;
  expandableRows?: Boolean;
  components?: {
    fullWidthIndexColumn?: () => JSX.Element;
  };
  expandedRows: string[] | number[];
  handleExpandRow: any;
  expandedView?: (row: Object | any) => JSX.Element;
}

const RowWrapper = ({
  index,
  row,
  components,
  expandableRows,
  rows,
  footer,
  columns,
  handleExpandRow,
  expandedRows,
  expandedView,
}: Props) => {
  return (
    <>
      <div
        className={`dt-row ${
          !components?.fullWidthIndexColumn
            ? `${index === 0 ? "dt-first-row" : null} ${
                index === rows.length - 1 && !footer ? "dt-last-row" : null
              }`
            : null
        } `}
        onClick={expandableRows ? () => handleExpandRow(row) : () => null}
      >
        {columns.map((column: Column, idx2: number) => (
          <div
            key={idx2}
            className={`dt-cell`}
            style={{
              justifyContent: idx2 !== 0 ? "center" : "start",
            }}
          >
            {renderCell(row, column, index)}
          </div>
        ))}
        {expandableRows ? (
          <div className={`dt-expand-icon`}>
            <i
              onClick={() => handleExpandRow(row)}
              className={`
                cursor-pointer ${
                  //@ts-ignore
                  expandedRows && expandedRows.includes(row.id)
                    ? "fi-rs-angle-up"
                    : "fi-rs-angle-down"
                }`}
            />
          </div>
        ) : null}
      </div>
      {expandableRows &&
      expandedRows &&
      // @ts-ignore
      expandedRows.includes(row.id) ? (
        <div className={"dt-row"}>
          <div className={`dt-cell`}>
            <div className="d-flex">{expandedView && expandedView(row)}</div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default RowWrapper;
