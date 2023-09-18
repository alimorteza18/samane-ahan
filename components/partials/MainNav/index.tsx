import Link from "next/link";
import menu from "@/config/menu";
import type { SingleItemType } from "@/types/configs";

export default function MainNav() {
  return (
    <div className="main-menu main-menu-padding-1 main-menu-lh-2 d-none d-lg-block  font-heading">
      <nav>
        <ul>
          {menu.mainNav.map((item: any, index: number) =>
            !item.subItems ? (
              <li className={item.class} key={index}>
                {item.icon}
                <Link
                  className={`main-nav-item ${item.active ? "active" : ""}`}
                  href={item.href ?? "#"}
                  prefetch={false}
                >
                  {item.label}
                </Link>
              </li>
            ) : !item.MegaMenu ? (
              <li key={index}>
                <Link
                  className={item.active ? "active" : ""}
                  href={item.href ?? "#"}
                  prefetch={false}
                >
                  {item.label}
                  <i
                    style={{ marginRight: " 5px" }}
                    className="fi-rs-angle-down"
                  ></i>
                </Link>
                <ul className="sub-menu">
                  {item.subItems.map((sub: SingleItemType) => (
                    <li>
                      <Link
                        className={sub.active ? "active" : ""}
                        href={sub.href ?? "#"}
                        prefetch={false}
                      >
                        {sub.label}
                      </Link>
                      {sub.subItems && (
                        <ul className="level-menu level-menu-modify">
                          {sub.subItems.map((sub2) => (
                            <li>
                              <Link
                                className={sub2.active ? "active" : ""}
                                href={sub2.href ?? "#"}
                                prefetch={false}
                              >
                                {sub2.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={index} className={item.class}>
                <Link href={item.href ?? "#"} prefetch={false}>
                  {item.label}
                  <i className="fi-rs-angle-down"></i>
                </Link>
                {/* @ts-ignore */}
                <item.MegaMenu />
              </li>
            )
          )}
        </ul>
      </nav>
    </div>
  );
}
