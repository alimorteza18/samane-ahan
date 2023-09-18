// ** Hooks
import { useState } from "react";
import useHttp from "@/hooks/use-http";
// ** Components
import { Row, Col, Container, Spinner } from "react-bootstrap";
import Button from "@/components/input/button";
import RadioGroup from "@/components/input/radio-group";
import { Form, Formik } from "formik";
import FormikTextField from "@/components/input/text-field/formik";
import FormikSelect from "@/components/input/select/formik";
import Breadcrumb2 from "@/components/layout/Breadcrumb2";
// ** Services
import { connect } from "react-redux";
import { seperateThousands } from "@/services/number-services";
import { fetchCities, fetchProvinces } from "@/services/vendor-services";
import type {
  ApplyDiscountCodeProps,
  FetchCitiesProps,
  RequestPaymentProps,
} from "@/types/services";
import Link from "next/link";
import { applyDiscountCode, requestPayment } from "@/services/payment-services";
import ModalLogin from "./modal";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Cart = ({ selectedPackages, profile }: CheckoutPageProps) => {
  const router = useRouter();
  const [province, setProvince] = useState();
  const [discountCode, setDiscountCode] = useState("");

  const { dropdown } = useHttp(fetchProvinces, {}, true);
  const { dropdown: citiesDropdown } = useHttp<City[], FetchCitiesProps>(
    fetchCities,
    { province_id: province },
    true
  );

  const {
    data: discountCheckResult,
    execute,
    loading: checkingDiscount,
  } = useHttp<CheckDiscount, ApplyDiscountCodeProps>(applyDiscountCode);
  let discountValue: any = discountCheckResult
    ? discountCheckResult?.result
    : 0;
  const handleCheckDiscountCode = () => {
    execute({
      discount_code: discountCode,
    }).then((res) => console.log(res.data.data.message));
  };

  // calculate sum price and discount
  let amount = 0;
  let discount = 0;

  amount = selectedPackages?.reduce((sum, item) => sum + item?.price, 0) / 10;
  discountCheckResult?.success &&
  discountCheckResult?.result?.operation_type == "percentage"
    ? (discount = (amount * discountValue?.operation_value) / 100)
    : (discount = discountValue?.operation_value);

  discountCheckResult?.success
    ? (amount = amount - discount)
    : selectedPackages?.length
    ? amount
    : 0;
  // end calculate sum price and discount

  const { execute: exePayment } = useHttp<CheckDiscount, RequestPaymentProps>(
    requestPayment
  );
  const handlePayment = (values: any) => {
    const fields: RequestPaymentProps = {
      vendor_name: values.name,
      phone: values.mobile.toString(),
      name: values.name,
      detail: { newVendor: [localStorage.getItem("newVendor")] },
      packages: selectedPackages.map((item) => {
        return item?.id;
      }),
      callback_url: `${process.env.SITE_URL}/pay/invoice?redirect=login`,
    };

    if (discountCode && discountCode != "" && discountCheckResult?.success) {
      fields.discount_code = discountCode.toString();
    }

    exePayment(fields)
      .then((res: any) => {
        toast.success("با موفقیت وارد شدید");
        if (amount > 0) router.push(res?.data?.data?.result?.action);
        else
          router.push(
            `/pay/invoice?redirect=login&Authority=${res?.data?.data?.transaction_id}`
          );
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };
  const [show, setShow] = useState(false);

  return (
    <>
      <Breadcrumb2 parent="خانه" sub="خرید" subChild="تسویه" title="تسویه" />
      <section className="mt-50 mb-50">
        <Container>
          <Row>
            <Col lg={8} className="mb-40">
              <div className="d-flex justify-content-between">
                <h6 className="text-body">
                  در سبد خرید شما{" "}
                  <span className="text-brand">{selectedPackages.length}</span>{" "}
                  مورد موجود است
                </h6>
              </div>
            </Col>
          </Row>
          <Formik
            initialValues={{
              name: profile?.user?.name,
              mobile: profile?.user?.mobile,
              address: profile?.user?.address,
              province_id: profile?.vendor?.province_id,
              city_id: profile?.vendor?.city_id,
              vendor_name: profile?.vendor?.name,
            }}
            enableReinitialize
            onSubmit={handlePayment}
          >
            {() => (
              <Form>
                <Row>
                  <Col lg={7}>
                    <Row className="mb-50">
                      <Col lg={6} className="mb-sm-15 mb-lg-0 mb-md-3">
                        {!profile?.user ? (
                          <div className="toggle_info">
                            <span>
                              <i className="fi-rs-user mr-10" />
                              <span className="text-muted font-lg">
                                قبلا ثبت‌نام کرده‌اید؟
                              </span>{" "}
                              <a
                                onClick={() => {
                                  setShow(true);
                                }}
                                className="collapsed font-lg"
                              >
                                وارد شوید
                              </a>
                              <ModalLogin
                                open={show}
                                close={() => {
                                  setShow(false);
                                }}
                              />
                            </span>
                          </div>
                        ) : null}
                      </Col>
                      <Col lg={6}>
                        <div className="apply-coupon">
                          <input
                            placeholder="کد تخفیف خود را وارد کنید ..."
                            value={discountCode}
                            onChange={(e) => setDiscountCode(e.target.value)}
                          />

                          <Button
                            label="اعمال"
                            loading={checkingDiscount}
                            loadingText=""
                            color="none"
                            loadingComponent={
                              <Spinner
                                style={{ width: "0.7rem", height: "0.7rem" }}
                                animation="border"
                                color="light"
                              />
                            }
                            onClick={handleCheckDiscountCode}
                          />
                        </div>
                        {discountCheckResult && !checkingDiscount ? (
                          <div
                            style={{
                              color: discountCheckResult?.success
                                ? "green"
                                : "red",
                            }}
                            className="mt-5 mr-5"
                          >
                            {discountCheckResult?.message}
                          </div>
                        ) : null}
                      </Col>
                    </Row>
                    <div className="mb-25">
                      <h4>جزئیات خرید</h4>
                    </div>

                    <Row>
                      <Col sm={6}>
                        <FormikTextField
                          name="name"
                          placeholder="نام و نام خانوادگی"
                          required
                        />
                      </Col>
                      <Col sm={6}>
                        <FormikTextField
                          name="vendor_name"
                          placeholder="نام بنگاه"
                          required
                        />
                      </Col>
                      <Col sm={6}>
                        <FormikTextField
                          name="mobile"
                          placeholder="موبایل"
                          required
                        />
                      </Col>
                      <Col sm={6}>
                        <FormikSelect
                          name="province_id"
                          required
                          options={dropdown("id", "name")}
                          onChange={setProvince}
                        />
                      </Col>
                      <Col sm={6}>
                        <FormikSelect
                          name="city_id"
                          placeholder="شهر"
                          options={citiesDropdown("id", "name")}
                        />
                      </Col>

                      <FormikTextField
                        name="address"
                        placeholder="آدرس"
                        required
                      />

                      <FormikTextField
                        name="description"
                        placeholder="توضیحات اضافی"
                        type="textarea"
                      />
                    </Row>
                  </Col>
                  <Col lg={5}>
                    <div className="border p-40 cart-totals ml-30 mb-50">
                      <div className="d-flex align-items-end justify-content-between mb-30">
                        <h4>سفارش شما</h4>
                        <h6 className="text-muted">
                          جمع: {""}
                          {seperateThousands(amount)}
                          تومان
                        </h6>
                      </div>
                      <div className="divider-2 mb-30"></div>
                      <div className="table-responsive order_table">
                        {selectedPackages.length <= 0 && (
                          <span className="text-center">
                            <p>
                              سبدخرید خالی است.{" "}
                              <Link href={"/pay/packages"}>مشاهده آیتم‌ها</Link>
                            </p>
                          </span>
                        )}
                        <table
                          className={
                            selectedPackages.length > 0
                              ? "table no-border"
                              : "d-none"
                          }
                        >
                          <tbody>
                            {selectedPackages.map(
                              (item: ShopPackage, i: number) => (
                                <tr
                                  key={i}
                                  style={{ border: "1px solid #e9ecef" }}
                                >
                                  <td
                                    className="image product-thumbnail"
                                    style={{ verticalAlign: "middle" }}
                                  >
                                    <img src="/assets/imgs/shop/cat-7.png" />
                                  </td>
                                  <td style={{ verticalAlign: "middle" }}>
                                    <h6
                                      className="w-160 mb-5"
                                      style={{ fontSize: "15px" }}
                                    >
                                      <a>{item.title}</a>
                                    </h6>{" "}
                                  </td>
                                  <td style={{ verticalAlign: "middle" }}>
                                    <h4
                                      className="text-brand"
                                      style={{ fontSize: "15px" }}
                                    >
                                      {seperateThousands(item.price / 10)} تومان
                                    </h4>
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="payment ml-30">
                      <h4 className="mb-30">پرداخت</h4>

                      <RadioGroup
                        containerProps={{
                          style: { color: "black" },
                        }}
                        options={[{ label: "پرداخت آنلاین", checked: true }]}
                      />
                      <div className="payment-logo d-flex">
                        <img
                          className="mr-15"
                          src="/assets/imgs/theme/icons/payment-zarinpal.svg"
                        />
                      </div>
                      <Button
                        type="submit"
                        label="ثبت سفارش"
                        icon={<i className="fi-rs-sign-out ml-15" />}
                        color="warning"
                        block
                        className="mt-30"
                      />
                    </div>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Container>
      </section>
    </>
  );
};
interface CheckoutPageProps {
  selectedPackages: ShopPackage[];
  profile?: AuthUserProfile;
}

const mapStateToProps = (state: any) => ({
  selectedPackages: state.packages,
  profile: state.auth.profile,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
