import { Col } from "react-bootstrap";

const HeaderSection = () => {
  return (
    <section className="row align-items-center mb-50">
      <Col lg={5}>
        <img
          src="/assets/imgs/page/ahan-mobile.jpg"
          className="border-radius-15 mb-md-3 mb-lg-0 mb-sm-4"
        />
      </Col>
      <Col lg={7}>
        <div className="pl-25">
          <h3
            className="mb-30"
            style={{ fontSize: "2.5rem", color: "#757575" }}
          >
            در کمتر از 5 دقیقه شعبه اینترنتی خود را بسازید
          </h3>
          <h3
            className="mb-25"
            style={{ fontSize: "3.25rem", color: "#757575" }}
          >
            و تجارت آنلاین آهن را شروع کنید
          </h3>
        </div>
      </Col>
    </section>
  );
};

export default HeaderSection;
