import Button from "@/components/input/button";
import { Col, Container, Row } from "reactstrap";
import LazyLoad from "react-lazyload";

const SellOnlineSection = () => {
  return (
    <section
      className="mb-50 sell-online-section mt-30"
      id={"sell-online-section"}
    >
      <Container>
        <Row className="d-none d-lg-flex">
          <Col
            lg={6}
            className="mb-lg-0 mb-md-5 mb-sm-5"
            style={{ placeSelf: "center", padding: "0 50px" }}
          >
            <h1 className="mb-30" style={{ textAlign: "center" }}>
              آنـــلایـــن آهــن بــفــروش
            </h1>
            <p
              className="mb-30"
              style={{ fontWeight: "700", textAlign: "justify" }}
            >
              با راه‌اندازی شعبه اینترنتی شما در بانک اطلاعاتی آنلاین آهن فروشان
              کشور قرار می‌گیرید که قابلیت جستجوی هوشمند و تفکیک بر اساس استان
              مقطع فولادی و نام بنگاه را دارد.
            </p>
            <p
              className="mb-30"
              style={{ fontWeight: "700", textAlign: "justify" }}
            >
              شما می‌توانید در شعبه اینترنتی اعلام قیمت و موجودی بار انجام
              بدهید، عکس، فیلم، کاتالوگ و آدرس شبکه‌های اجتماعی مجموعه خودتان را
              به اشتراک بگذارید.
            </p>
            <Row className="justify-content-end">
              <Col lg={4}>
                <Button
                  id="index-vendor-register-btn"
                  style={{ borderRadius: "20px" }}
                  block
                  label="ثبت‌نام"
                  color="brand"
                  href={"/landings/create-vendor"}
                />
              </Col>
            </Row>
          </Col>
          <Col lg={6} className="d-flex justify-content-cneter">
            <LazyLoad once>
              <img
                src="/assets/imgs/banner/vendor-register.png"
                className="mb-md-3 mb-lg-0 mb-sm-4 mt-lg-50 "
              />
            </LazyLoad>
          </Col>
        </Row>
        <Row className="mt-30 d-flex d-lg-none">
          <Col xs={12}>
            <h1 className="mb-30" style={{ textAlign: "center" }}>
              آنـــلایـــن آهــن بــفــروش
            </h1>
          </Col>
          <Col xs={12}>
            <LazyLoad once>
              <img
                src="/assets/imgs/banner/vendor-register.png"
                className="mb-md-3 mb-lg-0 mb-sm-4 mt-lg-50 "
              />
            </LazyLoad>
          </Col>
          <Col xs={12}>
            <div className="p-20">
              <p
                className="mb-30"
                style={{ fontWeight: "700", textAlign: "justify" }}
              >
                با راه‌اندازی شعبه اینترنتی شما در بانک اطلاعاتی آنلاین آهن
                فروشان کشور قرار می‌گیرید که قابلیت جستجوی هوشمند و تفکیک بر
                اساس استان مقطع فولادی و نام بنگاه را دارد.
              </p>
              <p
                className="mb-30"
                style={{ fontWeight: "700", textAlign: "justify" }}
              >
                شما می‌توانید در شعبه اینترنتی اعلام قیمت و موجودی بار انجام
                بدهید، عکس، فیلم، کاتالوگ و آدرس شبکه‌های اجتماعی مجموعه خودتان
                را به اشتراک بگذارید.
              </p>
            </div>
          </Col>
          <Col xs={10} className="mx-auto">
            <Button
              id="index-vendor-register-btn"
              style={{ borderRadius: "20px" }}
              block
              label="ثبت‌نام"
              color="brand"
              href={"/landings/create-vendor"}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SellOnlineSection;
