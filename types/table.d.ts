type ColumnType = {
  name: string;
  label?: string;
  width?: string;
  render?: (
    row: Object | any,
    column: any,
    rowIndex: number
  ) => JSX.Element | string | number;
};

type RenderType = {
  [key: string]: (row: Object | any) => JSX.Element;
};

interface SimpleTableProps {
  columns: ColumnType[];
  rows: any[];
  headLine?: string | any;
  footer?: JSX.Element | null;
  expandableRows?: Boolean;
  expandedView?: (row: Object | any) => JSX.Element;
  render?: RenderType;
}
