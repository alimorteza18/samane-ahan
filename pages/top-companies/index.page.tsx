// ** Hooks
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useHttp from "@/hooks/use-http";
import useMetaTags from "@/hooks/use-meta-tags";
// ** Components
import { Col, Container, Row } from "reactstrap";
import { ProgressBar } from "react-bootstrap";
import Pagination from "@/components/elements/pagination";
import FilterDropdown from "@/components/input/filter-dropdown";
// ** Partials
// ** Services
import { fetchProvinces, fetchTopVendors } from "@/services/vendor-services";
import type { GetServerSideProps } from "next";
import { fetchProductTypes } from "@/services/product-type-services";
import { RawData } from "@/types";
import { getMetaTags } from "@/services/meta-tags-services";
import SellerCart from "./seller-cart";
import FactoryCart from "./factory-cart";
import CustomerCart from "./customer-cart";
import LazyLoad from "react-lazyload";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { NextSeo } from "next-seo";

const TopCompanies = (props: TopCompaniesType) => {
  const router = useRouter();

  const [vendorCatParam, setVendorCatParam] = useState<
    "all" | "vendor" | "factory" | "consumer" | "freight"
  >(props.initialCategory);
  const [nameParam, setNameParam] = useState("");
  const [province, setProvince] = useState("");
  const [type, setType] = useState("");

  const category = props.initialCategory;
  const title =
    vendorCatParam == "vendor"
      ? "فروشندگان"
      : vendorCatParam == "factory"
      ? "تولیدکنندگان"
      : vendorCatParam == "consumer"
      ? "مصرف کننده‌گان"
      : vendorCatParam == "freight"
      ? "باربری"
      : "";

  const advertising_vendor = [
    { id: 981, category: "vendor", href: "banner1.jpg" },
    { id: 6668, category: "vendor", href: "banner2.jpg" },
    { id: 1282, category: "vendor", href: "banner3.jpg" },
    { id: 6661, category: "vendor", href: "banner4.jpg" },
    { id: 3592, category: "vendor", href: "banner-v-3592.jpg" },
    { id: 1428, category: "vendor", href: "banner-v-5.jpg" },
    { id: 5211, category: "vendor", href: "banner-v-6.jpg" },
    { id: 6726, category: "vendor", href: "banner-v-7.jpg" },
    { id: 930, category: "vendor", href: "banner-v-8.jpg" },
    { id: 5161, category: "vendor", href: "banner-v-9.jpg" },
    { id: 1025, category: "vendor", href: "banner-v-1025.jpg" },
  ];
  const advertising_factory = [
    { id: 6739, category: "factory", href: "adv-6739.jpeg" },
    { id: 6716, category: "factory", href: "banner-f-1.jpg" },
    { id: 6725, category: "factory", href: "banner-f-2.jpg" },
    { id: 5166, category: "factory", href: "banner-f-3.jpg" },
    { id: 423, category: "factory", href: "adv-423.jpeg" },
    { id: 1254, category: "factory", href: "adv-1254.jpeg" },
  ];

  const advertising_botton = [
    { id: 952, href: "adv-1.jpeg" },
    { id: 1302, href: "adv-3.jpeg" },
    { id: 1288, href: "adv-2.jpeg" },
    { id: 981, href: "adv-4.jpeg" },
    { id: 781, href: "adv-781.jpeg" },
    { id: 1131, href: "adv-1131.jpeg" },
    { id: 1138, href: "adv-1138.jpeg" },
    { id: 1367, href: "adv-1367.gif" },
    { id: 1619, href: "adv-1619.jpeg" },
    { id: 1520, href: "adv-1520.jpeg" },
    { id: 1025, href: "banner-v-1025.jpg" },
    { id: 1, href: "gif3.gif" },
    { id: 1, href: "gif1.gif" },
  ];

  const {
    data,
    rawData,
    loading,
    pagination: { page, perPage, changePage, changePerPage },
  } = useHttp<UserVendor[]>(fetchTopVendors, {
    per_page: props.initialPerPage,
    page: props.initialPage,
    vendor_name: nameParam,
    province_id: province,
    product_type_ids: type,
    category: vendorCatParam !== "all" ? vendorCatParam : null,
    initialState: props.initialData,
  });

  const { dropdown } = useHttp(
    fetchProvinces,
    { dropdownEmptyItem: { label: "همه", value: "--" } },
    true
  );
  const { dropdown: dropType } = useHttp(
    fetchProductTypes,
    { dropdownEmptyItem: { label: "همه", value: "--" } },
    true
  );

  const handlePageChange = (page: number) => {
    changePage(page);

    router.push(
      {
        pathname: `/top-companies`,
        query: { ...router.query, category, page },
      },
      undefined,
      { shallow: true }
    );
  };

  const handleChangeCategory = (
    category: "all" | "vendor" | "factory" | "consumer"
  ) => {
    router.push({
      pathname: `/top-companies`,
      query: { ...router.query, category },
    });
    handlePageChange(1);
  };
  const handleChangeProvice = (province: string) => {
    router.push({
      pathname: `/top-companies`,
      query: { ...router.query, province },
    });
    handlePageChange(1);
  };

  const handleChangeType = (type: string) => {
    router.push({
      pathname: `top-companies`,
      query: { ...router.query, type },
    });
    handlePageChange(1);
  };
  useEffect(() => {
    const category = router.query?.category
      ? router.query?.category.toString()
      : "";
    // @ts-ignore
    setVendorCatParam(category);
  }, [router.query.category]);

  useEffect(() => {
    const province = router.query?.province
      ? router.query?.province.toString()
      : "";
    setProvince(province);
  }, [router.query.province]);

  useEffect(() => {
    const type = router.query?.type ? router.query?.type.toString() : "";
    setType(type);
  }, [router.query.type]);

  const { title: pageTitle, description: pageDescription } = useMetaTags({
    page: "top-companies",
    //@ts-ignore
    vandorCategory: vendorCatParam,
    initialValues: props.initialTitleAndDesc,
  });

  return (
    <>
      <NextSeo
        canonical={`${process.env.SITE_URL}/top-companies`}
        title={pageTitle}
        description={pageDescription}
      />
      <Container>
        <Row>
          <Col lg={12}>
            <div
              className="title-company mt-20 mb-20 d-flex"
              style={{ justifyContent: "center" }}
            >
              <h1
                style={{
                  fontSize: "32px",
                  lineHeight: "58px",
                  fontWeight: "700",
                }}
              >
                {title}
              </h1>
            </div>
          </Col>
        </Row>
        <section>
          <Row style={{ justifyContent: "center" }}>
            <Col lg={5} xs={12}>
              <div className="search-form">
                <form onSubmit={(e) => e.preventDefault()}>
                  <input
                    value={nameParam}
                    onChange={(e) => setNameParam(e.target.value)}
                    placeholder="جستجو بر اساس نام بنگاه یا نام مدیر بنگاه ..."
                  />
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.0342 0C18.394 0 23.5672 5.17315 23.5672 11.533C23.5672 14.5335 22.4157 17.2702 20.5313 19.3241L24.2392 23.0242C24.5862 23.3712 24.5873 23.9326 24.2403 24.2796C24.0674 24.4548 23.8388 24.5413 23.6115 24.5413C23.3853 24.5413 23.1579 24.4548 22.9838 24.2819L19.2312 20.5398C17.2571 22.1207 14.7542 23.0672 12.0342 23.0672C5.67433 23.0672 0.5 17.8928 0.5 11.533C0.5 5.17315 5.67433 0 12.0342 0ZM12.0342 1.77649C6.65377 1.77649 2.27649 6.15259 2.27649 11.533C2.27649 16.9134 6.65377 21.2907 12.0342 21.2907C17.4134 21.2907 21.7907 16.9134 21.7907 11.533C21.7907 6.15259 17.4134 1.77649 12.0342 1.77649Z"
                      fill="#848484"
                    />
                  </svg>
                </form>
              </div>
            </Col>
          </Row>

          <Row className="mb-30 mt-30">
            <div
              className="shop-product-fillter"
              style={{ justifyContent: "center" }}
            >
              <div className="sort-by-product-area d-block d-sm-flex">
                <Col
                  lg={10}
                  sm={12}
                  className="d-flex"
                  style={{ justifyContent: "center" }}
                >
                  <FilterDropdown
                    options={dropdown("id", "name")}
                    onChange={handleChangeProvice}
                    value={province}
                    label={"استان"}
                  />
                  <FilterDropdown
                    options={dropType("id", "type")}
                    onChange={handleChangeType}
                    value={type}
                    label={"مقطع"}
                  />
                </Col>
              </div>
            </div>
          </Row>
        </section>

        <section>
          <Row>
            <LazyLoad once>
              <Swiper
                // style={{ padding: "50px" }}
                className="custom-class"
                spaceBetween={80}
                autoplay
                breakpoints={{
                  300: { slidesPerView: 1, spaceBetween: 20 },
                  480: { slidesPerView: 1, spaceBetween: 20 },
                  640: { slidesPerView: 2, spaceBetween: 20 },
                  768: { slidesPerView: 2, spaceBetween: 20 },
                  1024: { slidesPerView: 2, spaceBetween: 5 },
                  1200: { slidesPerView: 2, spaceBetween: 30 },
                }}
              >
                {category == "vendor"
                  ? advertising_vendor.map((item) => (
                      <SwiperSlide>
                        <a href={`/vendor/${item.id}`}>
                          <img
                            className="advertising-top"
                            src={`/assets/imgs/banner/${item.href}`}
                            alt="bonghah"
                          />
                        </a>
                      </SwiperSlide>
                    ))
                  : category == "factory"
                  ? advertising_factory.map((item) => (
                      <SwiperSlide>
                        {item.category === category ? (
                          <a href={`/vendor/${item.id}`}>
                            <img
                              style={{
                                width: "100%",
                                height: "182px",
                                borderRadius: "18px",
                                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
                              }}
                              src={`/assets/imgs/banner/${item.href}`}
                              alt="bonghah"
                            />
                          </a>
                        ) : null}
                      </SwiperSlide>
                    ))
                  : advertising_botton.map((adv) => (
                      <SwiperSlide>
                        <LazyLoad once>
                          <Link
                            href={
                              adv.href == "gif3.gif" || adv.href == "gif1.gif"
                                ? "https://samaneahan.com/"
                                : `vendor/${adv.id}`
                            }
                          >
                            <img
                              style={{
                                width: "100%",
                                height: "182px",
                                borderRadius: "18px",
                                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
                              }}
                              src={`/assets/imgs/advertizing/${adv.href}`}
                            />
                          </Link>
                        </LazyLoad>
                      </SwiperSlide>
                    ))}
              </Swiper>
            </LazyLoad>
          </Row>
        </section>
        <Row className="mr-10">
          <Col>
            {" "}
            <div className="totall-product">
              <p>
                تعداد <strong className="text-brand">{rawData?.total}</strong>{" "}
                بنگاه یافت شد
              </p>
            </div>
          </Col>
        </Row>
        {loading ? (
          <Row style={{ placeContent: "center" }}>
            <ProgressBar animated now={100} />
          </Row>
        ) : (
          <Row className="vendor-grid">
            {data?.length
              ? data.map((item, i) =>
                  category == "vendor" ? (
                    <>
                      <Col lg={2} md={4} sm={6} xs={6} key={i}>
                        <SellerCart
                          loading={loading}
                          {...item}
                          title="فروشنده"
                        />
                      </Col>
                    </>
                  ) : category == "factory" ? (
                    <>
                      <Col lg={2} md={4} sm={6} xs={6} key={i}>
                        <FactoryCart
                          loading={loading}
                          {...item}
                          title="تولیدکننده"
                        />
                      </Col>
                    </>
                  ) : category == "consumer" ? (
                    <Col lg={3} md={6} sm={12} xs={12} key={i}>
                      <CustomerCart {...item} title="مصرف کننده" />
                    </Col>
                  ) : category == "freight" ? (
                    <Col lg={3} md={6} sm={12} xs={12} key={i}>
                      <SellerCart {...item} title="باربری" />
                    </Col>
                  ) : (
                    <Col lg={2} md={4} sm={6} xs={6} key={i}>
                      <SellerCart loading={loading} {...item} title="فروشنده" />
                    </Col>
                  )
                )
              : null}
          </Row>
        )}

        {rawData ? (
          <Pagination
            page={page}
            perPage={perPage}
            setPage={handlePageChange}
            totalPages={rawData?.last_page}
          />
        ) : null}

        <section>
          <Row className="mb-10">
            <Swiper
              autoplay
              pagination={false}
              spaceBetween={50}
              breakpoints={{
                300: { slidesPerView: 1, spaceBetween: 5 },
                480: { slidesPerView: 1, spaceBetween: 5 },
                640: { slidesPerView: 1, spaceBetween: 5 },
                768: { slidesPerView: 4, spaceBetween: 10 },
                1024: { slidesPerView: 4, spaceBetween: 10 },
                1200: { slidesPerView: 4, spaceBetween: 10 },
              }}
            >
              {category == "factory"
                ? advertising_factory.map((item) => (
                    <SwiperSlide>
                      {item.category === category ? (
                        <a href={`/vendor/${item.id}`}>
                          <img
                            className="advertising"
                            src={`/assets/imgs/banner/${item.href}`}
                            alt="bonghah"
                          />
                        </a>
                      ) : null}
                    </SwiperSlide>
                  ))
                : advertising_botton.map((adv) => (
                    <SwiperSlide>
                      <LazyLoad once>
                        <Link
                          href={
                            adv.href == "gif3.gif" || adv.href == "gif1.gif"
                              ? "https://samaneahan.com/"
                              : `vendor/${adv.id}`
                          }
                        >
                          <img
                            // style={{ height: "210px" }}
                            className="advertising"
                            src={`/assets/imgs/advertizing/${adv.href}`}
                          />
                        </Link>
                      </LazyLoad>
                    </SwiperSlide>
                  ))}
            </Swiper>
          </Row>
        </section>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const page = ctx.query.page ?? 1;
  const category =
    ctx.query?.category && ctx.query?.category !== "all"
      ? ctx.query?.category
      : null;
  const per_page = category === "vendor" || category == "factory" ? 24 : 12;

  const results = await fetchTopVendors({
    per_page,
    page,
    category,
  });

  const metaTags = getMetaTags({
    page: "top-companies",
    //@ts-ignore
    vandorCategory: category,
  });

  return {
    props: {
      initialPerPage: per_page,
      initialPage: page,
      initialData: results.data,
      initialCategory: category,
      initialTitleAndDesc: metaTags ?? null,
    },
  };
};

type TopCompaniesType = {
  initialPerPage: number;
  initialPage: number;
  initialData: RawData<UserVendor[]>;
  initialCategory: "all" | "vendor" | "factory" | "consumer" | "freight"; // "all" | "vendor" | "factory" | "consumer" | "freight";
  initialTitleAndDesc: { title: string; description: string };
};

export default TopCompanies;
