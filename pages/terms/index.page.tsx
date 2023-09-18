import Link from "next/link";
import BlogSidebar from "../../components/elements/BlogSidebar";
import { Col, Container, Row } from "reactstrap";
import Head from "next/head";
import { getMetaTags } from "@/services/meta-tags-services";
import { NextSeo } from "next-seo";

function Terms() {
  return (
    <Container className="pt-50">
      <NextSeo
        title={getMetaTags({ page: "terms" }).title}
        description={getMetaTags({ page: "terms" }).description}
        canonical={`${process.env.SITE_URL}/terms`}
      />
      <Row className="justify-content-center text-center">
        <Col lg={6}>
          <div className="single-page pr-30 mb-lg-0 mb-sm-5">
            <div className="single-header style-2">
              <h2>قوانین و مقررات سایت</h2>
            </div>
            <div className="single-content mb-50">
              <p style={{ fontSize: "24px", lineHeight: "40px" }}>
                سامانه آهن قیمت و موجودی بار آهن فروشان مختلف را از سایت و شبکه
                های اجتماعی فروشندگان آهن جمع آوری کرده است و در اختیار مخاطبان
                قرار داده است، صحت و سقم قیمت و موجودی به عهده مرجع اعلام کننده
                است.
              </p>
              <p style={{ fontSize: "24px", lineHeight: "40px" }}>
                لازم به ذکر است که سامانه آهن هیچ گونه مسئولیت و تعهدی در قبال
                معامله کاربران با آهن فروشی ها ندارد و صرفا نقش معرف را ایفا می
                کند.
              </p>
              <p style={{ fontSize: "24px", lineHeight: "40px" }}>
                جهت رسیدگی به امورات مشتریان و خریداران تمامی مکالمات ضبط خواهد
                شد
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Terms;
