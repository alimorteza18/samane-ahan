import {
  PRODUCT_TYPE,
  PRODUCT_TYPE_DETAILS,
} from "@/services/product-type-services";
import Link from "next/link";
import { Col, Image, Row, Spinner } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";

export default function CustomerCart(props: any) {
  const {
    id,
    slug = null,
    permissions,
    name,
    rate,
    modir_name,
    title,
    vendor_profile_img,
    address,
    loading,
    province_name,
  } = props;

  return (
    <Link href={`/vendor/${slug ?? id}`}>
      <div className="customer-cart mb-20">
        <Row>
          <Col lg={4} sm={4} xs={3} className="position-relative">
            <div className="wraper">
              <img
                src={
                  vendor_profile_img
                    ? vendor_profile_img
                    : "assets/imgs/theme/Default_profile.svg"
                }
              />
              <span className="position-absolute" style={{}}>
                {title}
              </span>
            </div>
          </Col>
          <Col
            className="d-flex"
            style={{ justifyContent: "center" }}
            lg={5}
            sm={5}
            xs={6}
          >
            <div
              className="d"
              style={{ flexDirection: "column", display: "inline-flex" }}
            >
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  textAlign: "center",
                  color: "#333333",
                }}
              >
                {name}
              </span>

              <div
                className="l"
                style={{
                  fontSize: "12px",
                  fontWeight: "400",
                  // lineHeight: "20",
                  textAlign: "center",
                  color: "#4F4F4F",
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="21" height="21" rx="10.5" fill="#333333" />
                  <path
                    d="M10.5 4C9.30696 4.00155 8.16319 4.52475 7.31958 5.45483C6.47597 6.38491 6.00141 7.64592 6 8.96125C5.99858 10.0361 6.31704 11.0819 6.90655 11.938C6.90655 11.938 7.02928 12.1161 7.04932 12.1419L10.5 16.6286L13.9523 12.1396C13.9703 12.1157 14.0935 11.938 14.0935 11.938L14.0939 11.9366C14.6831 11.0809 15.0014 10.0356 15 8.96125C14.9986 7.64592 14.524 6.38491 13.6804 5.45483C12.8368 4.52475 11.693 4.00155 10.5 4ZM10.5 10.7653C10.1764 10.7653 9.85998 10.6595 9.59089 10.4613C9.32179 10.2631 9.11205 9.9813 8.9882 9.65164C8.86435 9.32199 8.83194 8.95924 8.89508 8.60929C8.95822 8.25933 9.11407 7.93787 9.34292 7.68556C9.57177 7.43326 9.86334 7.26143 10.1808 7.19182C10.4982 7.12221 10.8272 7.15794 11.1262 7.29448C11.4252 7.43103 11.6808 7.66227 11.8606 7.95895C12.0404 8.25563 12.1364 8.60443 12.1364 8.96125C12.1358 9.43954 11.9632 9.89807 11.6565 10.2363C11.3497 10.5745 10.9338 10.7647 10.5 10.7653Z"
                    fill="white"
                  />
                </svg>
                <span className="mr-5">{province_name}</span>
              </div>
            </div>
          </Col>
          <Col lg={3} sm={3} xs={3}>
            <div className="rate">
              <span>{rate}</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.05841 0.547363L7.87606 4.18266L11.5114 4.63707L9.01512 7.43625L9.6937 11.4532L6.05841 9.6356L2.42312 11.4532L3.10776 7.43625L0.605469 4.63707L4.24076 4.18266L6.05841 0.547363Z"
                  fill="#FCC22E"
                />
              </svg>
            </div>
          </Col>
        </Row>
        <Row className="mt-20">
          <Col lg={12} sm={12} xs={12}>
            <div>
              <span style={{ color: "gray" }}>مصرف کننده :</span>

              <Swiper
                className="custom-class"
                style={{ margin: "0" }}
                autoplay
                pagination={{ clickable: true }}
                breakpoints={{
                  300: { slidesPerView: 3, spaceBetween: 5 },
                  480: { slidesPerView: 3, spaceBetween: 5 },
                  640: { slidesPerView: 3, spaceBetween: 20 },
                  768: { slidesPerView: 4, spaceBetween: 30 },
                  1024: { slidesPerView: 8, spaceBetween: 0 },
                  1200: { slidesPerView: 8, spaceBetween: 0 },
                }}
              >
                {loading ? (
                  <Row style={{ placeContent: "center" }}>
                    <Spinner />
                  </Row>
                ) : (
                  permissions &&
                  permissions.map((item: any, i: any) => (
                    <>
                      <SwiperSlide
                        key={i}
                        style={{
                          height: "64%",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "flex",
                          justifyContent: "center",
                          padding: "0 25px",
                          borderLeft:
                            permissions.length - 1 !== i
                              ? "3px solid #ffbd16"
                              : "0px",
                        }}
                      >
                        <span style={{ paddingLeft: "8px" }}>
                          {item?.id == 3 ? "قوطی" : item.type}
                        </span>
                      </SwiperSlide>
                    </>
                  ))
                )}
              </Swiper>
            </div>
          </Col>
        </Row>
      </div>
    </Link>
  );
}
