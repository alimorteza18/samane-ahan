// ** Hooks
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useHttp from "@/hooks/use-http";
import { connect, useDispatch } from "react-redux";
// ** Components
import Button from "@/components/input/button";
import CheckboxGroup from "@/components/input/checkbox-group";
import FormikSelect from "@/components/input/select/formik";
import FormikTextField from "@/components/input/text-field/formik";
import { Form, Formik } from "formik";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
// ** Services
import { createVendor, fetchProvinces } from "@/services/vendor-services";
import { saveAccessToken, saveLoggedInUserData } from "@/redux/action/auth";
import { fetchUserProfile, login, sendLoginOTP } from "@/services/auth-service";
import { PRODUCT_TYPE } from "@/services/product-type-services";
import { convertErrors } from "@/services/util-service";

const VendorFormSection = ({ profile }: VendorFormSectionProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (profile?.vendor) router.push("/account");
  }, [profile]);

  // ** states
  const [saving, setSaving] = useState(false);
  const [formStep, setFormStep] = useState<1 | 2>(1);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);

  // ** dropdown datas
  const { dropdown } = useHttp(fetchProvinces, { dropdownEmptyItem: { label: "استان *", value: "--" } }, true); //prettier-ignore

  /**
   * @description Timer countdown update
   */
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
          setIsCountingDown(false);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  /**
   * @description reset Timer
   */
  const setOTPTimer = () => {
    setIsCountingDown(true);
    setMinutes(1);
    setSeconds(30);
  };

  /**
   * @description tell server to send OTP again
   * @param mobile
   */
  const handleSendOPTCode = async (mobile: any) => {
    const results = await sendLoginOTP({ mobile });
    if (results.data?.data?.message)
      toast.success(results.data?.data?.message, { rtl: true });
  };

  /**
   * @description [formStep 1] whenever user click on get OTP to go next step of form
   * @param values
   */
  const handleGetOTP = async (values: any, helpers: any) => {
    setSaving(true);

    createVendor({
      just_validate: 1,
      ...values,
    })
      .then(async () => {
        await handleSendOPTCode(values?.phone);
        setOTPTimer();
        setFormStep(2);
      })
      .catch((err) => {
        if (err?.response?.status == 422) {
          const errs = err?.response?.data?.errors;
          helpers.setErrors(convertErrors(errs));
        } else {
          toast.error(err.response.data.message, { rtl: true });
        }
      })
      .finally(() => {
        setSaving(false);
      });
  };

  /**
   * @description [formStep 2] verify otp, send datas and if success, save profile data to redux store and redirect to account
   * @param values
   */
  const handleRegisterVendor = (values: any) => {
    setSaving(true);
    let access_token: string | undefined = undefined;
    login({
      mobile: values.phone,
      login_code: values.login_code,
      grant_type: "sms",
    })
      .then((res: any) => {
        access_token = res.data.access_token;
        //@ts-ignore
        createVendor(values)
          .then(() => {
            fetchUserProfile({ access_token }).then((res) => {
              //@ts-ignore
              dispatch(saveAccessToken(access_token));
              //@ts-ignore
              dispatch(saveLoggedInUserData(res.data.data));
              toast.success("با موفقیت وارد شدید", { rtl: true });
              router.push("/account");
            });
          })
          .catch((err) => {
            toast.error(err.response.data.message, { rtl: true });
          });
      })
      .catch((err) => {
        toast.error(err.response.data?.hint ?? err.response.data?.message, {
          rtl: true,
        });
      })
      .finally(() => {
        setSaving(false);
      });
  };

  return (
    <section className="mb-50">
      <h2
        className="title style-3 mb-40 text-center"
        style={{ color: "#3bb77e" }}
      >
        فرم ثبت‌نام شعبه آنلاین آهن‌فروشی
      </h2>
      <Row>
        <Col lg={12} className="mb-lg-0 mb-md-5 mb-sm-5">
          <h6 className="mb-5 text-brand">فرم ثبت نام بنگاه</h6>
          <h4 className="mb-30" style={{ color: "#000" }}>
            شعبه اینترنتی خود را در 1 دقیقه راه اندازی کنید.
          </h4>
        </Col>
        <Col lg={12} className="border p-40 cart-totals">
          <Formik
            initialValues={{
              phone: profile?.user?.mobile ?? null,
              name: null,
              modir_name: profile?.user?.name ?? null,
              province_id: profile?.user?.province_id,
            }}
            enableReinitialize
            onSubmit={formStep === 1 ? handleGetOTP : handleRegisterVendor}
          >
            {({ values }) => (
              <Form>
                {formStep === 1 ? (
                  <Row>
                    <Col sm={6}>
                      <FormikTextField
                        name="phone"
                        placeholder="نام کاربری (شماره موبایل)"
                      />
                    </Col>
                    <Col sm={6}>
                      <FormikTextField name="name" placeholder="نام بنگاه" />
                    </Col>
                    <Col sm={6}>
                      <FormikTextField
                        placeholder="نام مدیر بنگاه"
                        name="modir_name"
                      />
                    </Col>
                    <Col sm={6}>
                      <FormikSelect
                        name="province_id"
                        required
                        options={dropdown("id", "name")}
                      />
                    </Col>

                    <Col sm={6}>
                      <div>
                        <CheckboxGroup
                          label="حداقل یکی از موارد زیر را انتخاب کنید:"
                          name="product_types_ids"
                          options={[
                            {
                              label: "تیرآهن",
                              value: PRODUCT_TYPE.GIRDER.toString(),
                            },
                            {
                              label: "میلگرد",
                              value: PRODUCT_TYPE.REBAR.toString(),
                            },
                            {
                              label: "قوطی و پروفیل",
                              value: PRODUCT_TYPE.CAN.toString(),
                            },
                            {
                              label: "ورق",
                              value: PRODUCT_TYPE.SHEET.toString(),
                            },
                            {
                              label: "نبشی",
                              value: PRODUCT_TYPE.CORNER.toString(),
                            },
                            {
                              label: "ناودانی",
                              value: PRODUCT_TYPE.STUD.toString(),
                            },
                            {
                              label: "لوله",
                              value: PRODUCT_TYPE.PIPE.toString(),
                            },
                          ]}
                        />
                      </div>
                    </Col>
                    <Col xs={6}>
                      <Button
                        style={{ background: "#ffbd16", border: "0" }}
                        type="submit"
                        label="ثبت"
                        block
                        loading={saving}
                      />
                    </Col>
                  </Row>
                ) : (
                  <Row className="justify-content-center text-center">
                    <Col sm={6}>
                      <Row>
                        <FormikTextField
                          placeholder="کد تایید"
                          name="login_code"
                        />
                        <div className="countdown-text text-start">
                          {seconds > 0 || minutes > 0 ? (
                            <p>
                              زمان باقی‌مانده:{" "}
                              {minutes < 10 ? `0${minutes}` : minutes}:
                              {seconds < 10 ? `0${seconds}` : seconds}
                            </p>
                          ) : (
                            <span
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                handleSendOPTCode(values.phone);
                                setOTPTimer();
                              }}
                            >
                              ارسال مجدد کد
                            </span>
                          )}
                        </div>
                      </Row>
                      <Row className="mt-20">
                        <Col sm={4}>
                          <Button
                            label="ویرایش اطلاعات"
                            color="warning"
                            block
                            style={{
                              fontSize: "15px",
                              fontWeight: "500",
                              padding: "15px 40px",
                              borderRadius: "10px",
                            }}
                            onClick={() => setFormStep(1)}
                          />
                        </Col>
                        <Col sm={8}>
                          <Button
                            type="submit"
                            label="ثبت"
                            block
                            loading={saving}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                )}
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </section>
  );
};

interface VendorFormSectionProps {
  profile: AuthUserProfile;
}

const mapStateToProps = (state: any) => ({
  profile: state.auth.profile,
});

export default connect(mapStateToProps, {})(VendorFormSection);
