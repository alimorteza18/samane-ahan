// ** Hooks
import { useMemo, useState } from "react";
import useHttp from "@/hooks/use-http";
// ** Components
import { Col, Row } from "reactstrap";
import { Form, Formik } from "formik";
import Button from "@/components/input/button";
import FormikSelect from "@/components/input/select/formik";
import FormikTextField from "@/components/input/text-field/formik";
import ImageUpload from "@/components/input/image-upload";
// services
import { connect } from "react-redux";
import { saveLoggedInVendor } from "@/redux/action/auth";
import { fetchCities, fetchProvinces, editVendorProfile } from "@/services/vendor-services"; //prettier-ignore
import { Image } from "react-bootstrap";
import { toast } from "react-toastify";

function VendorProfile({
  active = false,
  profile,
  saveLoggedInVendor,
}: VendorProfilePageProps) {
  const [provience, setProvience] = useState("");
  const { dropdown: dropdownProvince } = useHttp(fetchProvinces, {}, true);
  const { dropdown: dropdownCity } = useHttp(fetchCities,{ provience_id: provience }, true); //prettier-ignore
  const { execute: editProfile } = useHttp(editVendorProfile);
  const { name, modir_name, address, provience_id, city_id, mobile, phone, email }: any = useMemo(() => profile?.vendor || {}, [profile]); //prettier-ignore

  const handleVendorProfile = (values: any) => {
    editProfile(values).then((res) => {
      saveLoggedInVendor(res.data.data);
      toast.success("اطلاعات با موفقیت ویرایش شد", { rtl: true });
    });
  };

  return (
    <div className={"tab-pan fade " + (active ? "active show" : "hidden")}>
      <div className="card">
        <div className="card-body">
          <Formik
            initialValues={{
              name,
              modir_name,
              address,
              provience_id,
              city_id,
              mobile,
              phone,
              email,
            }}
            enableReinitialize
            onSubmit={handleVendorProfile}
          >
            {() => (
              <Form>
                <div className="position-relative mb-70">
                  <ImageUpload
                    preview={profile?.vendor?.vendor_profile_img}
                    onUploadFinished={({ path }) =>
                      handleVendorProfile({ vendor_img: path })
                    }
                    aspect={4 / 1}
                    styles={{
                      triggerContainer: {
                        marginBottom: "-25px",
                        marginRight: "-10px",
                      },
                    }}
                    components={{
                      image: () => {
                        return (
                          <div
                            className="position-relative mb-70"
                            style={{
                              width: "100%",
                              height: "160px",
                              overflow: "hidden",
                              borderRadius: "20px",
                            }}
                          >
                            <img
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                              src={
                                profile?.vendor?.vendor_img ??
                                "/assets/imgs/vendor/header-vendor-page.jpg"
                              }
                            />
                          </div>
                        );
                      },
                    }}
                  />

                  <div
                    className="position-absolute"
                    style={{ bottom: 0, left: 20, marginBottom: "-50px" }}
                  >
                    <ImageUpload
                      preview={profile?.vendor?.vendor_profile_img}
                      onUploadFinished={({ path }) =>
                        handleVendorProfile({ vendor_profile_img: path })
                      }
                      circularCrop
                      styles={{
                        triggerContainer: {
                          marginBottom: "0",
                          marginRight: "0",
                        },
                      }}
                      components={{
                        image: () => {
                          return (
                            <Image
                              width={100}
                              roundedCircle
                              thumbnail
                              src={
                                profile?.vendor?.vendor_profile_img ??
                                "/assets/imgs/vendor/vendor-17.png"
                              }
                            />
                          );
                        },
                      }}
                    />
                  </div>
                </div>

                <Row>
                  <Col sm={4}>
                    <FormikTextField name="name" label="نام" />
                  </Col>
                  <Col sm={4}>
                    <FormikTextField name="modir_name" label="نام مدیر" />
                  </Col>
                  <Col sm={4}>
                    <FormikTextField name="phone" label="تلفن" />
                  </Col>
                  <Col sm={12}>
                    <FormikTextField name="address" label="آدرس" />
                  </Col>
                  <Col sm={6}>
                    <FormikTextField name="email" label="ایمیل" />
                  </Col>
                  <Col sm={3}>
                    <FormikSelect
                      options={dropdownProvince("id", "name")}
                      name="province_id"
                      label="استان"
                      onChange={(value) => {
                        setProvience(value);
                      }}
                    />
                  </Col>
                  <Col sm={3}>
                    <FormikSelect
                      options={dropdownCity("id", "name")}
                      name="city_id"
                      label="شهر"
                    />
                  </Col>
                </Row>
                <Button type="submit" size="lg" label="ذخیره" color="none" />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

interface VendorProfilePageProps {
  profile?: AuthUserProfile;
  active?: boolean;
  saveLoggedInVendor: (vendor: any) => void;
}

const mapStateToProps = (state: any) => ({
  profile: state.auth.profile,
});

const mapDispatchToProps = {
  saveLoggedInVendor,
};

export default connect(mapStateToProps, mapDispatchToProps)(VendorProfile);
