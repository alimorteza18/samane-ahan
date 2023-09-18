import { useEffect, useState } from "react";
import { Button, Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";
import { FaSearch, FaPlus, FaTrash, FaFilter } from "react-icons/fa";
import styles from "./styles.module.css";
import { KindProp, TypeProp } from "../../page-component";
import Tags from "../../breadcrumb/tags";
import { PRODUCT_TYPE_DETAILS } from "@/services/product-type-services";

interface MobileVerticalFilters {
  filters: SearchFilters;
  selectedFilters: {};
  setFilters: any;
  type: TypeProp;
  kind: KindProp | null;
  handleKindChange: any;
  handleTypeChange: any;
  className?: string | undefined;
}

const MobileVerticalFilters = ({
  filters,
  selectedFilters,
  setFilters,
  type,
  kind,
  handleKindChange,
  handleTypeChange,
  className,
}: MobileVerticalFilters) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  const [isFilterOpen, setFilterOpen] = useState({
    type: true,
    kind: false,
    size: false,
    factory: false,
    freight_place: false,
    standard: false,
    length: false,
    thickness: false,
    height: false,
    width: false,
    color: false,
    dimensionX: false,
    dimensionY: false,
  });

  const [tempFilters, setTempFilters] = useState(selectedFilters);
  useEffect(() => setTempFilters(selectedFilters), [selectedFilters]);

  const handleFilterChange = (name: string, value: any) => {
    if (!Array.isArray(value)) value = [value];
    setTempFilters((prev) => ({ ...prev, [name]: value }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Add event listener to handle scrolling and show/hide the button
  useEffect(() => {
    window.addEventListener("scroll", () => {});
    return () => window.removeEventListener("scroll", () => {});
  }, []);

  const handleFilter = () => {
    setFilters(tempFilters);
    setOpen(false);
    scrollToTop();
  };

  return (
    <>
      <Button
        className={`${styles.circleButton} ${className}`}
        onClick={() => setOpen(true)}
      >
        <FaFilter className={styles.icon} />
      </Button>
      <Offcanvas
        style={{ width: "80%" }}
        isOpen={open}
        scrollable
        toggle={toggle}
        direction="end"
        className="d-lg-none"
      >
        <OffcanvasHeader toggle={toggle}>جستجو</OffcanvasHeader>
        <OffcanvasBody>
          <div id="filterbar" className="collapse show">
            <div className="box border-bottom">
              {selectedFilters && Object.keys(selectedFilters).length > 0 ? (
                <div className="pt-10 d-flex mb-15">
                  <Tags
                    selectedFilters={selectedFilters}
                    filters={filters}
                    selectFilters={setFilters}
                    isSmall={true}
                    type={type}
                  />
                </div>
              ) : null}
            </div>

            {/* Types filters */}
            <div className="box border-bottom">
              <div
                className="box-label text-uppercase d-flex align-items-center"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setFilterOpen((prev) => ({
                    ...prev,
                    // @ts-ignore
                    [filterKey]: !prev[filterKey],
                  }));
                }}
              >
                مقطع
                <FaPlus className="mr-10" />
              </div>
              <div
                id="inner-box"
                className={`mt-2 mr-1 ${
                  // @ts-ignore
                  isFilterOpen?.type ? "show" : "collapse"
                }`}
              >
                {Object.keys(PRODUCT_TYPE_DETAILS).map((typeId: any, i) => (
                  <>
                    <div className="my-1">
                      <label
                        className="tick"
                        htmlFor={`filtercheck${i}-${PRODUCT_TYPE_DETAILS[typeId].label}`}
                      >
                        <i className={`icon icon-${typeId} ml-10`} />
                        {PRODUCT_TYPE_DETAILS[typeId].label}
                        <input
                          type="checkbox"
                          id={`filtercheck${i}-${PRODUCT_TYPE_DETAILS[typeId].label}`}
                          checked={typeId == type.id}
                          // @ts-ignore
                          value={PRODUCT_TYPE_DETAILS[typeId].label}
                          onChange={(e) => {
                            handleTypeChange(typeId);
                          }}
                        />
                        <span className="check" />
                      </label>
                    </div>
                  </>
                ))}
              </div>
            </div>
            {/* End of types filters */}
            {filters &&
              Object.keys(filters).map((filterKey, index) =>
                filterKey !== "kind" ? (
                  <div className="box border-bottom">
                    <div
                      className="box-label text-uppercase d-flex align-items-center"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setFilterOpen((prev) => ({
                          ...prev,
                          // @ts-ignore
                          [filterKey]: !prev[filterKey],
                        }));
                      }}
                    >
                      {filters[filterKey].label}
                      <FaPlus className="mr-10" />
                    </div>
                    <div
                      id="inner-box"
                      className={`mt-2 mr-1 ${
                        // @ts-ignore
                        isFilterOpen[filterKey] ? "show" : "collapse"
                      }`}
                    >
                      {filters[filterKey].filters.map((va, i) => (
                        <div className="my-1">
                          <label
                            className="tick"
                            htmlFor={`filtercheck${i}-${va.label}`}
                          >
                            {va?.label}
                            <input
                              type="checkbox"
                              id={`filtercheck${i}-${va.label}`}
                              // @ts-ignore
                              checked={tempFilters[
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
                                const newValues = tempFilters[
                                  filterKey + "Value"
                                ]
                                  ? // @ts-ignore
                                    [...tempFilters[filterKey + "Value"]]
                                  : [];

                                if (e.target.checked) {
                                  newValues.push(e.target.value);
                                } else {
                                  const targetIndex = newValues.findIndex(
                                    (item) => item === e.target.value
                                  );
                                  newValues.splice(targetIndex, 1);
                                }

                                handleFilterChange(
                                  filterKey + "Value",
                                  newValues
                                );
                              }}
                            />
                            <span className="check" />
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="box border-bottom">
                    <div
                      className="box-label text-uppercase d-flex align-items-center"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setFilterOpen((prev) => ({
                          ...prev,
                          // @ts-ignore
                          [filterKey]: !prev[filterKey],
                        }));
                      }}
                    >
                      {filters[filterKey].label}
                      <FaPlus className="mr-10" />
                    </div>
                    <div
                      id="inner-box"
                      className={`mt-2 mr-1 ${
                        // @ts-ignore
                        isFilterOpen[filterKey] ? "show" : "collapse"
                      }`}
                    >
                      {filters[filterKey].filters.map((va, i) => (
                        <div className="my-1">
                          <label
                            className="tick"
                            htmlFor={`filtercheck${i}-${va.label}`}
                          >
                            {va?.label}
                            <input
                              type="checkbox"
                              id={`filtercheck${i}-${va.label}`}
                              // @ts-ignore
                              checked={va.id === kind?.id}
                              // @ts-ignore
                              value={va.label}
                              onChange={(e) => {
                                // @ts-ignore
                                handleKindChange(va.id);
                              }}
                            />
                            <span className="check" />
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
          </div>
        </OffcanvasBody>

        <div className="p-10 d-flex">
          <Button
            color="warning"
            style={{ flexShrink: 0 }}
            onClick={() => {
              setFilters({});
              setTempFilters({});
            }}
          >
            <FaTrash className="mr-10" />
          </Button>
          <Button
            className="mr-5"
            style={{ flexGrow: 1 }}
            onClick={handleFilter}
          >
            جستجو
            <FaSearch className="mr-10" />
          </Button>
        </div>
      </Offcanvas>
    </>
  );
};

export default MobileVerticalFilters;
