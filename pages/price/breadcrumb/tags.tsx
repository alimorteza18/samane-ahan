import { getTypeMainFilter } from "@/services/product-type-services";
import type { Dispatch, SetStateAction } from "react";
import { TypeProp } from "../page-component";

export default function Tags({
  selectedFilters,
  filters,
  type,
  selectFilters,
  isSmall = false,
}: TagsProps) {
  /**
   * @description if params are provided like size_id or sizeValue, this function removes _id or Value and return farsi label
   * @param name
   * @example sizeValue => سایز
   * @returns string
   */
  const getFilterName = (name: string): string => {
    let filterName = name.replace("_id", "").replace("Value", "");
    return filters ? filters[filterName]?.label : "";
  };

  const getFilterValue = (name: string, value: string): string => {
    if (name === "factoryValue") {
      const result = filters?.factory.filters.find(
        (item) => item.slug === value
      );
      return result ? result.label : value;
    } else {
      return value;
    }
  };

  /**
   * @description factory and type main filters are important
   * @returns {boolean}
   */
  const isImportantParam = (name: string) => {
    if (name === "factoryValue") return true;
    if (name === getTypeMainFilter(type.id)) return true;

    return false;
  };

  const handleRemoveFilters = (item: string, targetFilter: SingleFilter) => {
    selectFilters((prev) => {
      return {
        ...prev,
        [item]: selectedFilters[item].filter(
          (item: SingleFilter) => item != targetFilter
        ),
      };
    });
  };

  return (
    <>
      <ul className="tags-list pr-5 pl-5">
        {Object.keys(selectedFilters).map((item) => {
          return selectedFilters[item].map((filter, j) => {
            return (
              <li
                onClick={() => handleRemoveFilters(item, filter)}
                className="hover-up mb-5"
                key={j}
                style={{
                  margin: isSmall ? "0" : "0 15px 0 0",
                  color: "#4F4F4F",
                }}
              >
                {isSmall ? (
                  <a
                    className={"cat-item"}
                    style={{
                      padding: "3px 7px",
                      fontSize: "14px",
                      backgroundColor: "#F4F4F4",
                      color: "#4F4F4F",
                      borderRadius: "27px",
                    }}
                  >
                    <>
                      <i className="fi-rs-cross mr-5" />
                      {/* @ts-ignore */}
                      {getFilterName(item)} : {getFilterValue(item, filter)}
                    </>
                  </a>
                ) : (
                  <a>
                    <span
                      className={"cat-item text-brand d-flex"}
                      style={{ alignItems: "center" }}
                    >
                      <i className="fi-rs-cross mr-10" />
                      {isImportantParam(item) ? (
                        <h4 className="text-brand">
                          {/* @ts-ignore */}
                          {getFilterName(item)} : {getFilterValue(item, filter)}
                        </h4>
                      ) : (
                        <h5 className="text-brand">
                          {/* @ts-ignore */}
                          {getFilterName(item)} : {getFilterValue(item, filter)}
                        </h5>
                      )}
                      {/* @ts-ignore */}
                    </span>
                  </a>
                )}
              </li>
            );
          });
        })}
      </ul>
    </>
  );
}

type SingleFilter = {
  label: string;
  value: string;
};

type TagsProps = {
  selectedFilters: {
    [key: string]: SingleFilter[];
  };
  filters: SearchFilters | undefined;
  selectFilters: Dispatch<SetStateAction<{}>>;
  type: TypeProp;
  isSmall?: boolean;
};
