// ** Components
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
// ** Services
import { dateToPersian } from "@/services/datetime-services";
import FooterBanner from "../partials/FooterBanner";

const Footer = () => {
  let iranDate = dateToPersian();
  let currentYear = iranDate.split("/")[0];

  const data = [
    {
      title: "تیرآهن",
      link: "/price/beam",
      subCategory: [
        { title: "قیمت معمولی", link: "/price/beam-common" },
        { title: "قیمت هاش", link: "/price/beam-hash  " },
      ],
    },
    {
      title: "میلگرد",
      link: "/price/rebar",
      subCategory: [
        { title: "قیمت آجدار", link: "/price/rebar-ribbed" },
        { title: "قیمت ساده", link: "/price/rebar-simple" },
      ],
    },

    {
      title: "قوطی و پروفیل",
      link: "/price/profile",
      subCategory: [{ title: "قیمت معمولی ", link: "/price/profile-common" }],
    },

    {
      title: "ناودانی",
      link: "/price/angle_bar",
      subCategory: [{ title: "قیمت ناودانی ", link: "/price/angle_bar" }],
    },

    {
      title: "ورق",
      link: "/price/steel_plate",
      subCategory: [
        { title: "قیمت سیاه ", link: "/price/steel_plate-black" },
        { title: "قیمت روغنی ", link: "/price/steel_plate-sheet_oily" },
        { title: "قیمت رنگی ", link: "/price/steel_plate-colored" },
        { title: "قیمت گالوانیزه ", link: "/price/steel_plate-galvanized" },
        { title: "قیمت آلیاژی ", link: "/price/steel_plate-alloy" },
        { title: "قیمت اسیدشویی ", link: "/price/steel_plate-pickling" },
        { title: "قیمت آجدار ", link: "/price/steel_plate-ribbed" },
        { title: "قیمت قلع اندود ", link: "/price/steel_plate-tin_plated" },
      ],
    },
    {
      title: "نبشی",
      link: "/price/channel_bar",
      subCategory: [{ title: "قیمت نبشی", link: "/price/channel_bar" }],
    },
    {
      title: "اطلاعات فولاد ایران",
      link: "",
      subCategory: [
        { title: "فروشندگان آهن آلات", link: "/top-companies?category=vendor" },
        {
          title: "تولیدکنندگان آهن آلات",
          link: "/top-companies?category=factory",
        },
        {
          title: "مصرف کنندگان آهن آلات",
          link: "/top-companies?category=consumer",
        },
      ],
    },
  ];

  return (
    <>
      <footer className="main">
        {/* <FooterBanner /> */}

        <section>
          <Container>
            <div
              className="footer-link-widget col  wow animate__animated animate__fadeInUp"
              data-wow-delay=".2s"
            >
              <Row>
                <Col lg={3} className="pl-40">
                  <div
                    className="widget-about font-md mb-md-3 mb-lg-3 mb-xl-0  wow animate__animated animate__fadeInUp"
                    data-wow-delay="0"
                  >
                    <div className="logo  mb-30">
                      <Link
                        className="footer-nav-item mb-25"
                        href="/"
                        prefetch={false}
                      >
                        <img
                          src="/assets/imgs/theme/logo-black.png"
                          alt="logo"
                        />
                      </Link>
                      <p
                        className="font-lg text-heading"
                        style={{ lineHeight: "35px" }}
                      >
                        سامانه آهن بازار آنلاین خرید و فروش آهن است. جایی که
                        آهن‌فروشان، مشتریان و کارخانه‌جات را به هم متصل می‌کند
                        تا همه بتوانند براحتی بخرند و بفروشند.{" "}
                      </p>
                    </div>
                  </div>
                  <ul className="contact-infor">
                    <li>
                      <img src="/assets/imgs/theme/icons/icon-location.svg" />
                      <strong>آدرس: </strong> <span>تهران</span>
                    </li>
                    <li>
                      <img src="/assets/imgs/theme/icons/icon-contact.svg" />
                      <strong>تلفن تماس : </strong>
                      <span>91305404 (021)</span>
                    </li>
                    <li>
                      <img src="/assets/imgs/theme/icons/icon-email-2.svg" />
                      <strong>ایمیل : </strong>
                      <span>info@samaneahan.com</span>
                    </li>
                    <li>
                      <img src="/assets/imgs/theme/icons/icon-clock.svg" />
                      <strong>ساعت کاری : </strong>
                      <span>10:00 - 17:00, شنبه - چهارشنبه</span>
                    </li>
                  </ul>
                </Col>
                <Col lg={9}>
                  <Row>
                    {data.map((cat, i) => (
                      <Col lg={3} xs={6} sm={6} key={i}>
                        <ul className="footer-list  mb-sm-5 mb-md-0 mt-20">
                          <h4
                            className="widget-title mb-10"
                            style={{ fontSize: "22px" }}
                          >
                            {cat.title}
                          </h4>
                          {cat.subCategory.map((sub) => (
                            <li key={sub.title}>
                              <Link href={sub.link} prefetch={false}>
                                {sub.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </div>
          </Container>
        </section>
        <section>
          <Container
            className="pb-30  wow animate__animated animate__fadeInUp mt-20"
            data-wow-delay="0"
          >
            <Row className="align-items-center">
              <Col xs={12} className="mb-30">
                <div className="footer-bottom"></div>
              </Col>
              <Col xl={4} lg={6} md={6}>
                <p className="font-sm mb-0">
                  &copy; {currentYear}, تمامی حقوق برای
                  <strong className="text-brand"> سامانه آهن </strong>
                  محفوظ است <br />
                  سامانه آهن
                </p>
              </Col>
              <Col xl={4} lg={4} className="text-center d-none d-xl-block">
                <div className="hotline d-lg-inline-flex ml-30">
                  <img
                    style={{ width: "22px" }}
                    src="/assets/imgs/theme/icons/phone-call.svg"
                    alt="hotline"
                  />
                  <p>
                    91305404 (021)
                    <span style={{ fontFamily: "IRANSansXFaNum" }}>
                      ساعت کاری 17:00 - 10:00
                    </span>
                  </p>
                </div>
              </Col>
              <Col
                xl={4}
                lg={6}
                md={6}
                className="col-xl-4 col-lg-6 col-md-6 text-end d-none d-md-block"
              >
                <div className="mobile-social-icon">
                  <h6>ما را دنبال کنید</h6>
                  <a
                    href="https://t.me/samaneahanir
"
                  >
                    <img src="/assets/imgs/icon/telegram.svg" alt="telegram" />
                  </a>
                  <a href="#">
                    <img src="/assets/imgs/icon/eitaa.svg" alt="eitaa" />
                  </a>
                  <a href="#">
                    <img
                      src="/assets/imgs/icon/instagram.svg"
                      alt="instagram"
                    />
                  </a>
                  <a href="https://www.aparat.com/samaneahan" className="mr-5">
                    <img src="/assets/imgs/icon/aparat.svg" alt="aparat" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/%D8%B3%D8%A7%D9%85%D8%A7%D9%86%D9%87-%D8%A2%D9%87%D9%86-5b9762138/?originalSubdomain=ir"
                    className="mr-5"
                  >
                    <img src="/assets/imgs/icon/linkedin.svg" alt="linkedin" />
                  </a>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </footer>
    </>
  );
};

export default Footer;
