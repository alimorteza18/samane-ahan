// ** Hooks
import React from "react";
import useWindowDimensions from "@/hooks/use-window-dimension";
import useExpandedRows from "@/hooks/use-expanded-rows";
import { DynamicTableProps, Row } from "./types";
// ** Components
import { FixedSizeList } from "react-window";
// ** Partials
import TableProgress from "./components/table-progress";
import FullWidthIndexWrapper from "./components/full-width-index-wrapper";
import AutoScrollRows from "./components/auto-scroll-rows";
import RowWrapper from "./components/row-wrapper";
import FooterWrapper from "./components/footer-wrapper";
import HeaderRow from "./components/header-row";
import HeadlineWrapper from "./components/headline-wrapper";
import TableBodyWrapper from "./components/table-body-wrapper";
import RowsContainer from "./components/rows-container";
import ReactWindowRowWrapper from "./components/react-window-row-wrapper";

const DynamicDivTable: React.FC<DynamicTableProps> = (props) => {
  const { scroll = false, height = "auto", reactWindow = false, styles: stylesProp, classNames: ClassNamesProp, components } = props; // prettier-ignore
  const { isMobile } = useWindowDimensions();
  const { expandedRows, handleExpandRow } = useExpandedRows();

  const getHeight = () => {
    if (props?.rows?.length >= 10) return 500;
    else return props?.rows?.length * 60;
  };

  return (
    <div
      className={"dt-table-container" + " " + ClassNamesProp?.container}
      style={stylesProp?.container}
    >
      {props?.headLine ? (
        <HeadlineWrapper isMobile={isMobile}>{props?.headLine}</HeadlineWrapper>
      ) : null}
      <HeaderRow
        columns={props?.columns}
        classNames={`${ClassNamesProp?.headerRow} dt-header-row`}
      />
      {props?.loading ? <TableProgress /> : null}

      <TableBodyWrapper fullWidthIndexColumn={components?.fullWidthIndexColumn}>
        {components?.fullWidthIndexColumn ? (
          <FullWidthIndexWrapper>
            {components?.fullWidthIndexColumn()}
          </FullWidthIndexWrapper>
        ) : null}

        {scroll ? (
          <AutoScrollRows
            expandedRows={expandedRows}
            handleExpandRow={handleExpandRow}
            {...props}
          />
        ) : reactWindow ? (
          <FixedSizeList
            width={"auto"}
            height={getHeight()}
            className="List"
            itemCount={props?.rows?.length}
            direction="rtl"
            itemSize={60}
          >
            {ReactWindowRowWrapper({
              columns: props?.columns,
              expandedRows,
              handleExpandRow,
              expandableRows: props?.expandableRows,
              rows: props?.rows,
              expandedView: props?.expandedView,
              footer: props?.footer,
              fullWidthIndexColumn: props?.components?.fullWidthIndexColumn,
            })}
          </FixedSizeList>
        ) : (
          <RowsContainer
            styles={stylesProp?.rowsContainer}
            height={height}
            classNames={ClassNamesProp?.container}
          >
            {props?.rows.map((row: Row, idx: number) => (
              <RowWrapper
                {...props}
                index={idx}
                row={row}
                expandedRows={expandedRows}
                handleExpandRow={handleExpandRow}
              />
            ))}
          </RowsContainer>
        )}

        {props.footer ? (
          <FooterWrapper
            fullWidthIndexColumn={components?.fullWidthIndexColumn}
          >
            {props?.footer}
          </FooterWrapper>
        ) : null}
      </TableBodyWrapper>
    </div>
  );
};

export default DynamicDivTable;
