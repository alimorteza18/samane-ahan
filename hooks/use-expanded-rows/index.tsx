import { useState } from "react";

const useExpandedRows = () => {
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

  return { expandedRows, handleExpandRow };
};

export default useExpandedRows;
