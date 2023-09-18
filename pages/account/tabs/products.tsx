// ** Hooks
import React, { useEffect, useState } from "react";
import useHttp from "@/hooks/use-http";
// ** Components
import DataTable from "@/components/elements/data-table";
import Switch from "@/components/input/switch";
import { Col, Row } from "react-bootstrap";
import { TableColumn } from "react-data-table-component";
// ** Partials
import NewProductModal from "./new-product-modal";
// ** Services
import { dateToPersianDateTimeString } from "@/services/datetime-services";
import { seperateThousands } from "@/services/number-services";
import { deleteUserProduct, fetchUserProducts, toggleUserProductVisibility } from "@/services/product-services"; //prettier-ignore
import { fetchProductTypes, PRODUCT_TYPE } from "@/services/product-type-services"; //prettier-ignore
import { FetchProductsProps } from "@/types/services";
import { toast } from "react-toastify";
import UpdateProductModal from "./update-product-modal";
import { Swiper, SwiperSlide } from "swiper/react";

const Products = ({ active = false }) => {
  const [selectedType, setSelectedType] = useState(-1);
  const [showNewModal, setShowNewModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [product, setProduct] = useState({});

  const { data, loading, updateData, execute } = useHttp<
    Product[],
    FetchProductsProps
  >(fetchUserProducts, { type_id: selectedType, enabled: -1 }, true);

  const { data: types = [] } = useHttp<ProductType[]>(
    fetchProductTypes,
    // prettier-ignore
    { ids: [ PRODUCT_TYPE.GIRDER, PRODUCT_TYPE.REBAR, PRODUCT_TYPE.CAN, PRODUCT_TYPE.SHEET, PRODUCT_TYPE.CORNER, PRODUCT_TYPE.STUD ] },
    true
  );

  const handleToggleProductVisibility = async (row: Product) => {
    try {
      const res = await toggleUserProductVisibility({ id: row.id });
      updateData({
        newDatas: { ...row, enabled: res.data.data.enabled },
        id: row.id,
      });
      toast.success("وضعیت انتشار محصول با موفقیت تغییر یافت", { rtl: true });
    } catch (err) {
      console.error(err);
      toast.error("مشکلی در تغییر وضعیت انتشار محصول رخ داده است");
    }
  };
  const handleDeleteProduct = async (id: number | string) => {
    try {
      await deleteUserProduct({ id });
      toast.success("محصول با موفقیت حذف شد", { rtl: true });
      execute();
    } catch (err) {
      console.error(err);
      toast.error("مشکلی در حذف محصول رخ داده است");
    }
  };

  const [columns, setColumns] = useState<TableColumn<Product>[]>([]);

  useEffect(() => {
    switch (selectedType) {
      case PRODUCT_TYPE.GIRDER:
        setColumns([
          { name: "دسته‌بندی", selector: (row) => row?.details?.kind },
          { name: "استاندارد", selector: (row) => row?.details?.standard },
          { name: "سایز", selector: (row) => row?.details?.size },
        ]);
        break;
      case PRODUCT_TYPE.REBAR:
        setColumns([
          { name: "دسته‌بندی", selector: (row) => row?.details?.kind },
          { name: "استاندارد", selector: (row) => row?.details?.standard },
          { name: "سایز", selector: (row) => row?.details?.size },
          { name: "مود", selector: (row) => row?.details?.mode },
        ]);
        break;
      case PRODUCT_TYPE.CAN:
        setColumns([
          { name: "دسته‌بندی", selector: (row) => row?.details?.kind },
          { name: "ضخامت", selector: (row) => row?.details?.thickness },
          { name: "طول", selector: (row) => row?.details?.length },
          { name: "ابعاد", selector: (row) => row?.details?.dimension },
        ]);
        break;
      case PRODUCT_TYPE.SHEET:
        setColumns([
          { name: "دسته‌بندی", selector: (row) => row?.details?.kind },
          { name: "رنگ", selector: (row) => row?.details?.color },
          { name: "استاندارد", selector: (row) => row?.details?.standard },
          { name: "ضخامت", selector: (row) => row?.details?.thickness },
          { name: "عرض", selector: (row) => row?.details?.width },
        ]);
        break;
      case PRODUCT_TYPE.CORNER:
        setColumns([
          { name: "ضخامت", selector: (row) => row?.details?.thickness },
          { name: "طول", selector: (row) => row?.details?.length },
          { name: "ابعاد", selector: (row) => row?.details?.dimension },
        ]);
        break;
      case PRODUCT_TYPE.STUD:
        setColumns([
          { name: "دسته‌بندی", selector: (row) => row?.details?.kind },
          { name: "ضخامت", selector: (row) => row?.details?.thickness },
          { name: "استاندارد", selector: (row) => row?.details?.standard },
          { name: "سایز", selector: (row) => row?.details?.size },
        ]);
        break;
      case -1:
      default:
        setColumns([
          { name: "نام کالا", selector: (row) => row?.type_kind_size },
        ]);
        break;
    }
  }, [selectedType]);

  return (
    <div className={"tab-pane fade " + (active ? "active show" : "hidden")}>
      <div className="">
        <div className="product-registered mt-20 card-header">
          <h4 className="mb-0">
            بارهای اعلامی من{" "}
            <span
              className="text-brand"
              style={{ fontSize: "18px", cursor: "pointer" }}
              onClick={() => setShowNewModal(true)}
            >
              (افزودن)
            </span>
          </h4>
        </div>
        <Row className="mb-10 mt-30">
          <Col md={12} className="m-auto">
            <Row>
              <Swiper
                breakpoints={{
                  300: { slidesPerView: 6, spaceBetween: 5 },
                  480: { slidesPerView: 6, spaceBetween: 5 },
                  640: { slidesPerView: 6, spaceBetween: 5 },
                  768: { slidesPerView: 6, spaceBetween: 10 },
                  1024: { slidesPerView: 6, spaceBetween: 10 },
                  1200: { slidesPerView: 6, spaceBetween: 5 },
                }}
                autoplay
              >
                {types?.map((type) => (
                  <SwiperSlide>
                    <Col
                      key={type.id}
                      style={{
                        cursor: "pointer",
                        color: selectedType === type.id ? "#ffbd16" : "black",
                      }}
                      onClick={() => setSelectedType(type.id)}
                    >
                      <i
                        className={`icon icon-${type.id}`}
                        style={{
                          fontSize: "15px",
                        }}
                      />
                      <span
                        className="list-inline-item"
                        style={{
                          color: selectedType === type.id ? "#ffbd16" : "black",
                        }}
                      >
                        {" "}
                        {type?.id === 3 ? "قوطی" : type.type}
                      </span>
                    </Col>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Row>
          </Col>
        </Row>
        <div className="card-body">
          <DataTable
            progressPending={loading}
            pagination={false}
            data={data}
            columns={[
              ...columns,
              {
                name: "محل بار",
                selector: (row) => row?.details?.freight_place,
              },
              {
                name: "کارخانه",
                selector: (row) => row.details?.factory ?? "-",
                width: "150px",
              },
              {
                name: "قیمت",
                selector: (row) => seperateThousands(row?.vendor_price),
                width: "100px",
              },
              { name: "تاریخ", selector: (row) => dateToPersianDateTimeString(row?.price_confirmed_at), width: '150px' }, //prettier-ignore
              { name: "فعال‌سازی", cell: (row) => <Switch checked={row.enabled} onChange={(e) => handleToggleProductVisibility(row)} />, width: '100px' }, //prettier-ignore
              {
                name: "عملیات",
                width: "100px",
                cell: (row) => (
                  <>
                    <a
                      onClick={() => {
                        setShowUpdateModal(true), setProduct(row);
                      }}
                    >
                      <i className="fi-rs-edit" />
                    </a>
                    <a onClick={() => handleDeleteProduct(row.id)}>
                      <i className="fi-rs-trash mr-20" />
                    </a>
                  </>
                ),
              },
            ]}
          />
        </div>
      </div>
      <NewProductModal
        show={showNewModal}
        setShow={setShowNewModal}
        types={types}
        refreshProducts={execute}
      />
      <UpdateProductModal
        show={showUpdateModal}
        setShow={setShowUpdateModal}
        types={types}
        refreshProducts={execute}
        product={product}
        // @ts-ignore
        key={product.id}
      />
    </div>
  );
};

export default Products;
