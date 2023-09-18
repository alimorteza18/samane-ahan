import VendorCard from "@/components/widgets/vendor-card";
import SellerCart from "@/pages/top-companies/seller-cart";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import LazyLoad from "react-lazyload";

const SampleVendorsSection = ({ vendors }: SampleVendorProps) => {
  return (
    <section className="mb-50">
      <h2
        className="title style-3 mb-40 text-center"
        style={{ color: "#7e7e7e" }}
      >
        شعبه اینترنتی
      </h2>
      <Row>
        <Col lg={4} className="mb-lg-0 mb-md-5 mb-sm-5">
          <h1 className="mb-30" style={{ color: "#757575" }}>
            نمونه‌هایی از شعبه‌های اینترنتی
          </h1>

          <Link href={"/top-companies?category=vendor"} className="btn w-100">
            مشاهده تمام بنگاه‌ها
          </Link>
          <div>
            <LazyLoad once>
              <a href="https://blog.samaneahan.com/">
                <img
                  src="/assets/imgs/advertizing/gif1.gif"
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </a>

              <img
                className="advertising"
                src="/assets/imgs/advertizing/gif3.gif"
                alt=""
              />
            </LazyLoad>
          </div>
        </Col>
        <Col lg={8}>
          <Row>
            {vendors &&
              vendors.length &&
              vendors.map((vendor) => (
                <Col lg={4} md={6} xs={6}>
                  <SellerCart
                    title="فروشنده"
                    {...vendor}
                    province_name={vendor.province.name}
                  />
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    </section>
  );
};

export default SampleVendorsSection;

interface SampleVendorProps {
  vendors: UserVendor[];
}
