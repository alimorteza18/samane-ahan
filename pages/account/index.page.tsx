// ** Hooks
import { useState } from "react";
import { useRouter } from "next/router";
// ** Partials
import Dashboard from "./tabs/dashboard";
import Details from "./tabs/details";
import ProductNeeds from "./tabs/product-needs";
import Products from "./tabs/products";
// ** Components
import { Col, Container, Row } from "react-bootstrap";
import Breadcrumb from "@/components/layout/Breadcrumb";
// ** Services
import { deleteLoggedInUserData } from "@/redux/action/auth";
import { connect } from "react-redux";
import VendorProfile from "./tabs/vendor";
import GalleryVendorProfile from "./tabs/gallery-vendor-profile";
import { withAuthCSR } from "@/components/HOC/WithAuth";
import { compose } from "redux";
import { NextSeo } from "next-seo";
import { getMetaTags } from "@/services/meta-tags-services";

function Account({ profile, deleteLoggedInUserData }: AccountProps) {
  const router = useRouter();

  const targetTab = router.query.tab ? router.query.tab.toString() : "1";
  const [activeIndex, setActiveIndex] = useState(parseInt(targetTab));

  const handleOnClick = (index: number) => setActiveIndex(index);

  const handleLogout = () => {
    deleteLoggedInUserData();
    router.push("/login");
  };

  const SingleDashboardMenu = (props: SingleDashboardMenuProps) => {
    const { onClick, id, label, icon = "settings-sliders" } = props;
    return (
      <li className="nav-item">
        <a
          className={
            id
              ? activeIndex === id
                ? "nav-link active"
                : "nav-link"
              : "nav-link"
          }
          onClick={onClick}
        >
          <i className={`fi-rs-${icon} mr-10`} />
          {label}
        </a>
      </li>
    );
  };

  return (
    <>
      <NextSeo
        canonical={`${process.env.SITE_URL}/account`}
        title={getMetaTags({ page: "account" }).title}
      />
      <Breadcrumb parent="صفحه اصلی" sub="حساب من" subChild={"داشبورد"} />
      <div className="page-content pt-50 pb-150">
        <Container fluid>
          <Row>
            <Col lg={10} className="m-auto">
              <Row>
                <Col md={3}>
                  <div className="dashboard-menu">
                    <ul className="nav flex-column" role="tablist">
                      <SingleDashboardMenu
                        id={1}
                        label="داشبورد"
                        icon="settings-sliders"
                        onClick={() => handleOnClick(1)}
                      />

                      {profile?.vendor ? (
                        <SingleDashboardMenu
                          id={2}
                          label="صورت بارهای من و ثبت بار"
                          icon="package"
                          onClick={() => handleOnClick(2)}
                        />
                      ) : null}

                      {/* <SingleDashboardMenu
                        id={3}
                        label="نیاز خریداران"
                        icon="archive"
                        onClick={() => handleOnClick(3)}
                      /> */}

                      {!profile?.vendor ? (
                        <SingleDashboardMenu
                          id={4}
                          label="ویرایش پروفایل"
                          icon="user"
                          onClick={() => handleOnClick(4)}
                        />
                      ) : null}

                      {profile?.vendor ? (
                        <SingleDashboardMenu
                          id={5}
                          label="ویرایش بنگاه"
                          icon="user"
                          onClick={() => handleOnClick(5)}
                        />
                      ) : null}
                      {profile?.vendor ? (
                        <SingleDashboardMenu
                          id={6}
                          label="گالری"
                          icon="user"
                          onClick={() => handleOnClick(6)}
                        />
                      ) : null}

                      <SingleDashboardMenu
                        label="خروج"
                        icon="sign-out"
                        onClick={handleLogout}
                      />
                    </ul>
                  </div>
                </Col>
                <Col md={9}>
                  <div className="account dashboard-content">
                    <Dashboard active={activeIndex === 1} profile={profile} />
                    {profile?.vendor ? (
                      <Products active={activeIndex === 2} />
                    ) : null}
                    <ProductNeeds active={activeIndex === 3} />
                    <Details active={activeIndex === 4} />
                    {profile?.vendor ? (
                      <VendorProfile active={activeIndex == 5} />
                    ) : null}
                    {profile?.vendor ? (
                      <GalleryVendorProfile active={activeIndex == 6} />
                    ) : null}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

interface AccountProps {
  profile: AuthUserProfile;
  deleteLoggedInUserData: any;
}

interface SingleDashboardMenuProps {
  onClick: any;
  label: string;
  id?: number;
  icon?: string;
}

const mapStateToProps = (state: any) => ({
  profile: state.auth.profile,
});

const mapDispatchToProps = { deleteLoggedInUserData };

export default compose(
  withAuthCSR,
  connect(mapStateToProps, mapDispatchToProps)
)(Account);
