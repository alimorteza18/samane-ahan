import { Col, Container, Row, Image, Modal, ModalTitle } from "react-bootstrap";
import { ModalBody, ModalHeader, Spinner } from "reactstrap";
import useSecureCall from "@/hooks/use-secure-call";
import { useContext, useState } from "react";
import { Field, Form, Formik, FormikContext } from "formik";
import useHttpSave from "@/hooks/use-http-save";
import { createComment } from "@/services/vendor-services";
// @ts-ignore
import StarRatings from "react-star-ratings";
import { toast } from "react-toastify";
import useAuth from "@/hooks/use-auth";
import Button from "@/components/input/button";
import { VendorProfileDataContext } from "./[id].page";
// @ts-ignore
// import { ShareButton } from 'next-share';

const VendorHeader = ({ data }: UserVendorDataProps) => {
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);

  const { currentTime } = useContext(VendorProfileDataContext);

  const { CallModalsContainer, handleCallVendor, connecting } = useSecureCall({
    time: currentTime,
  });

  const category = data.category;
  let title =
    category == "vendor"
      ? "فروشنده"
      : category == "factory"
      ? "تولید‌کننده"
      : category == "freight"
      ? "باربری"
      : "مصرف کننده";

  const { execute } = useHttpSave(createComment);
  const handleSubmit = async (values: any) => {
    try {
      await execute({ vendor_id: data.id, rating: rating, ...values }).then(
        (res) => {
          setShowModal(false);
          // @ts-ignore
          toast.success(res.data["message"]);
        }
      );
    } catch (e) {
      console.error(e);
    }
  };

  const handleRatingChange = (newRating: any) => {
    if (newRating === rating) {
      // If the user clicks on the same rating twice, reset to zero
      setRating(0);
    } else {
      setRating(newRating);
    }
  };

  const { isEditMode } = useAuth();

  return (
    <>
      <CallModalsContainer />
      <Container>
        <Row>
          <Col sm={12} xs={12} md={12} lg={12}>
            <div
              className="card-header-vendor position-relative"
              style={{
                background: data.vendor_img
                  ? `url(${data.vendor_img}) #333333`
                  : "url(/assets/imgs/vendor/header-vendor-page.jpg) #333333",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {isEditMode ? (
                <div
                  style={{ position: "absolute", top: "10px", right: "10px" }}
                >
                  <Button
                    size="xs"
                    label="ویرایش بنگاه"
                    target="_blank"
                    href={`https://panel.samaneahan.com/vendors/${data?.id}`}
                  />
                </div>
              ) : null}

              <div className="profile-vendor">
                <Image
                  roundedCircle
                  style={{
                    borderColor:
                      data.category == "vendor"
                        ? "#0089d6"
                        : data.category == "factory"
                        ? "green"
                        : data.category == "freight"
                        ? "#757575"
                        : "#f155ff",
                  }}
                  src={
                    data?.vendor_profile_img
                      ? data?.vendor_profile_img
                      : "/assets/imgs/theme/default.png"
                  }
                />
                <span
                  style={{
                    backgroundColor:
                      data.category == "vendor"
                        ? "#0089d6"
                        : data.category == "factory"
                        ? "green"
                        : data.category == "freight"
                        ? "#757575"
                        : "#f155ff",
                  }}
                >
                  {title}
                </span>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="wraper-float">
          <Col lg={4} md={4} sm={4} xs={3}>
            <div className="d-flex" style={{ alignItems: "center" }}>
              {/* <ShareButton
                socialMedia="facebook"
                url="https://your-website-url.com"
                quote="Check out my website!"
              >
                Share on Facebook
              </ShareButton> */}
              <a className="share ml-5">
                <svg
                  viewBox="0 0 35 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24.0627 5.46867C24.0625 4.18573 24.5135 2.94359 25.3368 1.95956C26.1601 0.975533 27.3032 0.312282 28.5661 0.0858498C29.8291 -0.140582 31.1315 0.0842232 32.2454 0.720935C33.3593 1.35765 34.2139 2.36572 34.6595 3.56878C35.1052 4.77185 35.1136 6.09329 34.6832 7.30192C34.2529 8.51054 33.4112 9.52939 32.3055 10.1802C31.1997 10.831 29.9003 11.0723 28.6346 10.862C27.3689 10.6516 26.2174 10.0029 25.3817 9.02942L10.6863 15.8535C11.0242 16.924 11.0242 18.0725 10.6863 19.143L25.3817 25.967C26.2651 24.9398 27.4985 24.277 28.8427 24.1072C30.187 23.9373 31.5464 24.2725 32.6576 25.0478C33.7688 25.823 34.5526 26.9831 34.8571 28.3032C35.1616 29.6234 34.9651 31.0095 34.3057 32.1931C33.6463 33.3766 32.5709 34.2732 31.288 34.7092C30.0052 35.1451 28.6061 35.0894 27.362 34.5527C26.1179 34.016 25.1173 33.0366 24.5542 31.8044C23.9911 30.5721 23.9056 29.1747 24.3142 27.883L9.61886 21.059C8.89138 21.9067 7.92172 22.5113 6.8403 22.7914C5.75888 23.0716 4.61758 23.0139 3.56995 22.6261C2.52231 22.2382 1.61859 21.5389 0.980361 20.6222C0.342128 19.7054 0 18.6152 0 17.4982C0 16.3812 0.342128 15.291 0.980361 14.3743C1.61859 13.4575 2.52231 12.7582 3.56995 12.3704C4.61758 11.9826 5.75888 11.9249 6.8403 12.205C7.92172 12.4852 8.89138 13.0898 9.61886 13.9375L24.3142 7.11344C24.147 6.58123 24.0621 6.02655 24.0627 5.46867Z"
                    fill="#555555"
                  />
                </svg>
              </a>
              <a
                onClick={() => setShowModal(true)}
                className="d-none d-lg-flex opinion-bongah"
              >
                <svg
                  width="24"
                  height="23"
                  viewBox="0 0 24 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.7092 16.47H19.9846C21.3095 16.47 22.3506 15.4097 22.3506 14.1412V4.16263C22.3506 2.89411 21.3095 1.8338 19.9846 1.8338H4.01416C2.6892 1.8338 1.64816 2.89411 1.64816 4.16263V14.1412C1.64816 15.4097 2.6892 16.47 4.01416 16.47H6.38015V21.1663H6.38458L6.38754 21.1649L12.7107 16.47H12.7092ZM7.26739 22.3605C6.9526 22.5939 6.55928 22.6936 6.1721 22.6383C5.78491 22.5829 5.43481 22.3769 5.19715 22.0646C5.00663 21.8122 4.9033 21.5041 4.90288 21.1872V17.9571H4.01563C1.89216 17.9571 0.170899 16.2484 0.170899 14.1412V4.16263C0.169421 2.05538 1.89068 0.34668 4.01416 0.34668H19.9846C22.1081 0.34668 23.8293 2.05538 23.8293 4.16263V14.1412C23.8293 16.2499 22.1081 17.9571 19.9846 17.9571H13.1972L7.26591 22.3605H7.26739Z"
                    fill="#555555"
                  />
                  <line
                    x1="6.92986"
                    y1="5.75373"
                    x2="17.7451"
                    y2="5.75373"
                    stroke="#555555"
                    strokeWidth="1.35191"
                    strokeLinecap="round"
                  />
                  <line
                    x1="6.92986"
                    y1="9.13362"
                    x2="17.7451"
                    y2="9.13362"
                    stroke="#555555"
                    strokeWidth="1.35191"
                    strokeLinecap="round"
                  />
                  <line
                    x1="6.92986"
                    y1="12.5135"
                    x2="12.3375"
                    y2="12.5135"
                    stroke="#555555"
                    strokeWidth="1.35191"
                    strokeLinecap="round"
                  />
                </svg>

                <span
                  style={{
                    fontWeight: "800",
                    fontSize: "15px",
                    lineHeight: "156.6%",
                    color: "#333333",
                  }}
                >
                  ثبت نظر{" "}
                </span>
              </a>
              {/* display sm size */}
              <a href="" className="d-flex d-lg-none opinion">
                <svg
                  viewBox="0 0 23 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.1883 15.3873H18.6803C19.8626 15.3873 20.7916 14.4412 20.7916 13.3093V4.40508C20.7916 3.27315 19.8626 2.327 18.6803 2.327H4.42945C3.24715 2.327 2.31821 3.27315 2.31821 4.40508V13.3093C2.31821 14.4412 3.24715 15.3873 4.42945 15.3873H6.54069V19.578H6.54465L6.54729 19.5767L12.1896 15.3873H12.1883ZM7.33241 20.6436C7.05151 20.8518 6.70054 20.9408 6.35505 20.8914C6.00955 20.842 5.69715 20.6582 5.48507 20.3795C5.31507 20.1543 5.22286 19.8794 5.22249 19.5966V16.7143H4.43077C2.53593 16.7143 1 15.1896 1 13.3093V4.40508C0.998681 2.52472 2.53461 1 4.42945 1H18.6803C20.5752 1 22.1111 2.52472 22.1111 4.40508V13.3093C22.1111 15.1909 20.5752 16.7143 18.6803 16.7143H12.6237L7.33109 20.6436H7.33241Z"
                    fill="#555555"
                    stroke="#555555"
                    strokeWidth="0.222222"
                  />
                  <line
                    x1="7.03189"
                    y1="5.82554"
                    x2="16.6827"
                    y2="5.82554"
                    stroke="#555555"
                    strokeWidth="1.20635"
                    strokeLinecap="round"
                  />
                  <line
                    x1="7.03189"
                    y1="8.84116"
                    x2="16.6827"
                    y2="8.84116"
                    stroke="#555555"
                    strokeWidth="1.20635"
                    strokeLinecap="round"
                  />
                  <line
                    x1="7.03189"
                    y1="11.8578"
                    x2="11.8573"
                    y2="11.8578"
                    stroke="#555555"
                    strokeWidth="1.20635"
                    strokeLinecap="round"
                  />
                </svg>{" "}
              </a>
            </div>
          </Col>
          <Col lg={4} md={4} sm={4} xs={8} className="context-vendor">
            <div style={{ position: "relative" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="wraper-detail-vendor">
                  <h5 className="center-div">{data?.name}</h5>
                  <h6 className="center-div">مدیریت : {data?.modir_name}</h6>
                  {data?.city?.province?.name ? (
                    <p className="center-div">
                      <svg
                        viewBox="0 0 20 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 0C7.3488 0.00307185 4.80708 1.03881 2.93239 2.88002C1.05771 4.72123 0.00313834 7.21757 1.0639e-05 9.82143C-0.00316471 11.9493 0.704538 14.0194 2.01455 15.7143C2.01455 15.7143 2.28728 16.067 2.33183 16.1179L10 25L17.6718 16.1134C17.7118 16.0661 17.9854 15.7143 17.9854 15.7143L17.9864 15.7116C19.2957 14.0175 20.0031 11.9483 20 9.82143C19.9969 7.21757 18.9423 4.72123 17.0676 2.88002C15.1929 1.03881 12.6512 0.00307185 10 0ZM10 13.3929C9.2808 13.3929 8.57774 13.1834 7.97975 12.791C7.38175 12.3985 6.91567 11.8407 6.64044 11.1882C6.36521 10.5356 6.2932 9.81747 6.43351 9.12468C6.57382 8.43189 6.92015 7.79552 7.42871 7.29605C7.93726 6.79657 8.5852 6.45643 9.29058 6.31862C9.99597 6.18082 10.7271 6.25155 11.3916 6.52186C12.056 6.79217 12.624 7.24993 13.0235 7.83725C13.4231 8.42457 13.6364 9.11507 13.6364 9.82143C13.6352 10.7683 13.2517 11.676 12.57 12.3455C11.8883 13.015 10.9641 13.3917 10 13.3929Z"
                          fill="#4D4D4D"
                        />
                      </svg>
                      <span>{data?.city?.province?.name}</span>
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </Col>
          <Col
            lg={4}
            md={4}
            sm={4}
            xs={4}
            className="d-none d-lg-flex"
            style={{ flexDirection: "row-reverse" }}
          >
            <div className="d-none d-lg-flex justify-content-end">
              <a className="call-me" onClick={() => handleCallVendor(data)}>
                {connecting ? (
                  <Spinner
                    style={{ width: "0.7rem", height: "0.7rem" }}
                    type="grow"
                    color="dark"
                  />
                ) : (
                  <svg
                    width="21"
                    height="22"
                    viewBox="0 0 21 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.64413 14.7944C3.01474 14.7944 4.34077 14.5699 5.57766 14.1658C5.96767 14.0311 6.40226 14.1321 6.70312 14.4352L8.4526 16.6464C11.6061 15.1311 14.559 12.2688 16.1302 8.98007L13.9573 7.11681C13.6564 6.80252 13.5673 6.36476 13.6899 5.97191C14.1022 4.72599 14.3139 3.39027 14.3139 2.00966C14.3139 1.40354 14.8153 0.898438 15.4171 0.898438H19.2726C19.8743 0.898437 20.5986 1.16783 20.5986 2.00966C20.5986 12.4372 11.985 21.1025 1.64413 21.1025C0.852966 21.1025 0.540958 20.3954 0.540958 19.778V15.9056C0.540958 15.2995 1.0424 14.7944 1.64413 14.7944Z"
                      fill="#323232"
                    />
                  </svg>
                )}

                <span>تماس</span>
              </a>

              {/* <a className="chat" href="#">
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.04774 0.123047C7.63809 0.122936 6.25291 0.488759 5.02965 1.18422C3.80639 1.87968 2.78757 2.8806 2.07429 4.08766C1.36101 5.29472 0.97806 6.66596 0.963441 8.06532C0.948821 9.46468 1.30304 10.8435 1.99095 12.065L1.00096 14.6356C0.918662 14.8493 0.897786 15.0815 0.940661 15.3063C0.983536 15.5311 1.08847 15.7396 1.24377 15.9086C1.39907 16.0777 1.59861 16.2005 1.82015 16.2635C2.04168 16.3265 2.27649 16.3272 2.49838 16.2654L5.59148 15.4049C6.68712 15.9188 7.88513 16.1816 9.09689 16.1739C10.3087 16.1662 11.5032 15.8881 12.5921 15.3603C13.681 14.8324 14.6365 14.0683 15.3878 13.1245C16.1391 12.1806 16.6671 11.0811 16.9326 9.90735C17.1982 8.73358 17.1946 7.51557 16.922 6.34339C16.6494 5.17121 16.1149 4.07485 15.358 3.13542C14.601 2.19598 13.641 1.43751 12.549 0.916081C11.4569 0.394658 10.2608 0.123631 9.04898 0.123047H9.04774ZM6.6051 17.0877C7.36325 17.9642 8.30347 18.6674 9.36121 19.149C10.4189 19.6307 11.5691 19.8794 12.7328 19.8781C13.9678 19.8781 15.1407 19.6028 16.1903 19.1089L19.2822 19.9695C19.5041 20.0313 19.7389 20.0306 19.9604 19.9676C20.182 19.9046 20.3815 19.7817 20.5368 19.6127C20.6921 19.4437 20.797 19.2352 20.8399 19.0104C20.8828 18.7856 20.8619 18.5534 20.7796 18.3397L19.7909 15.7691C20.4641 14.5721 20.817 13.2236 20.8157 11.8526C20.8157 9.45733 19.7585 7.3065 18.0808 5.83598C18.2646 6.54711 18.3627 7.2774 18.373 8.01151C19.1292 9.10421 19.572 10.4278 19.572 11.8526C19.572 13.1491 19.2063 14.3603 18.5708 15.3913L18.4116 15.6506L19.618 18.7805L16.061 17.7928L15.8433 17.9014C14.9106 18.3755 13.8534 18.6435 12.7316 18.6435C11.3211 18.6456 9.94484 18.2129 8.79278 17.4051C8.05304 17.3859 7.31823 17.2793 6.60386 17.0877H6.6051Z"
                    fill="#555555"
                  />
                </svg>

                <span>گفت‌و‌گو</span>
              </a> */}
            </div>
          </Col>
        </Row>
        <div
          className="mt-20 d-flex d-lg-none"
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <a
              style={{
                boxSizing: "border-box",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: " 8px 16px",
                gap: "4px",
                width: "128px",
                height: "36px",
                background: "#FFC42E",
                borderRadius: "6px",
                marginLeft: "15px",
              }}
              onClick={
                data.category === "vendor"
                  ? () => handleCallVendor(data)
                  : (e) => {
                      e.preventDefault();
                    }
              }
            >
              {connecting ? (
                <Spinner
                  style={{ width: "0.7rem", height: "0.7rem" }}
                  type="grow"
                  color="dark"
                />
              ) : (
                <svg
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.48957 11.0044C2.57498 11.0044 3.62509 10.8267 4.60461 10.5067C4.91346 10.4 5.25762 10.48 5.49588 10.72L6.88132 12.4711C9.37865 11.2711 11.7171 9.00444 12.9614 6.4L11.2406 4.92444C11.0024 4.67556 10.9318 4.32889 11.0288 4.01778C11.3553 3.03111 11.523 1.97333 11.523 0.88C11.523 0.4 11.9201 0 12.3966 0H15.4499C15.9264 0 16.5 0.213333 16.5 0.88C16.5 9.13778 9.67868 16 1.48957 16C0.863028 16 0.615943 15.44 0.615943 14.9511V11.8844C0.615943 11.4044 1.01304 11.0044 1.48957 11.0044Z"
                    fill="#323232"
                  />
                </svg>
              )}

              <span
                style={{
                  fontSize: "12.9697px",
                  lineHeight: "19px",
                  color: "#222222",
                }}
              >
                تماس
              </span>
            </a>
            {/* <a
              href=""
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "8px 16px",
                gap: "4px",
                width: "106px",
                height: "37px",
                border: "0.810606px solid #323232",
                borderRadius: "6px",
              }}
            >
              <svg
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.02172 2.03793e-08C5.89076 -8.94094e-05 4.77943 0.294154 3.79801 0.853534C2.81659 1.41291 1.9992 2.21798 1.42693 3.18886C0.854668 4.15974 0.547428 5.26267 0.535699 6.38822C0.523969 7.51377 0.808159 8.62281 1.36007 9.60529L0.5658 11.6729C0.499773 11.8448 0.483024 12.0316 0.517422 12.2124C0.551821 12.3932 0.636013 12.5609 0.760607 12.6968C0.885201 12.8328 1.0453 12.9316 1.22303 12.9823C1.40077 13.033 1.58916 13.0335 1.76718 12.9838L4.24877 12.2916C5.1278 12.705 6.08896 12.9164 7.06116 12.9102C8.03336 12.904 8.99172 12.6803 9.86535 12.2558C10.739 11.8312 11.5055 11.2166 12.1083 10.4574C12.7111 9.69826 13.1347 8.81391 13.3478 7.86982C13.5608 6.92572 13.5579 5.94603 13.3392 5.00321C13.1206 4.06039 12.6917 3.17856 12.0844 2.42294C11.4771 1.66733 10.7069 1.05726 9.83076 0.637862C8.95461 0.218465 7.99494 0.000469852 7.02272 2.03793e-08H7.02172ZM5.062 13.6452C5.67026 14.3502 6.4246 14.9158 7.27322 15.3032C8.12184 15.6906 9.04464 15.8907 9.97828 15.8896C10.9691 15.8896 11.9101 15.6682 12.7522 15.2709L15.2328 15.9631C15.4108 16.0128 15.5992 16.0123 15.777 15.9616C15.9547 15.9109 16.1148 15.8121 16.2394 15.6761C16.364 15.5402 16.4482 15.3725 16.4826 15.1917C16.517 15.0109 16.5002 14.8241 16.4342 14.6522L15.6409 12.5846C16.1811 11.6218 16.4642 10.5372 16.4631 9.43448C16.4631 7.50786 15.615 5.77787 14.2689 4.59509C14.4164 5.16707 14.4951 5.75447 14.5034 6.34493C15.1101 7.22383 15.4653 8.28843 15.4653 9.43448C15.4653 10.4772 15.172 11.4515 14.6621 12.2807L14.5343 12.4893L15.5022 15.0068L12.6485 14.2123L12.4738 14.2997C11.7255 14.681 10.8773 14.8965 9.97728 14.8965C8.84568 14.8983 7.74146 14.5502 6.81717 13.9005C6.22368 13.885 5.63414 13.7993 5.061 13.6452H5.062Z"
                  fill="#555555"
                />
              </svg>

              <span
                style={{
                  width: "46px",
                  height: "21px",
                  fontStyle: "normal",
                  fontWeight: "700",
                  fontSize: "14px",
                  lineHeight: "21px",
                  color: "#222222",
                }}
              >
                گفت‌و‌گو
              </span>
            </a> */}
          </div>
        </div>
      </Container>
      <Modal size="lg" show={showModal} onHide={() => setShowModal(false)}>
        <ModalHeader>
          <ModalTitle>میزان رضایت از بنگاه : </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Formik initialValues={{}} enableReinitialize onSubmit={handleSubmit}>
            {({ values }) => (
              <Form>
                <div className="d mb-30">
                  <StarRatings
                    rating={rating}
                    starRatedColor="#fec32d"
                    changeRating={handleRatingChange}
                    numberOfStars={5}
                    name="rating"
                  />
                </div>
                <label htmlFor="content">متن نظر</label>
                <Field name="content" as="textarea" row={5} />
                <div className="d-flex justify-content-center">
                  <button className="ml-10 w-50">انصراف</button>
                  <button className="w-50">ثبت نظر</button>
                </div>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </>
  );
};

export interface UserVendorDataProps {
  data: UserVendor;
}

export default VendorHeader;
