import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Image } from "react-bootstrap";
import { setMatomoUser, trackMatomoPage } from "../Matomo";

const HeaderAccount = (props: HeaderAccountProps) => {
  const router = useRouter();

  useEffect(() => {
    if (window?._paq && props?.profile?.user) {
      const profile = props?.profile;

      const matomoUserId = profile?.vendor
        ? profile?.vendor?.name
        : profile?.user?.name
        ? profile?.user?.name
        : profile?.user?.username;

      setMatomoUser(profile?.user?.id + " - " + matomoUserId, {
        userId: profile?.user?.id,
        userName: profile?.user?.name,
        vendorId: profile?.vendor?.id,
        link: profile?.vendor
          ? `https://panel.samaneahan.com/vendors/${profile?.vendor?.id}`
          : `https://panel.samaneahan.com/users/${profile?.user?.id}`,
      });
    } else {
      trackMatomoPage();
    }
  }, [props?.profile?.user]);

  const handleLogout = () => {
    props.deleteLoggedInUserData();
    router.push("/login");
  };
  return (
    <div className="header-action-right">
      <div className="header-action-2">
        {props.profile?.user ? (
          <div className="header-action-icon-2">
            <Link href="/account">
              <Image
                className="svgInject ml-5"
                alt="profile image"
                src={
                  props.profile?.user?.profile_img ??
                  "/assets/imgs/theme/icons/icon-user.svg"
                }
              />
            </Link>
            <Link href="/account">
              <span className="lable ml-0">{props.profile.user?.name}</span>
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
        ) : (
          <div className="header-action-icon-2">
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
    </div>
  );
};

interface HeaderAccountProps {
  totalCompareItems: number;
  totalWishlistItems: number;
  totalCartItems: number;
  profile: AuthUserProfile;
  deleteLoggedInUserData: any;
}

export default HeaderAccount;
