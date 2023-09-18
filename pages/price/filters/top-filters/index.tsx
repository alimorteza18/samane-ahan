// ** Components
import { Col, Container, Row, Spinner } from "reactstrap";
import SingleFilter from "./single-filter";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
// ** Types
import type { Dispatch, SetStateAction } from "react";
import { breakpoints } from "@/hooks/use-window-dimension";
import Select from "@/components/input/select";
import MultiSelectFilter from "./single-filter";

export default function TopFilters({
  filters,
  loading,
  selectedFilters,
  setFilters,
}: TopFiltersProps) {
  return loading ? (
    <Row style={{ placeContent: "center" }}>
      <Spinner />
    </Row>
  ) : (
    <>
      <Swiper
        spaceBetween={50}
        breakpoints={{
          300: { slidesPerView: 3, spaceBetween: 5 },
          480: { slidesPerView: 3, spaceBetween: 5 },
          640: { slidesPerView: 4, spaceBetween: 10 },
          768: { slidesPerView: 4, spaceBetween: 10 },
          1024: { slidesPerView: 5, spaceBetween: 10 },
          1200: { slidesPerView: 6, spaceBetween: 10 },
        }}
      >
        {filters &&
          Object.keys(filters).map((filterKey, index) =>
            filterKey !== "kind" ? (
              <SwiperSlide>
                <div
                  key={index}
                  className="filter-top"
                  style={{ marginRight: "3px" }}
                >
                  <span>
                    {filterKey == "thickness"
                      ? "ضخامت"
                      : filterKey == "factory"
                      ? "کارخانه"
                      : filterKey == "freight_place"
                      ? "محل بار"
                      : filterKey == "width"
                      ? "عرض"
                      : filterKey == "size"
                      ? "سایز"
                      : filterKey == "standard"
                      ? "استاندارد"
                      : filterKey == "dimensionY"
                      ? "ابعادعرض"
                      : filterKey == "dimensionX"
                      ? "ابعادطول"
                      : filterKey == "length"
                      ? "طول"
                      : ""}
                  </span>
                  <Select
                    className="mb-0"
                    onChange={(e) => {
                      // @ts-ignore
                      const newValues = selectedFilters[filterKey + "Value"]
                        ? // @ts-ignore
                          [...selectedFilters[filterKey + "Value"]]
                        : [];
                      if (e >= 0) {
                        newValues.push(e);
                      }
                      setFilters(filterKey + "Value", newValues);
                    }}
                    placeholder={filters[filterKey].label}
                    options={[
                      {
                        label:
                          filterKey == "thickness"
                            ? " همه "
                            : filterKey == "factory"
                            ? "همه "
                            : filterKey == "freight_place"
                            ? " همه"
                            : filterKey == "width"
                            ? " همه "
                            : filterKey == "size"
                            ? "همه "
                            : filterKey == "standard"
                            ? "همه "
                            : filterKey == "dimensionY"
                            ? "ابعاد "
                            : filterKey == "dimensionX"
                            ? "ابعاد "
                            : filterKey == "length"
                            ? "همه"
                            : "",
                        value: "--",
                      },
                      ...filters[filterKey].filters.map((va) => {
                        return {
                          value: filterKey === "factory" ? va.slug : va.label,
                          label: va.label,
                        };
                      }),
                    ]}
                  />
                </div>
              </SwiperSlide>
            ) : null
          )}
      </Swiper>
    </>
  );
}

type SingleSelectedFilter = {
  label: string;
  value: string;
};

type TopFiltersProps = {
  filters: SearchFilters;
  loading: boolean;
  selectedFilters: {};
  setFilters: (name: any, value: any) => void;
};
