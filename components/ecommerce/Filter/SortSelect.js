import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateProductFilters } from "../../../redux/action/productFiltersAction";

const SortSelect = ({ updateProductFilters }) => {
  const Router = useRouter();
  const searchTerm = Router.query.search;

  const [featured, setFeatured] = useState("");

  useEffect(() => {
    const filters = {
      featured,
    };

    updateProductFilters(filters);
  }, [searchTerm, featured]);

  const seleceOption = (e) => {
    setFeatured(e.target.value);
  };

  return (
    <>
      <div className="sort-by-product-wrap">
        <div className="sort-by">
          <span>
            <i className="fi-rs-apps-sort"></i>
            مرتب سازی:
          </span>
        </div>
        <div className="sort-by-dropdown-wrap custom-select">
          <select onChange={(e) => seleceOption(e)}>
            <option value="">پیش‌فرض</option>
            <option value="featured">ویژه</option>
            <option value="trending">محبوب</option>
            <option value="lowToHigh">کمترین قیمت</option>
            <option value="highToLow">بیشترین قیمت</option>
          </select>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  products: state.products.items,
});

const mapDidpatchToProps = {
  updateProductFilters,
};

export default connect(mapStateToProps, mapDidpatchToProps)(SortSelect);
