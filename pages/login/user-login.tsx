// ** Hooks
import { useEffect, useState } from "react";
import useHttp from "@/hooks/use-http";
import { useRouter } from "next/router";
// ** Components
import { Col, FormGroup, Row } from "reactstrap";
import Container from "react-bootstrap/Container";
import { Formik, Form } from "formik";
import FormikTextField from "@/components/input/text-field/formik";
import FormikNumberField from "@/components/input/number-field/formik";
import { toast } from "react-toastify";
import Button from "@/components/input/button";
import FormikCheckbox from "@/components/input/checkbox/formik";
// ** Services
import { fetchUserProfile, login, sendLoginOTP } from "@/services/auth-service";
import { NextSeo } from "next-seo";
import { getMetaTags } from "@/services/meta-tags-services";
import { setMatomoUser } from "@/components/partials/Matomo";

function UserLogin(props: any) {
  const router = useRouter();

  const [isCountingDown, setIsCountingDown] = useState(false);

  const handleSendOPTCode = async (mobile: string) => {
    const results = await sendLoginOTP({ mobile });

    if (results.data?.data?.message) toast.success(results.data?.data?.message);
  };

  /**
   * 1: enter username, 2: enter password
   */
  const [formStep, setFormStep] = useState<1 | 2>(1);

  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);

  const { execute, loading } = useHttp(login);

  /**
   * @description Login
   * @param values
   */
  const handleLogin = async (values: any) => {
    execute({
      mobile: values.mobile,
      login_code: values.login_code,
      grant_type: values.grant_type,
    })
      .then((res: any) => {
        props.saveAccessToken(res.data.access_token);
        fetchUserProfile({ access_token: res.data.access_token }).then(
          (res) => {
            props.saveLoggedInUserData(res.data.data);

            const loggedInUserData: AuthUserProfile = res.data.data;

            let tags = "";

            if (loggedInUserData?.vendor) {
              tags = `بنگاه,${loggedInUserData?.vendor?.name},${
                process.env.SITE_URL + "/vendor/" + loggedInUserData?.vendor?.id
              }`;
            }

            // @ts-ignore
            if (window?.Goftino) {
              // @ts-ignore
              window.Goftino.setUser({
                email: loggedInUserData?.user?.email ?? "",
                name:
                  loggedInUserData?.vendor?.name ??
                  loggedInUserData?.user?.name ??
                  "",
                about: loggedInUserData?.vendor?.description,
                phone: loggedInUserData?.user?.mobile ?? "",
                avatar: loggedInUserData?.user?.profile_img ?? null,
                tags,
                forceUpdate: true,
              });
            }

            if (window?._paq) {
              const matomoUserId = loggedInUserData?.vendor
                ? loggedInUserData?.vendor?.name
                : loggedInUserData?.user?.name
                ? loggedInUserData?.user?.name
                : loggedInUserData?.user?.username;

              setMatomoUser(loggedInUserData?.user?.id + " - " + matomoUserId, {
                userId: loggedInUserData?.user?.id,
                userName: loggedInUserData?.user?.name,
                vendorId: loggedInUserData?.vendor?.id,
                link: loggedInUserData?.vendor
                  ? `https://panel.samaneahan.com/vendors/${loggedInUserData?.vendor?.id}`
                  : `https://panel.samaneahan.com/users/${loggedInUserData?.user?.id}`,
              });
            }

            toast.success("با موفقیت وارد شدید");
            window.location.href = "/account";
          }
        );
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

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
   * @description whenever user click on get OTP to go next step of form
   * @param values formik values
   * @param setFieldValue formik setFieldValue
   */
  const handleGetOTP = async (values: any, setFieldValue: any) => {
    if (!values.mobile || values.mobile === "") {
      toast.error("لطفا شماره موبایل خود را وارد کنید");
    } else {
      if (!isCountingDown) {
        await handleSendOPTCode(values.mobile);
        setFieldValue("grant_type", "sms");
        setFormStep(2);
        setOTPTimer();
      }
    }
  };

  /**
   * @description whenever user click on enter with password to go next step of form
   * @param values formik values
   * @param setFieldValue formik setFieldValue
   */
  const handleEnterWithPassword = async (values: any, setFieldValue: any) => {
    if (!values.mobile || values.mobile === "") {
      toast.error("لطفا شماره موبایل خود را وارد کنید");
    } else {
      setFieldValue("grant_type", "password");
      setFormStep(2);
    }
  };

  return (
    <div className="page-content pt-150 pb-150">
      <NextSeo
        canonical={`${process.env.SITE_URL}/login`}
        title={getMetaTags({ page: "login" }).title}
      />
      <Container>
        <Row>
          <Col xl={8} lg={10} md={12} className="m-auto">
            <Row>
              <Col lg={6} className="pr-30 d-none d-lg-block">
                <img
                  className="border-radius-15"
                  src="/assets/imgs/page/login.jpg"
                />
              </Col>
              <Col lg={6} md={6}>
                <div className="login_wrap widget-taber-content background-white">
                  <div className="padding_eight_all bg-white">
                    <Formik
                      initialValues={{
                        terms_accepted: false,
                        mobile: "",
                        login_code: "",
                        grant_type: "sms", // password, sms
                      }}
                      onSubmit={handleLogin}
                    >
                      {({ values, setFieldValue }) => (
                        <Form>
                          <h3 style={{ marginBottom: "30px" }}>ورود</h3>
                          {formStep === 1 ? (
                            <>
                              <FormikNumberField
                                name="mobile"
                                required
                                allowLeadingZero
                                format="###########"
                                mask={"_"}
                                style={{ direction: "rtl" }}
                                label="لطفا شماره موبایل خود را وارد کنید"
                                placeholder="شماره موبایل"
                                hint="مثال: **** *** 0912"
                              />
                              <FormikCheckbox
                                name="terms_accepted"
                                label={
                                  <span>
                                    با{" "}
                                    <a target="_blank" href="/terms">
                                      قوانین
                                    </a>{" "}
                                    سایت موافقم
                                  </span>
                                }
                              />
                            </>
                          ) : (
                            <Col md={12} className="mb-30">
                              <FormikTextField
                                name="login_code"
                                required
                                type="password"
                                placeholder={
                                  values.grant_type === "password"
                                    ? "رمز عبور"
                                    : "کد پیامک شما به شماره موبایل"
                                }
                              />

                              {values.grant_type === "sms" ? (
                                <div className="countdown-text">
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
                                        handleSendOPTCode(values.mobile);
                                        setOTPTimer();
                                      }}
                                    >
                                      ارسال مجدد کد
                                    </span>
                                  )}
                                </div>
                              ) : null}
                            </Col>
                          )}

                          {formStep === 1 ? (
                            <Row>
                              <Col md={12}>
                                <Button
                                  label={"دریافت کد تایید"}
                                  color="success"
                                  block
                                  id="login-otp-btn"
                                  className="btn btn-heading btn-block hover-up"
                                  onClick={() => {
                                    if (values.terms_accepted)
                                      handleGetOTP(values, setFieldValue);
                                    else
                                      toast.warning(
                                        "لطفا قوانین و مقررات سایت را بخوانید",
                                        { rtl: true }
                                      );
                                  }}
                                />
                              </Col>

                              <Col md={12} style={{ marginTop: "30px" }}>
                                <span
                                  id="login-password-btn"
                                  onClick={() =>
                                    handleEnterWithPassword(
                                      values,
                                      setFieldValue
                                    )
                                  }
                                  style={{
                                    fontWeight: "border",
                                    color: "black",
                                    fontSize: "17px",
                                    cursor: "pointer",
                                  }}
                                >
                                  ورود با کلمه عبور
                                </span>
                              </Col>
                            </Row>
                          ) : (
                            <FormGroup>
                              <Button
                                loading={loading}
                                label="ورود"
                                type="submit"
                                block
                                className="btn-heading hover-up"
                              />
                            </FormGroup>
                          )}
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default UserLogin;
