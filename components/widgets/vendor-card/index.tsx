import Link from "next/link";

type VendorProps = {
  id: number;
  vendor_profile_img: string;
  name: string;
  phone: string;
  modir_name: string;
  province_name: string;
  category: string;
};

export default function VendorCard(props: VendorProps) {
  const {
    id,
    vendor_profile_img,
    name,
    province_name,
    modir_name,
    phone,
    category,
  } = props;

  const getCatTitle = () => {
    switch (category) {
      case "vendor":
        return "فروشنده";
      case "consumer":
        return "مصرف کننده";
      case "factory":
        return "کارخانه";
    }
  };

  const getCatColor = () => {
    switch (category) {
      case "vendor":
        return "hot";
      case "consumer":
        return "new";
      case "factory":
        return "best";
    }
  };

  return (
    <div className="vendor-wrap style-2 mb-40">
      <div className="product-badges product-badges-position product-badges-mrg">
        <span className={getCatColor()}>{getCatTitle()}</span>
      </div>
      <div className="vendor-img-action-wrap">
        <div className="vendor-img">
          <Link
            className="vendor-card-btn"
            aria-label={name}
            href={`vendor/${id}`}
          >
            <img
              className="default-img"
              style={{ width: "130px", height: "130px" }}
              src={vendor_profile_img}
              alt=""
            />
          </Link>
        </div>
        <div className="mt-10">
          <span className="font-small total-product">تعداد محصول</span>
        </div>
      </div>
      <div className="vendor-content-wrap">
        <div className="mb-30">
          <div className="product-category">
            <span className="text-muted">{modir_name}</span>
          </div>
          <h2 className="mb-5 fs-6">
            <Link
              className="vendor-card-btn"
              aria-label={name}
              href={`vendor/${id}`}
            >
              {name}
            </Link>
          </h2>
          <div className="product-rate-cover">
            <div className="product-rate d-inline-block">
              <div className="product-rating" style={{ width: "90%" }}></div>
            </div>
            <span className="font-small ml-5 text-muted"> (4.0)</span>
          </div>
          <div className="vendor-info d-flex justify-content-between align-items-end mt-30">
            <ul className="contact-infor text-muted">
              <li>
                <img src="/assets/imgs/theme/icons/icon-location.svg" alt="" />
                <span>{province_name}</span>
              </li>
              <li>
                <img src="/assets/imgs/theme/icons/icon-contact.svg" alt="" />
                <span>{phone}</span>
              </li>
            </ul>
            <Link
              href={`vendor/${id}`}
              className="btn btn-xs"
              style={{ marginRight: "40px" }}
              aria-label={name}
            >
              مشاهده{" "}
              <i
                className="fi-rs-arrow-small-left"
                style={{ marginRight: "2px" }}
              ></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
