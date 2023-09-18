import Accordion from "react-bootstrap/Accordion";
import { useCallback, useEffect, useState } from "react";
import Tags from "../../breadcrumb/tags";
import { TypeProp } from "../../page-component";
const FiltersVertical = ({
  filters,
  selectedFilters,
  setFilter,
  selectFilters,
  type,
}: VerticalFiltersProps) => {
  const index = ["0"];
  useEffect(() => {
    Object.keys(selectedFilters).forEach((key) => {
      if (key === "freight_placeValue" && !index.includes("1")) index.push("1");
      else if (key === "factoryValue" && !index.includes("2")) index.push("2");
      else if (key === "sizeValue" && !index.includes("3")) index.push("3");
      else if (key === "standardValue" && !index.includes("4")) index.push("4");
      else if (key === "weight_scaleValue" && !index.includes("5"))
        index.push("5");
    });
  }, [selectedFilters]);
  const [input, setInput] = useState("");
  const handleInput = useCallback((e: any) => {
    if (e.key == "Enter") {
      e.preventDefault();
      setInput(e.target.value);
    }
  }, []);

  return (
    <>
      <div className="header-filter">
        <span>فیلتر</span>
        <span style={{ color: "red" }}>حذف فیلتر</span>
      </div>
      {selectedFilters && Object.keys(selectedFilters).length > 0 ? (
        <>
          <div className="pt-10 d-flex mb-15">
            <Tags
              selectedFilters={selectedFilters}
              filters={filters}
              selectFilters={selectFilters}
              isSmall={true}
              type={type}
            />
          </div>
          <hr
            style={{
              margin: "0px 10px",
              color: "gray",
              border: "1px solid gray",
            }}
          />
        </>
      ) : null}
      <Accordion defaultActiveKey={index} alwaysOpen>
        {filters &&
          Object.keys(filters).map((filterKey, index) =>
            filterKey !== "kind" ? (
              <Accordion.Item
                eventKey={index.toString()}
                key={`${filterKey}-${index}`}
              >
                <Accordion.Header className="price-side-filter-item">
                  {filters[filterKey].label}
                </Accordion.Header>
                <hr style={{ margin: "0px 10px", color: "gray" }} />

                <Accordion.Body
                  style={{
                    position: "relative",
                    zIndex: "100",
                    height:
                      filterKey == "factory" ||
                      filterKey == "freight_place" ||
                      filterKey == "size"
                        ? "250px"
                        : "null",
                    overflowY:
                      filterKey == "factory" ||
                      filterKey == "freight_place" ||
                      filterKey == "size"
                        ? "scroll"
                        : "visible",
                  }}
                >
                  {filterKey == "factory" || filterKey == "freight_place" ? (
                    <input
                      type="text"
                      style={{ fontSize: "14px", height: "54px" }}
                      onKeyDown={handleInput}
                      placeholder="جستجو در فیلترها"
                      className="mb-15"
                    />
                  ) : null}
                  {filters[filterKey].filters.map((va, i) => (
                    <div key={`${filterKey}-child-${i}`} className="mb-20">
                      {va.label.includes(input) ? (
                        <>
                          <div className="custome-checkbox text-end">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`filtercheck${i}-${va.label}`}
                              style={{ width: "auto" }}
                              // @ts-ignore
                              checked={selectedFilters[
                                filterKey + "Value"
                              ]?.includes(
                                filterKey === "factory" ? va.slug : va.label
                              )}
                              // @ts-ignore
                              value={
                                filterKey === "factory" ? va.slug : va.label
                              }
                              onChange={(e) => {
                                // @ts-ignore
                                const newValues = selectedFilters[
                                  filterKey + "Value"
                                ]
                                  ? // @ts-ignore
                                    [...selectedFilters[filterKey + "Value"]]
                                  : [];

                                if (e.target.checked) {
                                  newValues.push(e.target.value);
                                } else {
                                  const targetIndex = newValues.findIndex(
                                    (item) => item === e.target.value
                                  );
                                  newValues.splice(targetIndex, 1);
                                }

                                setFilter(filterKey + "Value", newValues);
                              }}
                            />
                            <label
                              className="form-check-label mr-15"
                              htmlFor={`filtercheck${i}-${va.label}`}
                              key={`${filterKey}-label-${i}-${va.label}`}
                              style={{ fontSize: "16px", fontWeight: "400" }}
                            >
                              {va?.label}
                            </label>
                          </div>
                        </>
                      ) : null}
                    </div>
                  ))}
                </Accordion.Body>
                {Object.keys(filters).length - 1 !== index ? (
                  <hr style={{ margin: "0px 10px", color: "gray" }} />
                ) : null}
              </Accordion.Item>
            ) : null
          )}
      </Accordion>
    </>
  );
};

type VerticalFiltersProps = {
  filters: SearchFilters;
  loading: boolean;
  selectedFilters: {};
  setFilter: (name: any, value: any) => void;
  selectFilters: any;
  type: TypeProp;
};

export default FiltersVertical;
