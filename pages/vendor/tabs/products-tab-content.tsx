// ** Hooks
import { useContext, useState, useCallback } from "react";
// ** Components
import Pagination from "@/components/elements/pagination";

import SingleProductCard from "./single-product-card";
// ** Services
import { VendorProfileDataContext } from "../[id].page";
import { Progress } from "reactstrap";
import useAuth from "@/hooks/use-auth";

const VendorProductsTabContent = () => {
  const { data, products, productsPagination, productsLoading, setTypeId } =
    useContext(VendorProfileDataContext);
  // tabs
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index: number, typeId: any) => {
    setActiveIndex(index);
    setTypeId(typeId);
  };

  const { isEditMode } = useAuth();

  return (
    <>
      <div className="product-info">
        <div className="tab-style3">
          <ul className="nav nav-tabs text-uppercase mb-30">
            {data?.permissions.map((perm, index) => (
              <li className="nav-item" key={perm.id}>
                <div className="item">
                  <a
                    className={`nav-link ${
                      activeIndex === index ? "active" : ""
                    }`}
                    onClick={() => handleClick(index, perm.id)}
                    data-bs-toggle="tab"
                  >
                    {perm.type}
                  </a>
                </div>
              </li>
            ))}
          </ul>

          {productsLoading ? (
            <Progress animated value={100} />
          ) : (
            <div className="shop_info_tab entry-main-content">
              {products?.data?.length
                ? products.data.map((product) => (
                    <div className="mb-10" key={product.id}>
                      <SingleProductCard
                        product={product}
                        isEditMode={isEditMode}
                      />
                    </div>
                  ))
                : null}
            </div>
          )}
        </div>

        {products?.data?.length ? (
          <Pagination
            page={productsPagination?.page}
            perPage={productsPagination?.perPage}
            setPage={productsPagination?.changePage}
            totalPages={productsPagination?.lastPage}
            autoScrollUp={false}
          />
        ) : null}
      </div>
    </>
  );
};

export default VendorProductsTabContent;
