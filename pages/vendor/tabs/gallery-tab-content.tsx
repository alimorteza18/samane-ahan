import { Col, Row, Container } from "reactstrap";
import { VendorProfileDataContext } from "../[id].page";
// hooks
import { useContext, useRef, useState, useCallback } from "react";
import useHttp from "@/hooks/use-http";
// page
import GallerySingle from "./gallery-single";
interface Tab {
  index: number;
  title: string;
  category: string;
}
const tabs: Tab[] = [
  { index: 1, title: "همه", category: "all" },
  { index: 2, title: "محصولات وانبار", category: "products" },
  { index: 3, title: "دفتر بنگاه", category: "office" },
  { index: 4, title: "ویدیوها", category: "videos" },
  { index: 5, title: "کاتالوگ", category: "catalog" },
];
const VendorGalleryTabContent = () => {
  const { dataGallery, cat, setCat } = useContext(VendorProfileDataContext);
  // tabs
  const [activeIndex, setActiveIndex] = useState(1);
  const handleClick = useCallback(
    (index: number, category: string) => {
      setActiveIndex(index);
      setCat(category);
    },
    [setActiveIndex, setCat]
  );

  return (
    <>
      <div className="product-info">
        <div className="tab-style3">
          <ul
            className="nav nav-tabs text-uppercase mb-30"
            // style={{ display: "flex", flexWrap: "wrap" }}
          >
            {tabs.map((tab) => (
              <li
                className="nav-item"
                // style={{ flexGrow: "1", flexBasis: "0" }}
                key={tab.index}
              >
                <div className="item">
                  <a
                    className={`nav-link ${
                      activeIndex == tab.index ? "active" : ""
                    }`}
                    onClick={() => handleClick(tab.index, tab.category)}
                    data-bs-toggle="tab"
                  >
                    {tab.title}
                  </a>
                </div>
              </li>
            ))}
          </ul>

          <div className="shop_info_tab entry-main-content">
            {tabs.map((tab) => (
              <div
                className={`panel 
                      ${activeIndex === tab.index ? "active" : ""}`}
                key={tab.index}
              >
                <GallerySingle />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorGalleryTabContent;
