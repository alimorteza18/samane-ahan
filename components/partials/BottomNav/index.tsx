import React from "react";
import { Nav, NavItem } from "reactstrap";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import Link from "next/link";

const BottomNavigation: React.FC = () => {
  const router = useRouter();

  return (
    <Nav className={`fixed-bottom ${styles.navbar} d-flex d-sm-none`} justify>
      <NavItem>
        <Link
          prefetch={false}
          href="/top-companies?category=vendor"
          className={`${styles.navLink} ${
            router.asPath === "/top-companies?category=vendor"
              ? styles.activeNavLink
              : ""
          }`}
        >
          <i className="fi-rs-shop" />
          <span>فروشندگان</span>
        </Link>
      </NavItem>
      <NavItem>
        <Link
          prefetch={false}
          href="/top-companies?category=factory"
          className={`${styles.navLink} ${
            router.asPath === "/top-companies?category=factory"
              ? styles.activeNavLink
              : ""
          }`}
        >
          <i className="fi-rs-building" />
          <span>تولیدکنندگان</span>
        </Link>
      </NavItem>
      <NavItem>
        <Link
          prefetch={false}
          href="/price/rebar-ribbed"
          className={`${styles.navLink} ${
            router.pathname === "/price/[type_kind_size]"
              ? styles.activeNavLink
              : ""
          }`}
        >
          <i className="fi-rs-shopping-cart" />
          <span>قیمت ها</span>
        </Link>
      </NavItem>
      <NavItem>
        <Link
          prefetch={false}
          href="/top-companies?category=consumer"
          className={`${styles.navLink} ${
            router.asPath === "/top-companies?category=consumer"
              ? styles.activeNavLink
              : ""
          }`}
        >
          <i className="fi-rs-shopping-bag" />
          <span>مصرف‌کنندگان</span>
        </Link>
      </NavItem>
      <NavItem>
        <Link
          prefetch={false}
          href="/account"
          className={`${styles.navLink} ${
            router.pathname === "/account" ? styles.activeNavLink : ""
          }`}
        >
          <i className="fi-rs-user" />
          <span>پروفایل</span>
        </Link>
      </NavItem>
    </Nav>
  );
};

export default BottomNavigation;
