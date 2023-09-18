import Link from "next/link";
import { Col, Container, Row } from "reactstrap";
import LazyLoad from "react-lazyload";

const BannerSection = () => {
  return (
    <Container>
      <Row>
        <Col sm={12} md={6}>
          <Link id="index-banner-fooladium" href="/404">
            <LazyLoad once>
              <img
                className="img-fluid"
                src="/assets/imgs/banner/fooladium.png"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </LazyLoad>
          </Link>
        </Col>
        <Col sm={12} md={6}>
          <Link id="index-banner-book" href="/404">
            <LazyLoad once>
              <img
                className="img-fluid"
                src="/assets/imgs/banner/foolad-book.png"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </LazyLoad>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default BannerSection;
