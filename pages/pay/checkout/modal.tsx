import Modal from "react-bootstrap/Modal";
import FormikTextField from "@/components/input/text-field/formik";
import Button from "@/components/input/button";
import { Col, FormGroup, Row } from "reactstrap";
import { Form, Formik } from "formik";
import FormikNumberField from "@/components/input/number-field/formik";
import { useEffect, useState } from "react";
import { fetchUserProfile, login, sendLoginOTP } from "@/services/auth-service";
import { useRouter } from "next/router";
import useHttp from "@/hooks/use-http";
import { toast } from "react-toastify";
export default function ModalLogin({ open, close, props }: any) {
  const router = useRouter();
  const handleSendOPTCode = async (mobile: string) => {
    const results = await sendLoginOTP({ mobile });

    if (results.data?.data?.message) toast.success(results.data?.data?.message);
  };
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);

  const { execute, loading } = useHttp(login);

  const handleLogin = async (values: any) => {
    execute({
      mobile: values.mobile,
      login_code: values.login_code,
    })
      .then((res: any) => {
        props.saveAccessToken(res.data.access_token);
        fetchUserProfile({ access_token: res.data.access_token }).then(
          (res) => {
            props.saveLoggedInUserData(res.data.data);
            toast.success("با موفقیت وارد شدید");
            // router.push(`/pay/checkout/data=${data}`);
          }
        );
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
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

  const setOTPTimer = () => {
    setMinutes(1);
    setSeconds(30);
  };
  return (
    <Modal
      // @ts-ignore
      size="md"
      show={open}
      onHide={close}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        {/* <Modal.Title id="example-modal-sizes-title-lg">Large Modal</Modal.Title> */}
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            mobile: "",
            login_code: "",
            grant_type: "password",
            // password,
            // sms,
          }}
          onSubmit={handleLogin}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <FormGroup>
                <FormikNumberField
                  style={{ textAlign: "right" }}
                  name="mobile"
                  required
                  allowLeadingZero
                  format="###########"
                  mask={"_"}
                  placeholder="نام کاربری (شماره موبایل)"
                />

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
              </FormGroup>
              <Row>
                <Col md={6} className="mb-30">
                  {values.grant_type === "sms" ? (
                    <div className="countdown-text">
                      {seconds > 0 || minutes > 0 ? (
                        <p>
                          زمان باقی‌مانده:{" "}
                          {minutes < 10 ? `0${minutes}` : minutes}:
                          {seconds < 10 ? `0${seconds}` : seconds}
                        </p>
                      ) : (
                        <Button
                          size="xs"
                          disabled={seconds > 0 || minutes > 0}
                          onClick={() => {
                            handleSendOPTCode(values.mobile);
                            setOTPTimer();
                          }}
                        >
                          ارسال مجدد کد
                        </Button>
                      )}
                    </div>
                  ) : null}
                </Col>
                <Col md={6}>
                  <Button
                    label={
                      values.grant_type === "password"
                        ? " ورود با کد یکبار مصرف"
                        : "ورود با رمز عبور"
                    }
                    color="success"
                    block
                    className="btn btn-heading btn-block hover-up"
                    onClick={() => {
                      if (values.grant_type === "password") {
                        if (!values.mobile || values.mobile === "") {
                          toast.error("لطفا شماره موبایل خود را وارد کنید");
                        } else {
                          setFieldValue("grant_type", "sms");

                          if (seconds > 0 || minutes > 0) {
                          } else {
                            handleSendOPTCode(values.mobile);
                            setOTPTimer();
                          }
                        }
                      } else if (values.grant_type === "sms") {
                        setFieldValue("grant_type", "password");
                      }
                    }}
                  />
                </Col>
              </Row>
              <FormGroup>
                <Button
                  label="ورود"
                  type="submit"
                  className="btn-heading hover-up mt-10"
                  loading={loading}
                />
              </FormGroup>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}
