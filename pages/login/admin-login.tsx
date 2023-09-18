// ** Hooks
import useHttp from "@/hooks/use-http";
import { useRouter } from "next/router";
// ** Components
import { Col, FormGroup, Row } from "reactstrap";
import Container from "react-bootstrap/Container";
import { Formik, Form } from "formik";
import FormikTextField from "@/components/input/text-field/formik";
import { toast } from "react-toastify";
import Button from "@/components/input/button";
// ** Services
import { loginAdmin } from "@/services/auth-service";

function AdminLogin(props: any) {
  const { execute, loading } = useHttp(loginAdmin);
  const router = useRouter();

  /**
   * @description Login
   * @param values
   */
  const handleLogin = async (values: any) => {
    execute(values)
      .then((res: any) => {
        // redux
        props.saveAdminAccessToken(res.data.token);
        props.saveLoggedInAdmin({
          admin: res.data.data,
          permissions: res.data.permissions?.map((perm: any) => perm?.resource),
        });

        toast.success("با موفقیت به عنوان ادمین وارد شدید");
        router.push("/");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="page-content pt-150 pb-150">
      <Container>
        <Row>
          <Col xl={8} lg={10} md={12} className="m-auto">
            <Row>
              <Col lg={6} className="pr-30 d-none d-lg-block">
                <img
                  className="border-radius-15"
                  src="/assets/imgs/page/ahan-mobile.jpg"
                />
              </Col>
              <Col lg={6} md={6}>
                <div className="login_wrap widget-taber-content background-white">
                  <div className="padding_eight_all bg-white">
                    <Formik initialValues={{}} onSubmit={handleLogin}>
                      {({ values, setFieldValue }) => (
                        <Form>
                          <h3 style={{ marginBottom: "30px" }}>ورود ادمین</h3>

                          <FormikTextField name="username" label="نام کاربری" />

                          <Col md={12} className="mb-30">
                            <FormikTextField
                              name="password"
                              required
                              type="password"
                              label="رمز عبور"
                            />
                          </Col>

                          <FormGroup>
                            <Button
                              loading={loading}
                              label="ورود"
                              type="submit"
                              block
                              className="btn-heading hover-up"
                            />
                          </FormGroup>
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

export default AdminLogin;
