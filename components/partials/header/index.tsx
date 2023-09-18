import Link from "next/link";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import MainNav from "@/components/partials/MainNav";
import HeaderAccount from "./account";
import { deleteLoggedInUserData } from "@/redux/action/auth";
import { Container } from "react-bootstrap";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
import AdminBar from "./admin-bar";

const Header = ({
  totalCartItems,
  totalCompareItems,
  toggleClick,
  totalWishlistItems,
  profile,
  adminProfile,
  deleteLoggedInUserData,
}: HeaderProps) => {
  const router = useRouter();

  const handleLogout = () => {
    deleteLoggedInUserData();
    router.push("/login");
  };
  const [isToggled, setToggled] = useState(false);
  const [scroll, setScroll] = useState(0);
  const [decHight, setDecHight] = useState(true);

  useEffect(() => {
    let prevScrollpos = window.pageYOffset;
    const handelScroll = () => {
      let currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        setDecHight(false);
      } else {
        setDecHight(true);
      }
      if (window.scrollY < 88) setDecHight(true);
      prevScrollpos = currentScrollPos;
      const scrollCheck = window.scrollY >= 100;
      //@ts-ignore
      if (scrollCheck !== scroll) {
        //@ts-ignore
        setScroll(scrollCheck);
      }
    };
    window.addEventListener("scroll", handelScroll);
    return () => {
      window.removeEventListener("scroll", handelScroll);
    };
  }, []);

  const handleToggle = () => setToggled((prevState) => !prevState);

  const categories = [
    { id: 1, title: "تیرآهن ", slug: "beam-common" },
    { id: 2, title: "میلگرد", slug: "rebar-ribbed" },
    { id: 3, title: "قوطی پروفیل", slug: "profile-common" },
    { id: 5, title: "ورق", slug: "steel_plate-black" },
    { id: 6, title: "نبشی", slug: "channel_bar" },
    { id: 6, title: "ناودانی", slug: "angle_bar" },
  ];

  return (
    <>
      <header className="header-area header-style-1 header-height-2">
        {adminProfile ? (
          <AdminBar
            profile={adminProfile}
            deleteLoggedInUserData={deleteLoggedInUserData}
          />
        ) : null}
        <div
          style={{ flexFlow: "column" }}
          className={
            decHight
              ? "header-bottom header-bottom-bg-color sticky-bar d-none d-lg-flex"
              : "header-bottom header-bottom-bg-color sticky-bar stick"
          }
        >
          <div className="header-middle header-middle-ptb-1 d-none d-lg-block">
            <Container>
              <div className="header-wrap">
                <div className="logo logo-width-1">
                  <Link href="/" prefetch={false}>
                    <img src="/assets/imgs/theme/logo-black.png" alt="logo" />
                  </Link>
                </div>
                <div className="header-right">
                  <div className="search-style-2"></div>

                  <HeaderAccount
                    totalCartItems={totalCartItems}
                    totalCompareItems={totalCompareItems}
                    totalWishlistItems={totalWishlistItems}
                    profile={profile}
                    deleteLoggedInUserData={deleteLoggedInUserData}
                  />
                </div>
              </div>
            </Container>
          </div>
        </div>

        <div
          style={{
            top: decHight ? "0" : "85px",
          }}
          className={
            scroll
              ? "header-bottom header-bottom-bg-color sticky-bar stick custome"
              : "header-bottom header-bottom-bg-color sticky-bar"
          }
        >
          <Container>
            <div className="header-wrap header-space-between position-relative">
              <div className="logo logo-width-1 d-block d-lg-none">
                <Link href="/" prefetch={false}>
                  <img src="/assets/imgs/theme/logo-black.png" alt="logo" />
                </Link>
              </div>
              <div className="header-nav d-none d-lg-flex">
                <div className="main-categori-wrap d-none d-lg-block">
                  <a
                    className={`categories-button-active ${styles["categories-button"]}`}
                    onClick={handleToggle}
                  >
                    <span className="fi-rs-apps" />
                    <span className="et">قیمت آهن آلات</span>
                    <i className="fi-rs-angle-down" />
                  </a>

                  <div
                    className={
                      isToggled
                        ? "categories-dropdown-wrap categories-dropdown-active-large font-heading open"
                        : "categories-dropdown-wrap categories-dropdown-active-large font-heading"
                    }
                  >
                    <div className="d-flex categori-dropdown-inner">
                      <ul>
                        {categories.map((item, index) => {
                          if (index < 3) {
                            return (
                              <Link
                                key={index}
                                href={`/price/${item?.slug}`}
                                prefetch={false}
                              >
                                <li onClick={handleToggle}>
                                  {/* <img src={item?.icon} alt="" /> */}
                                  <i
                                    className={`icon icon-${item?.id} ml-5 text-brand`}
                                    style={{ fontSize: "20px" }}
                                  />
                                  <span className="text-black">
                                    {item?.title}
                                  </span>
                                </li>
                              </Link>
                            );
                          }
                        })}
                      </ul>
                      <ul>
                        {categories.map((item, index) => {
                          if (index >= 3) {
                            return (
                              <Link
                                key={index}
                                href={`/price/${item?.slug}`}
                                prefetch={false}
                              >
                                <li onClick={handleToggle}>
                                  {/* <img src={item?.icon} alt="" /> */}
                                  <i
                                    className={`icon icon-${item?.id} ml-5 text-brand`}
                                    style={{ fontSize: "20px" }}
                                  />
                                  <span className="text-black">
                                    {item?.title}
                                  </span>
                                </li>
                              </Link>
                            );
                          }
                        })}
                      </ul>
                    </div>
                  </div>
                </div>

                <MainNav />
              </div>

              {router?.pathname != "/vendor/[id]" ? (
                <div className="hotline d-none d-lg-flex">
                  <img
                    src="/assets/imgs/theme/icons/icon-headphone.svg"
                    alt="hotline"
                  />

                  <p style={{ fontSize: "20px" }}>
                    91305404 (021)
                    <span style={{ fontFamily: "IRANSansXFaNum" }}>
                      دفتر مرکزی
                    </span>
                  </p>
                </div>
              ) : null}

              <div className="header-action-icon-2 d-block d-lg-none">
                <div
                  className="burger-icon burger-icon-white"
                  onClick={toggleClick}
                >
                  <span className="burger-icon-top" />
                  <span className="burger-icon-mid" />
                  <span className="burger-icon-bottom" />
                </div>
              </div>

              {profile?.user ? (
                <div className="header-action-right d-block d-lg-none">
                  <div className="header-action-2">
                    <div className="header-action-icon-2">
                      <div className="header-action-icon-2">
                        <img
                          className="svgInject ml-5"
                          alt="Nest"
                          src="/assets/imgs/theme/icons/icon-user.svg"
                        />
                        <Link href="/account" prefetch={false}>
                          <span className="lable ml-0">
                            {profile.user?.name ?? "بدون نام"}
                          </span>
                        </Link>
                        <div className="cart-dropdown-wrap cart-dropdown-hm2 account-dropdown">
                          <ul>
                            <li>
                              <Link href="/account">
                                <i className="fi fi-rs-user mr-10" />
                                داشبورد
                              </Link>
                            </li>
                            <li>
                              <Link href="/account?tab=5">
                                <i className="fi fi-rs-settings-sliders mr-10" />
                                تنظیمات
                              </Link>
                            </li>
                            <li>
                              <a onClick={handleLogout}>
                                <i className="fi fi-rs-sign-out mr-10" />
                                خروج
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="header-action-icon-2 d-md-none">
                  <Link href="/login" className="mini-cart-icon">
                    <i
                      className="fi fi-rs-sign-in ml-10"
                      style={{ fontSize: "30px" }}
                    />
                  </Link>
                  <Link href="/login">
                    <span className="lable">ورود</span>
                  </Link>
                </div>
              )}
            </div>
          </Container>
        </div>
      </header>
    </>
  );
};

interface HeaderProps {
  totalCartItems: any;
  totalCompareItems: any;
  toggleClick: any;
  totalWishlistItems: any;
  profile: AuthUserProfile;
  adminProfile: any;
  deleteLoggedInUserData: any;
}

const mapStateToProps = (state: any) => ({
  totalCartItems: state.cart.length,
  totalCompareItems: state.compare.items.length,
  totalWishlistItems: state.wishlist.items.length,
  profile: state.auth.profile,
  adminProfile: state.auth.admin_profile,
});

const mapDispatchToProps = { deleteLoggedInUserData };

export default connect(mapStateToProps, mapDispatchToProps)(Header);

{
  /* <div
      className="d-flex"
      style={{
        justifyContent: "center",
        fontWeight: "500",
        fontSize: "12px",
      }}
    >
      <Link href="/login">
        <i
          className="fi fi-rs-sign-in ml-10"
          style={{ color: "#333333" }}
        />
      </Link>
      <Link href="/login" style={{ color: "#333333" }}>
        <span className="lable">ثبت‌نام / ورود</span>
      </Link>
    </div> */
}
