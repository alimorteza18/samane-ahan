import { CSSProperties } from "react";
import { Column } from "../types";

interface Props {
  columns: ColumnType[];
  classNames?: string | undefined;
  styles?: CSSProperties | undefined;
}

const HeaderRow = ({
  columns,
  styles: stylesProp,
  classNames: ClassNamesProp,
}: Props) => {
  return (
    <div
      className={`dt-header-row ${ClassNamesProp ?? ""}`}
      style={{
        // gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
        ...(stylesProp ?? {}),
      }}
    >
      {columns.map((column: Column, idx: number) => (
        <div
          key={idx}
          className={"dt-cell"}
          style={{
            width: "auto",
            gridColumn: "span 1 / span 1",
            justifyContent: column.name == "vendor_name" ? "start" : "center",
          }}
        >
          {column.label || column.name}
        </div>
      ))}
    </div>
  );
};

export default HeaderRow;
