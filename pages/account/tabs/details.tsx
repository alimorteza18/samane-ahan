import FormikSelect from "@/components/input/select/formik";
import FormikTextField from "@/components/input/text-field/formik";
import useHttp from "@/hooks/use-http";
import { editUserProfile } from "@/services/auth-service";
import { fetchCities, fetchProvinces } from "@/services/vendor-services";
import { Form, Formik } from "formik";
import { connect } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { createContext, useState } from "react";
import Button from "@/components/input/button";
import ImageProfileModal from "./image-profile-modal";
import { updateUserProfile } from "@/redux/action/auth";

export const ProfileImage = createContext<ProfileImageContextProps>({
  url: "",
  setUrl: () => {},
  urlBaner: "",
  setUrlBaner: () => {},
  fileImage: null,
  setFileImage: () => {},
  file2Image: null,
  setFile2Image: () => {},
});

const Details = ({
  active = false,
  profile,
  updateUserProfile,
}: DetailsPageProps) => {
  const [url, setUrl] = useState("");
  const [fileImage, setFileImage] = useState("");
  const [provience, setProvience] = useState("");

  const [show, setShow] = useState(false);

  const { dropdown: dropdownProvince } = useHttp(fetchProvinces, {}, true);
  const { dropdown: dropdownCity } = useHttp(
    fetchCities,
    { provience_id: provience },
    true
  );
  const { execute } = useHttp(editUserProfile, {});

  const handleProfile = (values: any, helpers: any) => {
    execute({ profile_img: fileImage, ...values })
      .then((res) => {
        // TODO:fix
        updateUserProfile(res?.data?.data);
      })
      .catch((error) => {
        if (error?.response.status === 422) {
          const errs = error?.response?.data?.errors;
          helpers.setErrors(errs);
        }
      });
  };

  return (
    <div className={"tab-pane fade " + (active ? "active show" : "hidden")}>
      <div className="card">
        <div className="card-header">
          <h5>جزئیات حساب</h5>
        </div>
        <div className="card-body">
          <ProfileImage.Provider
            // @ts-ignore
            value={{ url, setUrl, fileImage, setFileImage }}
          >
            <Formik
              initialValues={{
                province_id: profile?.user?.province_id,
                address: profile?.user?.address,
                name: profile?.user?.name,
                email: profile?.user?.email,
                company_name: profile?.user?.company_name,
                father_name: profile?.user?.father_name,
              }}
              enableReinitialize
              onSubmit={handleProfile}
            >
              {({}) => (
                <Form>
                  <Row>
                    <Col sm={4}>
                      <label>نام کاربری</label>
                      <input
                        className="form-control"
                        value={profile?.user?.username}
                        name="username"
                        disabled
                      />
                    </Col>
                    <Col sm={4}></Col>
                    <Col sm={4}>
                      <a
                        onClick={() => {
                          setShow(true);
                        }}
                      >
                        <img
                          src="/assets/imgs/page/pencil.png"
                          style={{ width: "40px" }}
                        />
                      </a>
                      <ImageProfileModal
                        style={{
                          width: 250,
                          height: 250,
                          borderRadius: 125,
                        }}
                        sizeModal="md"
                        open={show}
                        close={() => {
                          setShow(false);
                        }}
                      />
                      <img
                        src={url ? url : profile?.user?.profile_img}
                        style={{
                          width: "200px",
                          height: "200px",
                          borderRadius: "50%",
                          border: "2px #fff",
                        }}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col sm={4}>
                      <FormikTextField label="نام" name="name" placeholder="" />
                    </Col>
                    <Col sm={4}>
                      <FormikSelect
                        options={dropdownProvince("id", "name")}
                        name="province_id"
                        label="استان"
                        onChange={setProvience}
                      />
                    </Col>
                    <Col sm={4}>
                      <FormikSelect
                        options={dropdownCity("id", "name")}
                        name="city_id"
                        label="شهر"
                      />
                    </Col>
                    <Col sm={12}>
                      <FormikTextField
                        label="آدرس"
                        name="address"
                        placeholder=""
                      />
                    </Col>
                    <Col sm={4}>
                      <FormikTextField
                        label="ایمیل"
                        name="email"
                        type="email"
                      />
                    </Col>
                    <Col sm={4}>
                      <FormikTextField label="نام شرکت" name="company_name" />
                    </Col>
                    <Col sm={4}>
                      <FormikTextField label="نام پدر" name="father_name" />
                    </Col>
                  </Row>
                  <Button type="submit" size="lg" label="ذخیره" color="none" />
                </Form>
              )}
            </Formik>
          </ProfileImage.Provider>
        </div>
      </div>
    </div>
  );
};
interface DetailsPageProps {
  profile?: AuthUserProfile;
  active?: boolean;
  updateUserProfile: any;
}

const mapStateToProps = (state: any) => ({
  selectedPackages: state.packages,
  profile: state.auth.profile,
});

const mapDispatchToProps = {
  updateUserProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);

export interface ProfileImageContextProps {
  url: string;
  setUrl: (url: string) => void;
  urlBaner: string;
  setUrlBaner: (url: string) => void;
  fileImage: string | null;
  setFileImage: (file: string) => void;
  file2Image: string | null;
  setFile2Image: (file: string) => void;
}
