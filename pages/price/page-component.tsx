import dynamic from "next/dynamic";
// ** Hooks
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useHttp from "@/hooks/use-http";
import useMetaTags from "@/hooks/use-meta-tags";
// ** Partials
const KindsHorizontal = dynamic(() => import("./filters/kinds-horizontal"));
const TypeHorizontal = dynamic(() => import("./filters/types-horizontal"));
const FiltersVertical = dynamic(() => import("./filters/side-filters"));
const KindsPage = dynamic(() => import("./kinds-page"));
const BreadCrumb = dynamic(() => import("./breadcrumb"));
const Tables = dynamic(() => import("./tables"));
const MobileVerticalFilters = dynamic(() => import("./filters/mobile-vertical-filters")); //prettier-ignore
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
import { getMetaTags } from "@/services/meta-tags-services";
import LazyLoad from "react-lazyload";
import { NextSeo } from "next-seo";
import { ProductJsonLd } from "next-seo";
import { fetchOverviews, findSingleField } from "@/services/util-service";
import Desc from "./Desc";

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
        pathname: `/price/${type.enLabel}${kind ? "-" + kind.enLabel : ""}${
          size ? "-" + size : ""
        }${x && y ? "-" + `${x}*${y}` : ""}${factory ? "/" + factory : ""}`,
        // query: selectedFilters,
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

  const { title: pageTitle, description: pageDescription } = useMetaTags({
    initialValues: props.initialTitleAndDesc,
    page: "price",
    typeId: type.id,
    kindId: kind?.id,
    factory: getFactoryForMetaTags(),
    size: getSizeForMetaTags(),
  });

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

      const typeMainFilter = getTypeMainFilter(extractedType.id);

      const sizeFilters = selectedFilters[typeMainFilter] ?? [];
      if (size && sizeFilters?.length && !sizeFilters.includes(size))
        // @ts-ignore
        sizeFilters.push(size);
      else if (size && !sizeFilters?.length)
        // @ts-ignore
        sizeFilters.push(size);

      if (sizeFilters?.length) handleFilterChange(typeMainFilter, sizeFilters);

      if (x) handleFilterChange("dimensionXValue", x);
      if (y) handleFilterChange("dimensionYValue", y);

      const factoryFilters = selectedFilters?.factoryValue;
      if (factory && factoryFilters.length && !factoryFilters.includes(factory))
        // @ts-ignore
        factoryFilters.push(factory);
      if (factoryFilters?.length)
        handleFilterChange("factoryValue", factoryFilters);
    }
  }, [router.query.type_kind_size]);

  const getPageFullTitle = () => {
    let results = "";

    results += type.label + " ";

    if (kind) results += kind.label + " ";

    let x: string | boolean = false;
    let y: string | boolean = false;

    let factory: string | boolean = false;

    const mainFilter = getTypeMainFilter(type.id);

    if (selectedFilters[mainFilter] && selectedFilters[mainFilter].length)
      results += selectedFilters[mainFilter][0] + " ";

    if (
      selectedFilters?.dimensionXValue &&
      selectedFilters?.dimensionXValue.length &&
      selectedFilters?.dimensionYValue &&
      selectedFilters?.dimensionYValue.length
    ) {
      x = selectedFilters?.dimensionXValue[0];
      y = selectedFilters?.dimensionYValue[0];
      results += x + "*" + y + " ";
    }

    if (selectedFilters?.factoryValue && selectedFilters?.factoryValue.length) {
      factory = selectedFilters?.factoryValue[0];

      const result = filters?.factory.filters.find(
        (item) => item.slug === factory
      );
      results += result ? result.label : factory;
    }

    return results;
  };

  return props.component === "products" ? (
    <>
      <NextSeo
        title={pageTitle}
        description={pageDescription}
        canonical={`${process.env.SITE_URL}/price/${type.enLabel}${
          kind ? "-" + kind.enLabel : ""
        }`}
      />

      {/* {props.initialOverviews?.data?.length ?} */}

      <ProductJsonLd
        productName={getPageFullTitle()}
        offers={{
          url: `${process.env.SITE_URL}${router.asPath}`,
          priceCurrency: "IRR",
          highPrice: props.initialOverviews?.highest?.vendor_price ?? null,
          lowPrice: props.initialOverviews?.lowest?.vendor_price ?? null,
        }}
      />

      <BreadCrumb
        selectedFilters={selectedFilters}
        selectFilters={setFilters}
        filters={filters}
        type={type}
        kind={kind}
        className="d-none d-lg-block"
      />

      <TypeHorizontal
        type={type}
        setType={handleTypeChange}
        className="d-none d-lg-block"
      />

      <KindsHorizontal
        filters={filters}
        loading={filtersLoading}
        type={type}
        kind={kind}
        setKind={handleKindChange}
        className="d-none d-lg-block"
      />

      <MobileVerticalFilters
        filters={filters}
        selectedFilters={selectedFilters}
        setFilters={setFilters}
        handleTypeChange={handleTypeChange}
        type={type}
        kind={kind}
        handleKindChange={handleKindChange}
        className="d-lg-none"
      />

      <section className="mb-50 mt-10">
        <Container className="mb-30">
          <Row>
            <Col lg={3}>
              <aside
                style={{
                  position: "sticky",
                  top: "80px",
                }}
              >
                <div
                  className="mb-30 text-center d-none d-lg-block"
                  style={{ border: "1px solid #dddddd", borderRadius: "8px" }}
                >
                  <LazyLoad once>
                    <FiltersVertical
                      filters={filters}
                      loading={filtersLoading}
                      selectedFilters={selectedFilters}
                      setFilter={handleFilterChange}
                      selectFilters={setFilters}
                      type={type}
                    />
                  </LazyLoad>
                </div>
                <LazyLoad once>
                  <img
                    src="/assets/imgs/advertizing/gif1.gif"
                    className="price-fooladium-banner-container"
                  />
                </LazyLoad>
              </aside>
            </Col>

            <Col lg={9}>
              {loading ? (
                <Row className="justify-content-center">
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

              <Desc category={type.enLabel} />
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

  const per_page = 250;

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

  const overviewQuery = `${type?.id}${kind ? "-" + kind.id : null}${
    size ? "-" + size : null
  }${factory ? "-" + factory : null}`;

  const queryDesc: Array<string> = [
    `${overviewQuery}-lowest_price`,
    `${overviewQuery}-highest_price`,
  ];

  const overviews = await fetchOverviews({
    fields: ["query_desc", "query_object", "query_result"],
    updatedAt: new Date().toISOString().slice(0, 10),
    queryDesc: `${type?.id}${kind ? "-" + kind.id : null}${
      size ? "-" + size : null
    }${factory ? "-" + factory : null}`,
    order: "updated_at",
    per_page: 500,
  });

  const boxes: { lowest: Product | null; highest: Product | null } = {
    lowest: null,
    highest: null,
  };

  queryDesc.map((item) => {
    boxes.lowest = findSingleField({data: overviews.data.data, want: "query_result", findBy: "query_desc", value: `${overviewQuery}-lowest_price` }); //prettier-ignore
    boxes.highest = findSingleField({data: overviews.data.data, want: "query_result", findBy: "query_desc", value: `${overviewQuery}-highest_price` }); //prettier-ignore
  });

  return {
    props: {
      component,
      initialType: type,
      initialKind: kind ?? null,
      initialProducts: groupedProducts.data,
      initialOverviews: boxes,
      initialSearchFilters: searchFilters.data,
      initialSelectedFilters,
      initialTitleAndDesc: getMetaTags({
        page: "price",
        typeId: type?.id,
        kindId: kind?.id,
        factory: getFactoryForMetaTags(),
        size: size ? size : x && y ? `${x.toString()}*${y.toString()}` : null,
      }),
    },
  };
};

export interface ProductsPageProps {
  component: "products" | "kinds";
  initialType: TypeProp;
  initialKind: TypeProp | null;
  initialProducts: RawData<GroupedProduct[]>;
  initialOverviews: { lowest: Product; highest: Product };
  initialSearchFilters: any;
  initialSelectedFilters: { [key: string]: string | string[] };
  initialTitleAndDesc: { title: string; description: string };
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
