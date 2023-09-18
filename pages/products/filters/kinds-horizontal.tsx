// ** Components
import { Col, Row, Spinner } from "reactstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { KindProp, TypeProp } from "../page-component";
import { Container, Image } from "react-bootstrap";
import useWindowDimensions from "@/hooks/use-window-dimension";

export default function KindsHorizontal({
  filters,
  type,
  kind,
  setKind,
}: ProductKindsProps) {
  const { isMobile } = useWindowDimensions();
  return (
    <Container
      style={{ margin: "0 auto", marginBottom: isMobile ? 0 : "30px" }}
    >
      <Swiper
        className="custom-class"
        centerInsufficientSlides={true}
        // autoplay={{ delay: 2500, disableOnInteraction: false }}
        spaceBetween={50}
        pagination={{ clickable: true }}
        breakpoints={{
          300: { slidesPerView: 3, spaceBetween: 5 },
          480: { slidesPerView: 3, spaceBetween: 5 },
          640: { slidesPerView: 4, spaceBetween: 5 },
          768: { slidesPerView: 4, spaceBetween: 5 },
          1024: { slidesPerView: 5, spaceBetween: 5 },
          1200: { slidesPerView: 14, spaceBetween: 0 },
        }}
      >
        {filters?.kind &&
          filters?.kind.filters.map((item, i) => (
            <SwiperSlide>
              <div className="d-flex justify-content-center">
                <div
                  id={`product-type-${type?.id}-kind-btn`}
                  className={`kind-list ${
                    kind && kind?.id == item.id ? "active" : ""
                  }`}
                  onClick={() => setKind(item.id)}
                >
                  <div
                    className="d-flex justify-content-center"
                    style={{ alignItems: "center" }}
                  >
                    <Image src={item.image} />
                  </div>
                  <h6
                    className={`d-flex justify-content-center ${
                      kind && kind?.id == item.id ? "active" : ""
                    }`}
                  >
                    {item.label}
                  </h6>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </Container>
  );
}

type ProductKindsProps = {
  filters: SearchFilters | undefined;
  loading: boolean;
  type: TypeProp | null;
  kind: KindProp | null;
  setKind: (kind: any) => void;
};
