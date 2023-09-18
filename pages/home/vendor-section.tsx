import Button from "@/components/input/button";
import VendorsSlider from "@/components/widgets/vendors-slider";
import { Col, Container, Row } from "reactstrap";
import SellerCart from "../top-companies/seller-cart";

interface VendorSectionProps {
  sectionId?: string;
  vendors: UserVendor[];
}

const VendorSection = ({
  vendors,
}: VendorSectionProps) => {
  return (
    <section className="mb-50 vendor-section" id={"vendor-section"}>
      <Container>
      <Row className="mt-30">
          <Container style={{ padding: "0 70px" }}>
            <h3 className="mb-30">بنگاه‌های ویژه</h3>
            <VendorsSlider data={vendors} />
            <Row className="justify-content-center">
              <Col md={6} lg={2}>
                <Button
                  color="brand"
                  id="index-vendor-all"
                  block
                  label="مشاهده همه بنگاه‌ها"
                  href={"/top-companies?category=vendor"}
                  style={{ borderRadius: "20px", marginTop: "20px" }}
                />
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>
      
    </section>
  );
};

export default VendorSection;