import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";

const HeaderTop = ({ profile }: HeaderTopProps) => {
  return (
    <div className="header-top header-top-ptb-1 d-none d-lg-block">
      <Container>
        <Row className="align-items-center">
          <Col xl={3} lg={4}>
            <div className="header-info">
              <ul>
                <li>
                  <Link href="/about">درباره ما</Link>
                </li>
                <li>
                  <Link href={profile?.user ? "/account" : "/login"}>
                    حساب من
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col xl={6} lg={4}>
            <div className="text-center">
              <div id="news-flash" className="d-inline-block">
                <ul>
                  <li>
                    مشاهده و مقایسه بارهای بنگاه‌های مختلف
                    <Link href="/product-category">| مشاهده</Link>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
          <Col xl={3} lg={4}>
            <div className="header-info header-info-right">
              <ul>
                <li>
                  پشتیبانی:{" "}
                  <strong className="text-brand">5404 9130 (021)</strong>
                </li>
                <li>
                  <Link className="language-dropdown-active" href="/#">
                    <i className="fi-rs-world ml-5" />
                    فارسی
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeaderTop;

interface HeaderTopProps {
  profile: AuthUserProfile;
}
