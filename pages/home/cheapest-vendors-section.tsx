// ** Hooks
import useAuth from "@/hooks/use-auth";
// ** Components
import { Container, Row, Image, Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectFade, Navigation, Pagination } from "swiper";
import Link from "next/link";
// ** Services
import { fetchOverviews } from "@/services/util-service";
import { seperateThousands } from "@/services/number-services";
import { getMainFilterOfType } from "@/services/product-type-services";
import { PRODUCT_TYPE_DETAILS } from "@/services/product-type-services";
import { PRODUCT_KIND_DETAILS } from "@/services/product-kind-services";
// ** Styles
import "swiper/css/effect-fade";
import "swiper/css/pagination";

interface CheapestVendorsSection {
  data: Overview[];
}

const CheapestVendorsSection = ({ data }: CheapestVendorsSection) => {
  const { isEditMode } = useAuth();

  const getVendorCatData = (category: string) => {
    switch (category) {
      case "factory":
        return { color: "#008000", label: "تولید کننده" };
      case "vendor":
      default:
        return { color: "#0089D6", label: "فروشنده" };
    }
  };

  const getProductTypeFactor = (product: Product) => {
    const mainFilter = getMainFilterOfType(product?.type_id);
    switch (mainFilter) {
      case "size":
        return { label: "سایز", value: product?.details[mainFilter] ?? "" };
      case "thickness":
        return { label: "ضخامت", value: product?.details[mainFilter] ?? "" };
      case "dimension":
        return { label: "ابعاد", value: product?.details[mainFilter] ?? "" };
    }
  };

  const getMoreUrl = (product: Product) => {
    const mainFilter = getMainFilterOfType(product?.type_id);
    //@ts-ignore
    const mainFilterValue = product?.details[mainFilter] ?? "";

    const kind = PRODUCT_KIND_DETAILS[product?.kind_id] ?? null;
    const type = PRODUCT_TYPE_DETAILS[product?.type_id] ?? null;

    return `/price/${type.enLabel}${kind ? "-" + kind.enLabel : ""}${
      mainFilterValue ? "-" + mainFilterValue : ""
    }`;
  };

  SwiperCore.use([Navigation, Pagination, EffectFade]);
  return (
    <section>
      <Container>
        <div className="free-seller mt-50">
          <Row>
            <Col sm={2}>
              <div className="title">
                <span>کدوم فروشنده ارزون‌تر میده؟</span>
              </div>
            </Col>
            <Col sm={10}>
              <Swiper
                style={{ height: "286px" }}
                className="custom-class "
                spaceBetween={50}
                // autoplay
                pagination={false}
                breakpoints={{
                  300: { slidesPerView: 2, spaceBetween: 0 },
                  480: { slidesPerView: 2, spaceBetween: 0 },
                  640: { slidesPerView: 3, spaceBetween: 20 },
                  768: { slidesPerView: 3, spaceBetween: 20 },
                  1024: { slidesPerView: 3, spaceBetween: 20 },
                  1200: { slidesPerView: 5, spaceBetween: 10 },
                }}
              >
                {data?.map((item) => (
                  <SwiperSlide style={{ padding: "5px", minHeight: "320px" }}>
                    <div className="box">
                      <span>
                        ارزون‌ترین
                        {isEditMode ? (
                          <Link
                            target="_blank"
                            href={`https://panel.samaneahan.com/products/${item?.query_result?.id}`}
                            className="mr-10"
                          >
                            {item?.query_result?.id}
                          </Link>
                        ) : null}
                      </span>

                      <span>
                        {item?.query_result?.type_id
                          ? PRODUCT_TYPE_DETAILS[item?.query_result?.type_id]
                              ?.label
                          : ""}{" "}
                        {getProductTypeFactor(item?.query_result)?.value}{" "}
                        {item?.query_result?.details?.factory}
                      </span>
                      <div
                        className="d-flex position-relative mt-5"
                        style={{ justifyContent: "center" }}
                      >
                        <Image
                          style={{
                            width: "35%",
                            height: "35%",
                            border: `3px solid ${
                              getVendorCatData(
                                item?.query_result?.user_vendor?.category
                              )?.color
                            }`,
                            borderRadius: "50%",
                          }}
                          src={
                            item.query_result?.user_vendor?.vendor_profile_img
                          }
                        />
                        <label
                          style={{
                            position: "absolute",
                            bottom: "0",
                            lineHeight: "15px",
                            backgroundColor: getVendorCatData(
                              item?.query_result?.user_vendor?.category
                            )?.color,
                            color: "#fff",
                            fontSize: "11px",
                            padding: "1px 8px",
                            borderRadius: "8px",
                            transform: "translate(0, 10px)",
                          }}
                        >
                          {
                            getVendorCatData(
                              item?.query_result?.user_vendor?.category
                            )?.label
                          }
                        </label>
                      </div>
                      <p>{item.query_result?.user_vendor?.name}</p>
                      <h4>
                        {seperateThousands(item?.query_result?.vendor_price)}{" "}
                        تومان
                      </h4>
                      <Link
                        className="mt-5"
                        href={getMoreUrl(item?.query_result)}
                      >
                        مشاهده قیمت سایر فروشندگان
                      </Link>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default CheapestVendorsSection;
