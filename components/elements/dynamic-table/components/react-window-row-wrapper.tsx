import { CSSProperties } from "react";
import { renderCell } from "../services";
import { Column, Row } from "../types";

interface ReactWindowRowWrapper {
  rows: any[];

  columns: ColumnType[];
  footer?: JSX.Element | null;
  expandableRows?: Boolean;
  fullWidthIndexColumn?: () => JSX.Element;
  expandedRows: string[] | number[];
  handleExpandRow: any;
  expandedView?: (row: Object | any) => JSX.Element;
}

const ReactWindowRowWrapper =
  ({
    columns,
    expandedRows,
    handleExpandRow,
    rows,
    expandableRows,
    expandedView,
    footer,
    fullWidthIndexColumn,
  }: ReactWindowRowWrapper) =>
  ({ index, style }: { index: number; style: CSSProperties | undefined }) => {
    return (
      <>
        <div
          className={`dt-row ${
            !fullWidthIndexColumn
              ? `${index === 0 ? "dt-first-row" : null} ${
                  index === rows.length - 1 && !footer ? "dt-last-row" : null
                }`
              : null
          } `}
          style={{
            height: "73px",
            gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
            paddingLeft: expandableRows ? "10px" : 0,
            ...(style ?? {}),
          }}
          onClick={
            expandableRows ? () => handleExpandRow(rows[index]) : () => null
          }
        >
          {columns.map((column: Column, idx2: number) => (
            <div
              key={idx2}
              className={`dt-cell`}
              style={{
                justifyContent: idx2 !== 0 ? "center" : "start",
              }}
            >
              {renderCell(rows[index], column, index)}
            </div>
          ))}
          {expandableRows ? (
            <div className={`dt-expand-icon`}>
              <i
                onClick={() => handleExpandRow(rows[index])}
                className={`cursor-pointer ${
                  //@ts-ignore
                  expandedRows && expandedRows.includes(rows[index]?.id)
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
        expandedRows.includes(rows[index]?.id) ? (
          <div className={"dt-row"}>
            <div className={`dt-cell`}>
              {expandedView && expandedView(rows[index])}
            </div>
          </div>
        ) : null}
      </>
    );
  };

export default ReactWindowRowWrapper;
