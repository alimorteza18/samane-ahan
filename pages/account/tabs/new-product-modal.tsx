// ** Hooks
import { Dispatch, SetStateAction, useState } from "react";
import useHttp from "@/hooks/use-http";
import useHttpSave from "@/hooks/use-http-save";
// ** Components
import Modal from "react-bootstrap/Modal";
import Button from "@/components/input/button";
import FormikSelect from "@/components/input/select/formik";
import { Form, Formik } from "formik";
import { Col, Container, Row } from "react-bootstrap";
import FormikNumberField from "@/components/input/number-field/formik";
import { toast } from "react-toastify";
// ** Services
import detailService from "@/services/product-details-services";
import { PRODUCT_TYPE } from "@/services/product-type-services";
import { createUserProduct } from "@/services/product-services";
import { convertErrors, query } from "@/services/util-service";
import { PRODUCT_KIND } from "@/services/product-kind-services";

function NewProductModal({
  show,
  setShow,
  types,
  refreshProducts,
}: NewProductModal) {
  const [type, setType] = useState<{id: number, value: string}>({ id: 0, value: "" }); //prettier-ignore
  const [kind_id, setKindId] = useState<number|null>(null); //prettier-ignore

  const {
    data: filters,
    loading: filtersLoading,
    customDropdown: dd,
  } = useHttp(
    query,
    {
      dropdownEmptyItem: true,
      product_kinds: { type: type.id },
      product_freight_places: { stay: true },
      factories: { type: type.id },
      product_sizes: { type: type.id },
      product_lengths: { type: type.id },
      product_widths: { type: type.id },
      product_colors: { type: type.id },
      product_thicknesses: { type: type.id },
      product_standards: { type: type.id },
      product_modes: { type: type.id },
      product_weight_scales: { type: type.id, fields: ["id", "title"] },
    },
    true
  );
  const { dropdown: dimensionsXDD } = useHttp(detailService.fetchProductDimensions, { dimension_type: "x", type: type.id, dropdownEmptyItem: true }); //prettier-ignore
  const { dropdown: dimensionsYDD } = useHttp(detailService.fetchProductDimensions, { dimension_type: "y", type: type.id, dropdownEmptyItem: true }); //prettier-ignore

  const handleClose = () => setShow(false);
  // prettier-ignore
  const typeFields = {
    [PRODUCT_TYPE.GIRDER]: ['size', 'standard', 'kind'],
    [PRODUCT_TYPE.REBAR]: ['size', 'standard', 'mode', 'kind'],
    [PRODUCT_TYPE.CAN]: ['thickness', 'height', 'length', 'dimension', 'kind'],
    [PRODUCT_TYPE.SHEET]: {
      kinds: {
        [PRODUCT_KIND.SHEET_COLORED]: ['width', 'color', 'standard', 'kind', 'thickness'],
        default: ['width',  'standard', 'kind', 'thickness']
      },
    },
    [PRODUCT_TYPE.STUD]: ['size', 'standard', 'kind'],
    [PRODUCT_TYPE.CORNER]: ['thickness', 'length', 'dimension'],
  };

  const typeHasField = (field: string) => {
    //@ts-ignore
    if (typeFields[type.id]?.kinds) {
      //@ts-ignore
      if (typeFields[type.id]?.kinds[kind_id]) {
        //@ts-ignore
        return typeFields[type.id]?.kinds[kind_id]?.includes(field);
      } else {
        //@ts-ignore
        return typeFields[type.id]?.kinds?.default?.includes(field);
      }
    } else {
      //@ts-ignore
      return typeFields[type.id]?.includes(field);
    }
  };

  const { execute, saving } = useHttpSave(createUserProduct);

  const handleSave = async (values: any, helpers: any) => {
    try {
      await execute(values);
      setShow(false);
      refreshProducts();
      toast.success("محصول با موفقیت اضافه شد", { rtl: true });
    } catch (err: any) {
      if (err?.response?.status == 422) {
        const errs = err?.response?.data?.errors;
        helpers.setErrors(convertErrors(errs));
      }
    }
  };
  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Formik
        initialValues={{
          type_id: null,
        }}
        enableReinitialize
        onSubmit={handleSave}
      >
        {({ values, setFieldValue, errors }) => (
          <Form>
            <Modal.Header>
              <Modal.Title>افزودن بار جدید</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <Row>
                  کالای مورد نظر را انتخاب کنید
                  {errors?.type_id ? (
                    // @ts-ignore
                    <p style={{ color: "red" }}>{errors?.type_id}</p>
                  ) : null}
                </Row>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {types.map((t) => (
                    <div
                      className="px-4 py-1 mr-5 mt-5"
                      style={{
                        background: values.type_id === t.id ? "gray" : "none",
                        color: values.type_id === t.id ? "white" : "gray",
                        cursor: "pointer",
                        border: "1px solid gray",
                        borderRadius: "900px",
                      }}
                      onClick={() => {
                        setType({ id: t.id, value: t.type });
                        setFieldValue("type_id", t.id);
                      }}
                    >
                      <i
                        className={`icon icon-${t.id}`}
                        style={{ fontSize: "15px" }}
                      />
                      <span className="list-inline-item">{t?.type}</span>
                    </div>
                  ))}
                </div>
                {type.id !== 0 ? (
                  <>
                    <Row className="mt-40">
                      {typeHasField("kind") ? (
                        <Col md={3}>
                          <FormikSelect
                            name="kind_id"
                            options={dd(
                              // @ts-ignore
                              filters?.product_kinds,
                              "id",
                              "kind"
                            )}
                            label="نوع"
                            onChange={(value) => setKindId(value)}
                          />
                        </Col>
                      ) : null}

                      <Col md={3}>
                        <FormikSelect
                          name="factory_id"
                          //@ts-ignore
                          options={dd(filters?.factories)}
                          label="کارخانه"
                        />
                      </Col>

                      <Col md={3}>
                        <FormikSelect
                          name="details.freight_place.id"
                          //@ts-ignore
                          options={dd(filters?.product_freight_places)}
                          label="محل بار"
                        />
                      </Col>

                      <Col md={3}>
                        <FormikNumberField
                          style={{ direction: "rtl" }}
                          thousandSeparator
                          name={"vendor_price"}
                          suffix=" تومان "
                          label="قیمت"
                        />
                      </Col>
                    </Row>
                    <Row>
                      {typeHasField("standard") ? (
                        <Col md={3}>
                          <FormikSelect
                            name="details.standard.id"
                            //@ts-ignore
                            options={dd(filters?.product_standards)}
                            label="استاندارد"
                          />
                        </Col>
                      ) : null}

                      {typeHasField("size") ? (
                        <Col md={3}>
                          <FormikSelect
                            name="details.size.id"
                            //@ts-ignore
                            options={dd(filters?.product_sizes)}
                            label="سایز"
                            // onChange={() => setFieldValue(e.target.value)}
                          />
                        </Col>
                      ) : null}

                      {typeHasField("color") ? (
                        <Col md={3}>
                          <FormikSelect
                            name="details.color.id"
                            //@ts-ignore
                            options={dd(filters?.product_colors)}
                            label="رنگ"
                          />
                        </Col>
                      ) : null}

                      {typeHasField("thickness") ? (
                        <Col md={3}>
                          <FormikSelect
                            name="details.thickness.id"
                            //@ts-ignore
                            options={dd(filters?.product_thicknesses)}
                            label="ضخامت"
                          />
                        </Col>
                      ) : null}

                      {typeHasField("mode") ? (
                        <Col md={3}>
                          <FormikSelect
                            name="details.mode.id"
                            //@ts-ignore
                            options={dd(filters?.product_modes)}
                            label="مود"
                          />
                        </Col>
                      ) : null}

                      {typeHasField("length") ? (
                        <Col md={3}>
                          <FormikSelect
                            name="details.length.id"
                            //@ts-ignore
                            options={dd(filters?.product_lengths)}
                            label="طول"
                          />
                        </Col>
                      ) : null}

                      {typeHasField("width") ? (
                        <Col md={3}>
                          <FormikSelect
                            name="details.width.id"
                            //@ts-ignore
                            options={dd(filters?.product_widths)}
                            label="عرض"
                          />
                        </Col>
                      ) : null}
                    </Row>
                    <Row>
                      {typeHasField("dimension") ? (
                        <>
                          <Col md={3}>
                            <FormikSelect
                              name="details.dimension.x.id"
                              options={dimensionsXDD("id", "title")}
                              label="ابعاد (طول)"
                            />
                          </Col>
                          <Col md={3}>
                            <FormikSelect
                              name="details.dimension.y.id"
                              options={dimensionsYDD("id", "title")}
                              label="ابعاد (عرض)"
                            />
                          </Col>
                        </>
                      ) : null}
                    </Row>
                  </>
                ) : null}
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button
                label="لغو"
                onClick={() => {
                  setType({ id: 0, value: "" });
                  setFieldValue("type_id", null);
                  setFieldValue("details.type", {
                    id: 0,
                    value: "",
                  });
                  handleClose();
                }}
              />
              <Button
                type="submit"
                label="ذخیره"
                color="success"
                loading={saving}
              />
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

interface NewProductModal {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  types: ProductType[];
  refreshProducts: any;
}

export default NewProductModal;
