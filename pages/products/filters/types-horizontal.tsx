import { PRODUCT_TYPE_DETAILS } from "@/services/product-type-services";
import { Col, Container, Row } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { TypeProp } from "../page-component";

export default function TypesHorizontal(props: TypeHorizontall) {
  const { autoScrollTop = true } = props;

  const ATagHref = autoScrollTop ? { href: "#" } : {};

  return (
    <Container>
      <div className="type-list ">
        <Swiper
          className="custom-class d-flex"
          style={{ justifyContent: "center" }}
          centerInsufficientSlides={true}
          spaceBetween={50}
          pagination={{ clickable: true }}
          breakpoints={{
            300: { slidesPerView: 5, spaceBetween: 35 },
            480: { slidesPerView: 5, spaceBetween: 35 },
            640: { slidesPerView: 4, spaceBetween: 5 },
            768: { slidesPerView: 4, spaceBetween: 5 },
            1024: { slidesPerView: 6, spaceBetween: 5 },
            1200: { slidesPerView: 9, spaceBetween: 5 },
          }}
        >
          {Object.keys(PRODUCT_TYPE_DETAILS).map((typeId: any) => (
            <SwiperSlide>
              <div
                className="d-flex justify-content-center product-type-btn"
                style={{ float: "right" }}
                onClick={() => props.setType(typeId)}
                aria-label={PRODUCT_TYPE_DETAILS[typeId].label}
              >
                <a
                  className={`${props.type.id == typeId ? "active" : ""}`}
                  title="metal icons"
                  {...ATagHref}
                >
                  <i className={`icon icon-${typeId} ml-5`} />
                  <span
                    style={{ fontSize: "18px" }}
                    className={props.type.id == typeId ? "active" : ""}
                  >
                    {PRODUCT_TYPE_DETAILS[typeId].label}
                  </span>
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Container>
  );
}

interface TypeHorizontall {
  type: TypeProp;
  setType: (typeId: any) => void;
  autoScrollTop?: boolean;
}
