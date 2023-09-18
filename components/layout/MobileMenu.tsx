// ** Hooks
import { useState } from "react";
import useClickOutside from "../../util/outsideClick";
// ** Components
import Link from "next/link";
// ** Services
import menu from "@/config/menu";
import { SingleItemType } from "@/types/configs";

const MobileMenu = ({ isToggled, toggleClick }: any) => {
  const [isActive, setIsActive] = useState<{
    status: boolean;
    key?: string | number;
  }>({
    status: false,
    key: "",
  });

  const handleToggle = (key: string | number) => {
    if (isActive.key === key) {
      setIsActive({
        status: false,
      });
    } else {
      setIsActive({
        status: true,
        key,
      });
    }
  };

  let domNode = useClickOutside(() => {
    setIsActive({
      status: false,
    });
  });
  return (
    <>
      <div
        className={
          isToggled
            ? "mobile-header-active mobile-header-wrapper-style sidebar-visible"
            : "mobile-header-active mobile-header-wrapper-style"
        }
      >
        <div className="mobile-header-wrapper-inner">
          <div className="mobile-header-top">
            <div className="mobile-header-logo">
              <div className="mobile-menu-close close-style-wrap close-style-position-inherit mb-10">
                <button
                  className="close-style search-close"
                  style={{ border: "0px", color: "black" }}
                  onClick={toggleClick}
                >
                  &#10006;
                </button>
              </div>
              <Link href="/">
                <img src="/assets/imgs/theme/logo-black.png" alt="logo" />
              </Link>
            </div>
          </div>
          <div className="mobile-header-content-area">
            <div className="mobile-search search-style-3 mobile-header-border">
              <form action="#">
                <button type="submit">
                  <i className="fi-rs-search" />
                </button>
                <input type="text" placeholder="جستجو در سایت" />
              </form>
            </div>
            <div className="mobile-menu-wrap mobile-header-border">
              <nav>
                <ul
                  className="mobile-menu"
                  //@ts-ignore
                  ref={domNode}
                >
                  {menu.mobileNav.map((item: SingleItemType, index: number) =>
                    !item.subItems ? (
                      <Link
                        key={index}
                        href={item.href ?? "#"}
                        className="text-black "
                        prefetch={false}
                      >
                        <li
                          className={isActive.key == index ? "active" : ""}
                          onClick={toggleClick}
                        >
                          <div
                            className="ml-10"
                            style={{ display: "contents" }}
                            // @ts-ignore
                            dangerouslySetInnerHTML={{ __html: item.icon }}
                          ></div>

                          <span
                            style={{ fontSize: "14px", fontWeight: "400" }}
                            className="mb-5 mr-5"
                          >
                            {item.label}
                          </span>
                        </li>
                      </Link>
                    ) : (
                      <li
                        className={
                          isActive.key == index
                            ? "menu-item-has-children active"
                            : "menu-item-has-children"
                        }
                      >
                        <div
                          className="ml-20"
                          style={{ display: "contents" }}
                          // @ts-ignore
                          dangerouslySetInnerHTML={{ __html: item.icon }}
                        ></div>
                        <span
                          className="menu-expand"
                          onClick={() => handleToggle(index)}
                        >
                          <i className="fi-rs-angle-small-down" />
                        </span>
                        <Link
                          style={{ fontSize: "14px", fontWeight: "400" }}
                          href={item.href ?? "#"}
                          className="text-black mb-5 mr-5"
                          prefetch={false}
                        >
                          {item.label}
                        </Link>
                        <ul
                          className={
                            isActive.key == index ? "dropdown" : "d-none"
                          }
                        >
                          {item.subItems.map((sub: SingleItemType, k) => (
                            <li
                              key={k}
                              onClick={toggleClick}
                              style={{ display: "block !important" }}
                            >
                              <Link
                                href={sub.href ?? "#"}
                                className="text-black"
                                prefetch={false}
                              >
                                <span
                                  style={{
                                    fontSize: "14px",
                                    lineHeight: "21px",
                                    fontWeight: "400",
                                  }}
                                >
                                  {sub.label}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    )
                  )}
                </ul>
              </nav>
            </div>
            <div className="mobile-footer mt-50">
              <span>دفتر مرکزی : تهران،بهجت آباد</span>
              <div
                className="d-flex mt-10 mb-30"
                style={{ alignItems: "center" }}
              >
                <svg
                  width="24"
                  height="21"
                  viewBox="0 0 24 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.0875 11.0614V9.67891C21.0875 7.36163 20.167 5.13923 18.5284 3.50065C16.8898 1.86207 14.6675 0.941528 12.3501 0.941528C10.0329 0.941528 7.81046 1.86207 6.17192 3.50065C4.53334 5.13923 3.6128 7.36163 3.6128 9.67891V11.0614C2.59456 11.5097 1.76125 12.2942 1.25237 13.2836C0.743484 14.273 0.589918 15.4071 0.817377 16.4963C1.04484 17.5853 1.63952 18.5632 2.50186 19.2662C3.3642 19.9692 4.44187 20.3546 5.55444 20.3579H7.49605V10.6497H5.55444V9.67891C5.55444 7.87655 6.27041 6.14804 7.54485 4.8736C8.81934 3.59915 10.5479 2.88317 12.3501 2.88317C14.1525 2.88317 15.881 3.59915 17.1555 4.8736C18.4299 6.14804 19.1459 7.87655 19.1459 9.67891V10.6497H17.2042V18.4163H13.321V20.3579H19.1459C20.2585 20.3546 21.3361 19.9692 22.1985 19.2662C23.0608 18.5632 23.6555 17.5853 23.883 16.4963C24.1105 15.4071 23.9569 14.273 23.448 13.2836C22.9391 12.2942 22.1058 11.5097 21.0875 11.0614ZM5.55444 18.4163C4.782 18.4163 4.04121 18.1094 3.49502 17.5633C2.94882 17.0171 2.64198 16.2763 2.64198 15.5038C2.64198 14.7314 2.94882 13.9906 3.49502 13.4444C4.04121 12.8982 4.782 12.5914 5.55444 12.5914V18.4163ZM19.1459 18.4163V12.5914C19.9183 12.5914 20.6591 12.8982 21.2053 13.4444C21.7515 13.9906 22.0583 14.7314 22.0583 15.5038C22.0583 16.2763 21.7515 17.0171 21.2053 17.5633C20.6591 18.1094 19.9183 18.4163 19.1459 18.4163Z"
                    fill="#253D4E"
                  />
                </svg>
                <label htmlFor="">91305404 (021)</label>
              </div>
              <span>ما را در شبکه های اجتماعی دنبال کنید</span>
              <ul>
                {menu.socialIcon.map((item: any, j: any) => (
                  <li className="mobile-social-icon" key={j}>
                    <a href="">
                      <div
                        dangerouslySetInnerHTML={{ __html: item.icon }}
                      ></div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
