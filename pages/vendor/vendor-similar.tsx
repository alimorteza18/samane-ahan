import { Container } from "react-bootstrap";
import { Row } from "reactstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import SellerCart from "../top-companies/seller-cart";
import FactoryCart from "../top-companies/factory-cart";
import CustomerCart from "../top-companies/customer-cart";

export default function VendorSimilar({ data }: any) {
  return (
    <Container>
      <Row
        style={{
          backgroundColor: "#ffff",
          borderRadius: "10px",
          padding: "33px",
        }}
      >
        <h1>بنگاه های مشابه</h1>
        <Swiper
          breakpoints={{
            300: { slidesPerView: 3, spaceBetween: 0 },
            480: { slidesPerView: 3, spaceBetween: 0 },
            640: { slidesPerView: 3, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 10 },
            1024: { slidesPerView: 3, spaceBetween: 10 },
            1200: { slidesPerView: 5, spaceBetween: 40 },
          }}
          autoplay
        >
          {data.map((item: any) => (
            <SwiperSlide>
              {item.category == "vendor" ? (
                <SellerCart {...item} title="فروشنده" />
              ) : item.category == "factory" ? (
                <FactoryCart {...item} title="تولید‌کننده" />
              ) : (
                <CustomerCart {...item} title="مصرف‌کننده" />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </Row>
    </Container>
  );
}
