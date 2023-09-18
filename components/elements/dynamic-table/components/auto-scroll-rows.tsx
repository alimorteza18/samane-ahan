import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { renderCell } from "../services";
import { Column, Row } from "../types";

interface Props {
  rows: any[];
  columns: ColumnType[];
  footer?: JSX.Element | null;
  expandableRows?: Boolean;
  components?: { fullWidthIndexColumn?: () => JSX.Element };
  expandedView?: (row: Object | any) => JSX.Element;
  expandedRows: string[] | number[];
  handleExpandRow: any;
}

const AutoScrollRows = ({
  rows,
  columns,
  components,
  expandableRows,
  expandedView,
  footer,
  expandedRows,
  handleExpandRow,
}: Props) => {
  return (
    <>
      <Swiper
        style={{ height: "250px", width: "100%" }}
        direction={"vertical"}
        modules={[Pagination]}
        className="mySwiper"
        centerInsufficientSlides={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        spaceBetween={50}
        breakpoints={{
          300: { slidesPerView: 4, spaceBetween: 5 },
          480: { slidesPerView: 4, spaceBetween: 5 },
          640: { slidesPerView: 5, spaceBetween: 5 },
          768: { slidesPerView: 5, spaceBetween: 5 },
          1024: { slidesPerView: 5, spaceBetween: 5 },
          1200: { slidesPerView: 4, spaceBetween: 0 },
        }}
      >
        {rows.map((row: Row, idx: number) => (
          <SwiperSlide>
            <>
              <div
                key={idx}
                className={`dt-row ${
                  !components?.fullWidthIndexColumn
                    ? `${idx === 0 ? "dt-first-row" : null} ${
                        idx === rows.length - 1 && !footer
                          ? "dt-last-row"
                          : null
                      }`
                    : null
                } `}
                onClick={
                  expandableRows ? () => handleExpandRow(row) : () => null
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
                    {renderCell(row, column, idx)}
                  </div>
                ))}
                {expandableRows ? (
                  <div className={`dt-expand-icon`}>
                    <i
                      onClick={() => handleExpandRow(row)}
                      className={`cursor-pointer ${
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
                    {expandedView && expandedView(row)}
                  </div>
                </div>
              ) : null}
            </>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default AutoScrollRows;
