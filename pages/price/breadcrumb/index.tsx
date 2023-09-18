import Link from "next/link";
import Tags from "./tags";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { KindProp, TypeProp } from "../page-component";
import useWindowDimensions from "@/hooks/use-window-dimension";
import { BreadcrumbJsonLd } from "next-seo";
import { getTypeMainFilter } from "@/services/product-type-services";
import { PRODUCT_KIND } from "@/services/product-kind-services";

export default function Breadcrumb({
  selectedFilters,
  filters,
  selectFilters,
  type,
  kind,
  className,
}: BreadCrumbProps) {
  const { isMobile } = useWindowDimensions();

  const getTitle = (): string => {
    let result = "دسته‌بندی";
    if (type) {
      result = type.label;
      if (kind && kind && kind.id != PRODUCT_KIND.CAN_COMMON)
        result = result + " " + kind.label;

      // if (size) result = result + " " + size;
    }
    return result;
  };

  const [size, setSize] = useState<string | null>(null);
  const [factory, setFactory] = useState<string | null>(null);

  useEffect(() => {
    const mainFilter = getTypeMainFilter(type.id);

    if (selectedFilters[mainFilter] && selectedFilters[mainFilter].length)
      setSize(selectedFilters[mainFilter][0]);

    if (
      selectedFilters?.dimensionXValue &&
      selectedFilters?.dimensionXValue.length &&
      selectedFilters?.dimensionYValue &&
      selectedFilters?.dimensionYValue.length
    ) {
      const x = selectedFilters?.dimensionXValue[0];
      const y = selectedFilters?.dimensionYValue[0];
      setSize(`${x}*${y}`);
    }

    if (selectedFilters?.factoryValue && selectedFilters?.factoryValue.length) {
      setFactory(selectedFilters?.factoryValue[0]);
    }
  }, [selectedFilters]);

  const getBreadcrumbItems = () => {
    const siteUrl = process.env.SITE_URL || "https://samaneahan.com";

    let size: string | boolean = false;
    let x: string | boolean = false;
    let y: string | boolean = false;

    let factory: string | boolean = false;

    const mainFilter = getTypeMainFilter(type.id);

    if (selectedFilters[mainFilter] && selectedFilters[mainFilter].length) {
      size = selectedFilters[mainFilter][0];
    }

    if (
      selectedFilters?.dimensionXValue &&
      selectedFilters?.dimensionXValue.length &&
      selectedFilters?.dimensionYValue &&
      selectedFilters?.dimensionYValue.length
    ) {
      x = selectedFilters?.dimensionXValue[0];
      y = selectedFilters?.dimensionYValue[0];
    }

    if (selectedFilters?.factoryValue && selectedFilters?.factoryValue.length) {
      factory = selectedFilters?.factoryValue[0];
    }

    const results: Array<any> = [
      {
        position: 1,
        name: "price",
        item: `${siteUrl}/price`,
      },
    ];

    if (type) {
      results.push({
        position: 2,
        name: "price/type_kind_size",
        item: `${siteUrl}/price/${type.enLabel}${
          kind ? "-" + kind.enLabel : ""
        }${size ? "-" + size : ""}${x && y ? "-" + `${x}*${y}` : ""}`,
      });
    }

    if (factory) {
      results.push({
        position: 3,
        name: "price/type_kind_size/factory",
        item: `${siteUrl}/price/${type.enLabel}${
          kind ? "-" + kind.enLabel : ""
        }${size ? "-" + size : ""}${x && y ? "-" + `${x}*${y}` : ""}${
          factory ? "/" + factory : ""
        }`,
      });
    }

    return results;
  };

  const getFactoryFaLabel = () => {
    if (factory) {
      const result = filters?.factory.filters.find(
        (item) => item.slug === factory
      );
      return result ? result.label : factory;
    }

    return null;
  };

  return (
    <>
      <BreadcrumbJsonLd itemListElements={getBreadcrumbItems()} />
      <div className={`page-header mt-30 mb-50 ${className}`}>
        <div className="container">
          <div className="archive-header">
            <div className="row align-items-center">
              <div className="col-xl-4">
                <h1
                  className="mb-15"
                  style={{ fontSize: isMobile ? "25px" : "48px" }}
                >
                  {getTitle()}
                </h1>
                <div className="breadcrumb">
                  <Link legacyBehavior href="/">
                    <a rel="nofollow">
                      <i className="fi-rs-home mr-5"></i>خانه
                    </a>
                  </Link>
                  <span /> صورت بار <span /> {getTitle()}{" "}
                  {factory ? <span /> : null}{" "}
                  {factory ? getFactoryFaLabel() : null}
                </div>
              </div>
              <div className="col-xl-8 text-end d-none d-xl-block">
                <Tags
                  selectedFilters={selectedFilters}
                  filters={filters}
                  selectFilters={selectFilters}
                  isSmall={false}
                  type={type}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

type BreadCrumbProps = {
  selectedFilters: any;
  filters: SearchFilters | undefined;
  selectFilters: Dispatch<SetStateAction<{}>>;
  type: TypeProp;
  kind: KindProp | null;
  size?: any | null;
  factory?: string | null;
  className?: string | undefined;
};
