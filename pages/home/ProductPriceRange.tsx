// ** Components
import { Card, CardBody, Container, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
// ** Services
import { seperateThousands } from "@/services/number-services";
import { PRODUCT_TYPE_DETAILS, getMainFilterOfType} from "@/services/product-type-services"; //prettier-ignore
import {
  PRODUCT_KIND,
  PRODUCT_KIND_DETAILS,
} from "@/services/product-kind-services";
// ** Styles
import "swiper/css/effect-fade";
import "swiper/css/pagination";

interface ProductsPriceRangeProps {
  data: Array<{ lowest: Product; highest: Product }>;
}

const ProductsPriceRange = ({ data }: ProductsPriceRangeProps) => {
  return (
    <section className="featured mt-100">
      <Container>
        <Row>
          <div
            style={{
              position: "relative",
              marginBottom: "50px",
            }}
          >
            <span>بازه‌ی قیمتی هر سایز از محصولات</span>
            <hr
              className="d-none d-lg-flex"
              style={{
                flex: "1",
                margin: "0 10px",
                borderWidth: "5px",
                borderColor: "gary",
                opacity: 1,
              }}
            />
          </div>
        </Row>

        <Swiper
          className="custom-class"
          spaceBetween={50}
          autoplay
          pagination={false}
          breakpoints={{
            300: { slidesPerView: 1, spaceBetween: 10 },
            480: { slidesPerView: 2, spaceBetween: 10 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
            1200: { slidesPerView: 4, spaceBetween: 10 },
          }}
        >
          {data?.map((item) =>
            item?.highest && item?.lowest ? (
              <SwiperSlide>
                <SingleCard {...item} />
              </SwiperSlide>
            ) : null
          )}
        </Swiper>
      </Container>
    </section>
  );
};

export default ProductsPriceRange;

interface SingleCardProps {
  lowest: Product;
  highest: Product;
}

const SingleCard = ({ lowest, highest }: SingleCardProps) => {
  const getProductTypeFactor = () => {
    // ** lowest or highest - doesnt matter here
    const mainFilter = getMainFilterOfType(lowest?.type_id);
    switch (mainFilter) {
      case "size":
        return lowest?.details[mainFilter] ?? "";
      case "thickness":
        return lowest?.details[mainFilter] ?? "";
      case "dimension":
        return lowest?.details[mainFilter] ?? "";
    }
  };

  const getMoreUrl = () => {
    const mainFilter = getMainFilterOfType(lowest?.type_id);
    //@ts-ignore
    const mainFilterValue = lowest?.details[mainFilter] ?? "";

    const kind = PRODUCT_KIND_DETAILS[lowest?.kind_id] ?? null;
    const type = PRODUCT_TYPE_DETAILS[lowest?.type_id] ?? null;

    return `/price/${type.enLabel}${kind ? "-" + kind.enLabel : ""}${
      mainFilterValue ? "-" + mainFilterValue : ""
    }`;
  };

  return (
    <Card
      style={{
        aspectRatio: "3/1",
        // paddingRight: "20px",
        paddingBottom: "10px",
        paddingLeft: "10px",
      }}
    >
      <CardBody className="d-flex flex-column" style={{ position: "relative" }}>
        <strong className="mt-30" style={{ fontSize: "25px" }}>
          <i
            className={`ml-20 icon icon-${lowest?.type_id}`}
            style={{ fontSize: "30px" }}
          />
          {lowest?.type_id ? PRODUCT_TYPE_DETAILS[lowest?.type_id]?.label : ""}{" "}
          {lowest?.kind_id !== PRODUCT_KIND.GIRDER_COMMON &&
          lowest?.kind_id !== PRODUCT_KIND.REBAR_RIBBED
            ? lowest?.kind_id
              ? PRODUCT_KIND_DETAILS[lowest?.kind_id]?.label
              : ""
            : null}{" "}
          {getProductTypeFactor()}
        </strong>

        <ul
          className="mt-30"
          style={{
            listStyleType: "disc",
            marginTop: "10px",
            marginRight: "30px",
            lineHeight: "1.7",
            fontSize: "20px",
          }}
        >
          <li style={{ color: "green", fontWeight: "bold" }}>
            کمترین قیمت: {seperateThousands(lowest?.vendor_price)} تومان
          </li>
          <li style={{ color: "red", fontWeight: "bold" }}>
            بیشترین قیمت: {seperateThousands(highest?.vendor_price)} تومان
          </li>
        </ul>
        <Link
          href={getMoreUrl()}
          style={{
            fontSize: "18px",
            marginTop: "20px",
            left: 0,
            color: "#0089D6",
            alignSelf: "end",
          }}
        >
          مشاهده همه
          <FontAwesomeIcon
            icon={faChevronLeft}
            style={{ marginRight: "30px" }}
          />
        </Link>
      </CardBody>
    </Card>
  );
};
