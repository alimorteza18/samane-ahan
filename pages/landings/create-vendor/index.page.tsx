import { fetchVendor, fetchVendors } from "@/services/vendor-services";
import { GetServerSideProps } from "next";
import { Col, Container, Row } from "react-bootstrap";
import FeaturesSection from "./features-section";
import HeaderSection from "./header-section";
import PerformanceSection from "./performance-section";
import SampleVendorsSection from "./sample-vendors-section";
import StatisticSection from "./statistic-section";
import VendorFormSection from "./vendor-form-section";
import { NextSeo } from "next-seo";
import { getMetaTags } from "@/services/meta-tags-services";

function About(props: LandingProps) {
  return (
    <>
      <NextSeo
        canonical={`${process.env.SITE_URL}/landings/create-vendor`}
        title={getMetaTags({ page: "create-vendor" }).title}
      />
      <Container className="pt-50">
        <Row>
          <Col xl={10} lg={12} className="m-auto">
            <HeaderSection />
            <FeaturesSection />
            {/* <PerformanceSection /> */}
          </Col>
        </Row>
      </Container>

      {/* <StatisticSection /> */}

      <Container>
        <Row>
          <Col xl={10} lg={12} className="m-auto">
            <SampleVendorsSection vendors={props.sampleVendors} />
            <VendorFormSection />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const results = await fetchVendors({
    per_page: 6,
    category: "vendor",
    order: "rate",
    fields: [ "id", "category", "phone", "province_id", "name", "modir_name", "rate", "vendor_profile_img", "website_url", "ig_url", "tg_url" ], //prettier-ignore
    includes: [{ name: "province" }],
  });

  return {
    props: {
      sampleVendors: results.data.data,
    },
  };
};

interface LandingProps {
  sampleVendors: UserVendor[];
}

export default About;
