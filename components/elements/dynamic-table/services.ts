import { Column, Row } from "./types";

export const renderCell = (row: Row, column: Column, rowIndex: number) => {
  if (column.render) {
    return column.render(row, column, rowIndex);
  } else {
    return row[column.name];
  }
};
