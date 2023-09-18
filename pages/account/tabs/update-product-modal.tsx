// ** Hooks
import { Dispatch, SetStateAction, useState } from "react";
import useHttp from "@/hooks/use-http";
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
import { editUserProduct } from "@/services/product-services";
import { convertErrors, query } from "@/services/util-service";
import { values } from "lodash";

function UpdateProductModal({
  product,
  show,
  setShow,
  types,
  refreshProducts,
}: UpdateProductModal) {
  const [type, setType] = useState<{id: number, value: string}>({ id: 0, value: "" }); //prettier-ignore

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
    [PRODUCT_TYPE.GIRDER]: ['size', 'standard', 'length', 'kind'],
    [PRODUCT_TYPE.REBAR]: ['size', 'standard', 'mode', 'kind'],
    [PRODUCT_TYPE.CAN]: ['thickness', 'height', 'length', 'standard', 'dimension', 'kind'],
    [PRODUCT_TYPE.SHEET]: ['width', 'color', 'standard', 'kind'],
    [PRODUCT_TYPE.STUD]: ['size', 'standard', 'mode', 'kind'],
    [PRODUCT_TYPE.CORNER]: ['thickness', 'length'],
  };

  const typeHasField = (field: string) => typeFields[type.id]?.includes(field);

  const { execute, loading } = useHttp(editUserProduct);

  const handleSave = async (values: any, helpers: any) => {
    try {
      await execute({ id: product.id, ...values });
      setShow(false);
      refreshProducts();
      toast.success("محصول با موفقیت ویرایش شد", { rtl: true });
    } catch (err: any) {
      if (err?.response?.status == 422) {
        const errs = err?.response?.data?.errors;
        helpers.setErrors(convertErrors(errs));
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Formik
        initialValues={{
          details: {
            freight_place: product?.freight_place,
            size: product.details?.size,
            color: product.details?.color,
            mode: product.details?.mode,
            standard: product.details?.standard,
            thickness: product.details?.thickness,
            length: product.details?.length,
            width: product.details?.width,
          },
          kind_id: product?.kind_id,
          type_id: product.type_id,
          factory_id: product.factory_id,
          vendor_price: product.vendor_price,
        }}
        enableReinitialize
        onSubmit={handleSave}
      >
        {({ values, setFieldValue, errors }) => (
          <Form>
            <Modal.Header>
              <Modal.Title>ویرایش بار</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <Row>
                  <Col md={6}>
                    <FormikNumberField
                      style={{ direction: "rtl" }}
                      thousandSeparator
                      name={"vendor_price"}
                      suffix=" تومان "
                      label="قیمت"
                    />
                  </Col>
                </Row>
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
                loading={loading}
              />
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

interface UpdateProductModal {
  product: any;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  types: ProductType[];
  refreshProducts: any;
}

export default UpdateProductModal;
