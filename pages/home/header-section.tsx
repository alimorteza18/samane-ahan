import { Col, Container, Row } from "reactstrap";
import Button from "@/components/input/button";
import PlaceholderAnimation from "@/components/placeholder";
import LazyLoad from "react-lazyload";

const HeaderSection = ({ sectionId = "#" }) => {
  return (
    <section className="align-items-center header-section" id={sectionId}>
      <Container>
        <Row className=" align-items-center">
          <Col lg={7} className="pr-30">
            <LazyLoad once>
              <img src="/assets/imgs/banner/iron-boy.png" className="mb-md-3" />
            </LazyLoad>
          </Col>
          <Col lg={5} style={{ textAlignLast: "center" }}>
            <div className="fade-in-text">
              <p>
                با سامانه آهن قیمت روز آهن فروشی هارو با هم مقایسه کن و بدون
                واسطه خرید کنید.
              </p>
              <p className="mb-40"> </p>
            </div>

            <p className="text-start mt-50">
              <Button
                style={{
                  color: "black",
                  fontSize: "20px",
                }}
                className="index-header-cta"
                label="مقایسه قیمت‌ها"
                color="brand"
                href={"/price/rebar-ribbed"}
              />
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeaderSection;
