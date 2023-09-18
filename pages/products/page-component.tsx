// ** Hooks
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useHttp from "@/hooks/use-http";
// ** Partials
import KindsHorizontal from "./filters/kinds-horizontal";
import TypeHorizontal from "./filters/types-horizontal";
import KindsPage from "./kinds-page";
import Tables from "./tables";
// ** Components
import { Container, ProgressBar, Col, Row } from "react-bootstrap";
// ** Services
import { extractPricePageParamsFromUrl } from "./service";
import { fetchGroupedProducts, fetchProductSearchFilters } from "@/services/product-services"; // prettier-ignore
import { getTypeMainFilter, PRODUCT_TYPE, PRODUCT_TYPE_DETAILS } from "@/services/product-type-services"; // prettier-ignore
import {  PRODUCT_KIND_DETAILS } from "@/services/product-kind-services"; // prettier-ignore
import { GetServerSideProps } from "next";
import { FetchProductsProps } from "@/types/services";
import { RawData } from "@/types";

const PageComponent = (props: ProductsPageProps) => {
  const router = useRouter();

  /**
   * @description type, kind and other filters states
   */
  const [type, setType] = useState<TypeProp>(props.initialType); // prettier-ignore
  const [kind, setKind] = useState<KindProp | null>(props.initialKind); // prettier-ignore
  const [selectedFilters, setFilters] = useState<{[key: string]: string | string[];}>(props.initialSelectedFilters ?? {}); // prettier-ignore

  /**
   * @description getting products
   */
  const { data, setData, loading, setSingleFieldValue } = useHttp<
    GroupedProduct[]
  >(fetchGroupedProducts, {
    initialState: props.initialProducts,
    type_id: type?.id,
    kind_id: kind?.id ?? null,
    per_page: 400,
    order: "created_at",
    includes: [
      {
        name: "userVendor",
        fields: ["id", "name", "vendor_profile_img", "category"],
      },
    ],
    ...selectedFilters,
  });

  /**
   * @description getting search filters
   */
  const { data: filters, loading: filtersLoading } = useHttp<SearchFilters>(
    fetchProductSearchFilters,
    {
      type_id: type.id,
      kind_id: kind?.id,
      initialState: props.initialSearchFilters,
    }
  );

  /**
   * @description set type and also set default kind of that type
   * @param typeId
   * @returns void
   */
  const handleTypeChange = (typeId: any): void => {
    setType(PRODUCT_TYPE_DETAILS[typeId]);
    if (PRODUCT_TYPE_DETAILS[typeId]?.defaultKind)
      //@ts-ignore
      setKind(PRODUCT_TYPE_DETAILS[typeId]?.defaultKind);
    else setKind(null);
    setFilters({});
  };

  /**
   * @description set kind
   * @param kindId
   * @returns void
   */
  const handleKindChange = (kindId: any): void => {
    setKind(PRODUCT_KIND_DETAILS[kindId]);
    setFilters({});
  };

  /**
   * @description append a given filter to selectedFilters
   * @param name
   * @param value
   * @returns void
   */
  const handleFilterChange = (name: string, value: any) => {
    if (!Array.isArray(value)) value = [value];
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * @description Update Url when changing type, kind, ...
   */
  useEffect(() => {
    let size: string | boolean = false;
    let x,
      y: string | boolean = false;

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

    router.push(
      {
        pathname: `/products/${type.enLabel}${kind ? "-" + kind.enLabel : ""}${
          size ? "-" + size : ""
        }${x && y ? "-" + `${x}*${y}` : ""}${factory ? "/" + factory : ""}`,
        query: selectedFilters,
      },
      undefined,
      { shallow: true }
    );
  }, [type, kind, selectedFilters]);

  const getFactoryForMetaTags = () => {
    const enLabel =
      selectedFilters?.factoryValue && selectedFilters?.factoryValue[0]
        ? selectedFilters?.factoryValue[0]
        : null;

    const result = filters?.factory.filters.find(
      (item) => item.slug === enLabel
    );

    if (enLabel && result) return result.label;
    else return "";
  };

  const getSizeForMetaTags = () => {
    return selectedFilters[getTypeMainFilter(type?.id)] &&
      selectedFilters[getTypeMainFilter(type?.id)]?.length
      ? selectedFilters[getTypeMainFilter(type?.id)][0]
      : selectedFilters?.dimensionXValue &&
        selectedFilters?.dimensionXValue?.length &&
        selectedFilters?.dimensionYValue &&
        selectedFilters?.dimensionYValue?.length
      ? `${selectedFilters?.dimensionXValue[0]}*${selectedFilters?.dimensionYValue[0]}`
      : "";
  };

  // /**
  //  * @description this is for when user is in this page and clicks on main navbar dropdown menu links
  //  */
  // useEffect(() => {
  //   const { type, kind, size, x, y } = extractPricePageParamsFromUrl(
  //     router.query
  //   );

  /**
   * @description this is for when user is in this page and clicks on main navbar dropdown menu links
   */
  useEffect(() => {
    const {
      type: extractedType,
      kind: extractedKind,
      factory,
      size,
      x,
      y,
    } = extractPricePageParamsFromUrl(router.query);

    if (extractedType) {
      if (type !== extractedType) setFilters({});

      setType(extractedType);
      if (extractedKind && extractedType.id !== PRODUCT_TYPE.CORNER) {
        setKind(extractedKind);
      } else {
        setKind(null);
      }

      if (size) handleFilterChange(getTypeMainFilter(extractedType.id), size);
      if (x) handleFilterChange("dimensionXValue", x);
      if (y) handleFilterChange("dimensionYValue", y);
      if (factory) handleFilterChange("factoryValue", factory);
    }
  }, [router.query.type_kind_size]);

  return props.component === "products" ? (
    <>
      <TypeHorizontal type={type} setType={handleTypeChange} />

      <KindsHorizontal
        filters={filters}
        loading={filtersLoading}
        type={type}
        kind={kind}
        setKind={handleKindChange}
      />

      <section className="mb-50">
        <Container className="mb-30">
          <Row style={{ justifyContent: "center" }}>
            <Col lg={9}>
              {loading ? (
                <Row style={{ placeContent: "center" }}>
                  <ProgressBar animated now={100} />
                </Row>
              ) : (
                <Tables
                  data={data}
                  kind={kind}
                  type={type}
                  selectedFilters={selectedFilters}
                  setData={setData}
                  setSingleFieldValue={setSingleFieldValue}
                />
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  ) : (
    <KindsPage type={props.initialType} />
  );
};

export const getProductsAndFilters: GetServerSideProps = async (ctx) => {
  const { type, kind, size, x, y, factory, component } =
    extractPricePageParamsFromUrl(ctx.query);

  const per_page = 400;

  // ** getting search filters
  const searchFilters = await fetchProductSearchFilters({
    type_id: type?.id,
    kind_id: kind?.id,
  });

  const productsParams: FetchProductsProps = {
    type_id: type?.id,
    kind_id: kind?.id ?? null,
    per_page: per_page,
    order: "created_at",
    includes: [
      {
        name: "userVendor",
        fields: ["id", "name", "vendor_profile_img", "category"],
      },
    ],
  };

  const mainFilter = getTypeMainFilter(type?.id);

  if (size) productsParams[mainFilter] = size.toString();
  else if (x && y) {
    productsParams.dimensionXValue = x.toString();
    productsParams.dimensionYValue = y.toString();
  }

  if (factory) {
    productsParams.factoryValue = factory;
  }

  // ** getting products
  const groupedProducts = await fetchGroupedProducts(productsParams);

  let initialSelectedFilters: { [key: string]: string | string[] } = {};

  if (size) {
    initialSelectedFilters[mainFilter] = [size];
  } else if (x && y) {
    initialSelectedFilters.dimensionXValue = [x.toString()];
    initialSelectedFilters.dimensionYValue = [y.toString()];
  }

  if (factory) {
    initialSelectedFilters.factoryValue = [factory];
  }

  const getFactoryForMetaTags = () => {
    const result = searchFilters?.data?.data?.factory?.filters?.find(
      (item) => item.slug === factory
    );

    if (factory && result) return result.label;
    else return "";
  };

  return {
    props: {
      component,
      initialType: type,
      initialKind: kind ?? null,
      initialProducts: groupedProducts.data,
      initialSearchFilters: searchFilters.data,
      initialSelectedFilters,
    },
  };
};

export interface ProductsPageProps {
  component: "products" | "kinds";
  initialType: TypeProp;
  initialKind: TypeProp | null;
  initialProducts: RawData<GroupedProduct[]>;
  initialSearchFilters: any;
  initialSelectedFilters: { [key: string]: string | string[] };
}

export interface TypeProp {
  id: number;
  label: string;
  enLabel: string;
  defaultKind?: KindProp;
}

export interface KindProp {
  id: number;
  label: string;
  enLabel: string;
}
export default PageComponent;
