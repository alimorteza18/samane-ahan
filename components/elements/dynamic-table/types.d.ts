import { CSSProperties } from "react";

export interface Column {
  label?: string;
  name: string;
  render?: (
    row: Object | any,
    column: any,
    rowIndex: number
  ) => JSX.Element | string | number;
  width?: string;
}

export interface Row {
  [key: string]: any;
}

export interface DynamicTableProps {
  scroll?: boolean;
  reactWindow?: boolean;
  columns: ColumnType[];
  rows: any[];
  height?: string;
  loading?: boolean;
  headLine?: string | any;
  footer?: JSX.Element | null;
  expandableRows?: Boolean;
  components?: {
    fullWidthIndexColumn?: () => JSX.Element;
  };
  expandedView?: (row: Object | any) => JSX.Element;
  render?: RenderType;
  classNames?: {
    rowsContainer?: string | undefined;
    container?: string | undefined;
    headerRow?: string | undefined;
  };
  styles?: {
    rowsContainer?: CSSProperties | undefined;
    container?: CSSProperties | undefined;
    headerRow?: CSSProperties | undefined;
  };
}
