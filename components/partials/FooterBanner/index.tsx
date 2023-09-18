import { useRouter } from "next/router";
// ** Components
import { Container, Image, Row } from "react-bootstrap";
// ** Services
import LazyLoad from "react-lazyload";

const FooterBanner = () => {
  const route = useRouter();

  return (
    <section
      className="newsletter mb-15 pb-15  wow animate__animated animate__fadeIn"
      style={route.pathname === "/" ? { backgroundColor: "#f3f3f3" } : {}}
    >
      <Container style={{ backgroundColor: "#f3f3f3" }}>
        <Row>
          <Container>
            <div
              className="d-flex newsletter-inner justify-content-center"
              style={{ alignItems: "center", height: "300px" }}
            >
              <div className="newsletter-content">
                <h2 className="mb-20">
                  در کمترین زمان ممکن <br />
                  قیمت‌های بنگاه‌های مختلفو ببین و مقایسه کن
                </h2>
                <p className="mb-45 d-none d-lg-flex">
                  با‌ سامانه آهن از بقیه جلوتر باش
                </p>
              </div>
              <LazyLoad className="d-flex justify-content-end" once>
                <Image
                  src="/assets/imgs/banner/iron-boy.png"
                  alt="newsletter"
                />
              </LazyLoad>
            </div>
          </Container>
        </Row>
      </Container>
    </section>
  );
};

export default FooterBanner;
