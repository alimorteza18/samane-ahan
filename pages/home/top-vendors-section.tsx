import Button from "@/components/input/button";
import VendorsSlider from "@/components/widgets/vendors-slider";
import { Col, Container, Row } from "reactstrap";

interface TopVendorsSectionProps {
  sectionId?: string;
  vendors: UserVendor[];
}

const TopVendorsSection = ({
  sectionId = "top-vendors-section",
  vendors,
}: TopVendorsSectionProps) => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#FFF0E6"
          fill-opacity="1"
          d="M0,128L80,133.3C160,139,320,149,480,149.3C640,149,800,139,960,165.3C1120,192,1280,256,1360,288L1440,320L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        />
      </svg>

      <section id={sectionId} style={{ backgroundColor: "#FFF0E6" }}>
        <Container>
          <h2 className="title style-3 mb-50 text-center">بنگاه‌های برتر</h2>

          <VendorsSlider data={vendors} />

          <Row className="mt-50 justify-content-end">
            <Col md={2}>
              <Button
                color="brand"
                block
                label="مشاهده همه بنگاه‌ها"
                href={"/top-companies?category=vendor"}
              />
            </Col>
          </Row>
        </Container>
      </section>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#FFF0E6"
          fill-opacity="1"
          d="M0,288L80,266.7C160,245,320,203,480,192C640,181,800,203,960,186.7C1120,171,1280,117,1360,90.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
        />
      </svg>
    </>
  );
};

export default TopVendorsSection;
