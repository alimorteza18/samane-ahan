import LazyLoad from "react-lazyload";
import Link from "next/link";

interface VendorColProps {
  row: Product;
  isMobile: boolean;
}

const VendorCol = ({ row, isMobile }: VendorColProps) => {
  const vendorCat = () => {
    switch (row.userVendor.category) {
      case "factory":
        return "تولیدکننده";
      case "vendor":
      default:
        return "فروشنده";
    }
  };

  const vendorCatColor = () => {
    switch (row.userVendor.category) {
      case "factory":
        return "#008000";
      case "vendor":
      default:
        return "#0089d6";
    }
  };

  return (
    <Link
      href={`/vendor/${row.userVendor.id}`}
      className="items-center d-flex product-table-vendor"
      prefetch={false}
      style={{
        // marginRight: "5px",
        alignItems: "center",
        color: "black",
        fontSize: isMobile ? "10px" : "15px",
      }}
    >
      <div className="profile">
        <LazyLoad once>
          <img
            style={{ borderColor: vendorCatColor() }}
            className="roupxnded-circle ml-5"
            src={
              row.userVendor.vendor_profile_img
                ? row.userVendor.vendor_profile_img
                : "/assets/images/vendor/default.svg"
            }
          />
        </LazyLoad>

        <div style={{ position: "relative" }}>
          <span style={{ backgroundColor: vendorCatColor() }}>
            {vendorCat()}
          </span>
        </div>
      </div>

      <div className="text-xs truncate cell-title mr-5">
        {row.userVendor.name}
      </div>
    </Link>
  );
};

export default VendorCol;
