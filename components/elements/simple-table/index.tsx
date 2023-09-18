import { useState } from "react";
import { Table } from "reactstrap";

export default function SimpleTable(props: SimpleTableProps) {
  const {
    columns,
    rows,
    headLine,
    expandableRows = false,
    expandedView,
    render,
  } = props;

  // State variable to keep track of all the expanded rows
  // By default, nothing expanded. Hence initialized with empty array.
  const [expandedRows, setExpandedRows] = useState<number[] | string[]>([]);

  const handleExpandRow = (row: any) => {
    const currentExpandedRows: number[] | string[] = expandedRows;

    // @ts-ignore
    const isRowExpanded = currentExpandedRows.includes(row.id);

    // If the row is expanded, we are here to hide it. Hence remove
    // it from the state variable. Otherwise add to it.
    const newExpandedRows = isRowExpanded
      ? // @ts-ignore
        currentExpandedRows.filter((id: string | number) => id !== row.id)
      : // @ts-ignore
        currentExpandedRows.concat(row.id);

    setExpandedRows(newExpandedRows);
  };

  return (
    <>
      {headLine ? (
        <div
          style={{
            width: "100%",
            backgroundColor: "#ffefc6",
            padding: "15px 40px",
            fontSize: "20px",
            color: "black",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            borderTop: "1px solid rgba(204, 204, 204)",
            borderLeft: "1px solid rgba(204, 204, 204)",
            borderRight: "1px solid rgba(204, 204, 204)",
          }}
        >
          {headLine}
        </div>
      ) : null}
      <Table
        hover
        className={`styled-table ${!props.footer ? "mb-50" : "mb-0"}`}
      >
        <thead>
          <tr>
            {columns?.map((col) => (
              <th scope="col">{col.label ?? col.name}</th>
            ))}
            {expandableRows ? <th></th> : null}
          </tr>
        </thead>
        <tbody style={{ borderTop: "none" }}>
          {rows?.map((row, idx) => (
            <>
              <tr>
                {columns.map((col) => (
                  <>
                    {/* for desktop */}
                    <td className="d-none d-xl-table-cell">
                      {col.render
                        ? col.render(row, col, idx)
                        : render && render[col.name]
                        ? render[col.name](row)
                        : row[col.name]}
                    </td>
                    {/* for mobile */}
                    <td className="d-xl-none d-flex">
                      <span className="ml-10 text-end">
                        {col.label ?? col.name}:{" "}
                      </span>
                      <span style={{ width: "100%" }}>
                        {col.render
                          ? col.render(row, col, idx)
                          : render && render[col.name]
                          ? render[col.name](row)
                          : row[col.name]}
                      </span>
                    </td>
                  </>
                ))}
                {expandableRows ? (
                  <td>
                    <i
                      style={{ cursor: "pointer" }}
                      onClick={() => handleExpandRow(row)}
                      className={
                        //@ts-ignore
                        expandedRows && expandedRows.includes(row.id)
                          ? "fi-rs-angle-up"
                          : "fi-rs-angle-down"
                      }
                    ></i>
                  </td>
                ) : null}
              </tr>
              {expandableRows &&
              expandedRows &&
              // @ts-ignore
              expandedRows.includes(row.id) ? (
                <tr>
                  <td colSpan={columns.length + (expandableRows ? 1 : 0)}>
                    {expandedView && expandedView(row)}
                  </td>
                </tr>
              ) : null}
            </>
          ))}
        </tbody>
      </Table>
      {props.footer ? props.footer : null}
    </>
  );
}
