import { useEffect, useState } from "react";
import VendorInfoTabContent from "./info-tab-content";
import VendorProductsTabContent from "./products-tab-content";
import VendorGalleryTabContent from "./gallery-tab-content";
import VendorReviewsTabContent from "./reviews-tab-content";
import { UserVendorDataProps } from "../header";

const VendorTabs = ({ data }: UserVendorDataProps) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const { category } = data;
  const handleClick = (index: any) => setActiveIndex(index);
  const checkActive = (index: any, className: any) =>
    activeIndex === index ? className : "";

  const categoryTitles: any = {
    vendor: "بنگاه",
    factory: "کارخانه",
    consumer: "شرکت",
  };

  const title = categoryTitles[category];

  const tabs = [
    {
      title: `شناسه ${title}`,
      tabId: 1,
      component: <VendorInfoTabContent data={data} />,
    },
    { title: "کالاها", tabId: 2, component: <VendorProductsTabContent /> },
    { title: "گالری", tabId: 3, component: <VendorGalleryTabContent /> },
    {
      title: "نظرات",
      tabId: 4,
      component: <VendorReviewsTabContent data={data} />,
    },
  ];

  return (
    <>
      <div className="product-info p-0 mt-10 mb-30">
        <div className="tab-style3">
          <ul
            className="nav nav-tabs text-uppercase mb-10 pt-5 pb-5"
            style={{
              flexWrap: "wrap",
              background: "#fff",
              borderRadius: "10px",
            }}
          >
            {tabs.map((tab) => (
              <li
                key={tab.tabId}
                className="nav-item"
                style={{ flexGrow: "1", flexBasis: "0" }}
              >
                <div className="item">
                  <a
                    className={`nav-link ${checkActive(tab.tabId, "active")}`}
                    onClick={() => handleClick(tab.tabId)}
                    data-bs-toggle="tab"
                  >
                    {tab.title}
                  </a>
                </div>
              </li>
            ))}
          </ul>

          <div
            className="shop_info_tab entry-main-content"
            style={{
              background: "#fff",
              padding: "33px",
              borderRadius: "10px",
            }}
          >
            {tabs.map((tab) => (
              <div
                key={tab.tabId}
                className={`panel ${checkActive(tab.tabId, "active")}`}
                style={{ fontSize: "16px" }}
              >
                {tab.component}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorTabs;
