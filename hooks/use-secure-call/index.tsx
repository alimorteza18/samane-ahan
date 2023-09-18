// ** Hooks
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// ** Components
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast } from "react-toastify";
// ** Services
import { makePhoneCallToVendor } from "@/services/vendor-services";
import { fetchUserProfile, login, sendLoginOTP } from "@/services/auth-service";
import { saveAccessToken, saveLoggedInUserData } from "@/redux/action/auth";
import { Col, Container, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneFlip, faBatteryFull, faSignal, faVolumeMute, faMessage } from "@fortawesome/free-solid-svg-icons"; //prettier-ignore
import { pushToDataLayer } from "@/components/partials/GoogleTagManager";
import { setMatomoUser } from "@/components/partials/Matomo";

const MySwal = withReactContent(Swal);

export type UseSecureCallReturn = {
  handleCallVendor: (vendor: UserVendor, otherDatas?: any) => void;
  CallModalsContainer: () => JSX.Element;
  connecting: boolean;
};

export type UseSecureCall = (props?: { time?: string }) => UseSecureCallReturn;

const useSecureCall: UseSecureCall = (props) => {
  const [activeVendor, setActiveVendor] = useState<UserVendor | undefined>();

  const [connect, setConnect] = useState<"connecting" | "connected" | null>(
    null
  );

  const { time = "00:00" } = props || {};

  // For cancelling the call
  const [callTimeoutId, setCallTimeoutId] = useState<any>(null);

  const CallModalsContainer = () => {
    return (
      <div
        className={`modal mt-10 ${
          connect === "connecting" || connect === "connected" ? "show" : ""
        }`}
        tabIndex={-1}
        style={{
          height: "auto",
          display:
            connect === "connecting" || connect === "connected"
              ? "block"
              : "none",
        }}
      >
        <div
          className="modal-dialog modal-dialog-centered"
          style={{
            background:
              "linear-gradient(98deg, rgba(14,125,96,1) 0%, rgba(51,218,112,1) 100%)",
            borderRadius: "5px",
          }}
        >
          <div
            className="modal-content"
            style={{
              background: "transparent" /* Add the custom background style */,
            }}
          >
            <div className="modal-body">
              <Container
                fluid
                className="call-screen"
                style={{ minWidth: "20rem" }}
              >
                <Row className="notification-bar">
                  {/* Notification bar icons (clock, battery, antenna) */}
                  <Col xs={6}>
                    <FontAwesomeIcon
                      icon={faBatteryFull}
                      className="text-white ml-10"
                      style={{ fontSize: "15px" }}
                    />
                    <FontAwesomeIcon
                      icon={faSignal}
                      className="text-white"
                      style={{ fontSize: "15px" }}
                    />
                  </Col>
                  <Col
                    xs={6}
                    className="text-white fw-bold"
                    style={{ textAlign: "left" }}
                  >
                    {time}
                  </Col>
                </Row>
                <div className="mt-50">
                  <div
                    className="avatar-lg img-thumbnail rounded-circle flex-shrink-0"
                    style={{ width: "35%", margin: "30px auto" }}
                  >
                    <img
                      src={
                        activeVendor?.vendor_profile_img ??
                        "/assets/imgs/theme/Default_profile.svg"
                      }
                      className="img-fluid d-block rounded-circle"
                    />
                  </div>

                  <h3 className="text-center mt-10 text-white">
                    {activeVendor?.name ?? "بدون نام"}
                  </h3>

                  <h5 className="text-center mt-20 text-black">
                    سامانه آهن با شما تماس می‌گیرد
                  </h5>
                  <h5 className="text-center mt-20 text-black">
                    تا به بنگاه متصل شوید
                  </h5>
                  <h5 className="text-center mt-20 fw-900">.......</h5>

                  {connect === "connected" ? (
                    <div className="text-center mt-20">
                      <h5 className="text-black fw-bold">
                        تلفن خود را پاسخ دهید
                      </h5>
                      <h5 className="text-black fw-bold mt-10">
                        تا ارتباط برقرار شود
                      </h5>
                    </div>
                  ) : null}
                </div>
                <Row className="mt-50">
                  <Col style={{ textAlign: "left" }} xs={6}>
                    <FontAwesomeIcon
                      icon={faMessage}
                      className="text-white"
                      style={{ fontSize: "25px" }}
                    />
                  </Col>
                  <Col style={{ textAlign: "right" }} xs={6}>
                    <FontAwesomeIcon
                      icon={faVolumeMute}
                      className="text-white"
                      style={{ fontSize: "25px" }}
                    />
                  </Col>
                </Row>
                <Row className="mt-70 mb-20" style={{ placeContent: "center" }}>
                  <button
                    onClick={() => {
                      if (callTimeoutId) clearTimeout(callTimeoutId);
                      setConnect(null);
                    }}
                    style={{
                      backgroundColor: "red",
                      borderRadius: "50%",
                      width: "70px",
                      height: "70px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faPhoneFlip}
                      style={{ fontSize: "30px" }}
                    />
                  </button>
                </Row>
              </Container>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const { profile } = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();

  /**
   * @description open the call modal
   * @param vendor
   * @param userPhoneNumber
   * @param otherDatas
   */
  const sendCallRequest = async (
    vendor: UserVendor,
    userPhoneNumber: any,
    otherDatas?: any
  ) => {
    setConnect("connecting");

    // for google tag manager
    pushToDataLayer({
      event: "vendorCall.confirmed",
      vendorName: vendor?.name,
      vendorId: vendor?.id,
      caller: userPhoneNumber,
    });

    if (window?._paq && profile?.user) {
      const matomoUserId = profile?.vendor
        ? profile?.vendor?.name
        : profile?.user?.name
        ? profile?.user?.name
        : profile?.user?.username;

      setMatomoUser(profile?.user?.id + " - " + matomoUserId, {
        userId: profile?.user?.id,
        userName: profile?.user?.name,
        vendorId: profile?.vendor?.id,
        link: profile?.vendor
          ? `https://panel.samaneahan.com/vendors/${profile?.vendor?.id}`
          : `https://panel.samaneahan.com/users/${profile?.user?.id}`,
      });
    }

    try {
      // setting a timeout to cancel it from inside modal
      const timeoutId = setTimeout(async () => {
        await makePhoneCallToVendor({
          vendor_id: vendor?.id,
          caller: userPhoneNumber,
          ...otherDatas,
        });

        setConnect("connected");
        setCallTimeoutId(null);
      }, 2000);

      setCallTimeoutId(timeoutId);
    } catch (error) {
      setConnect(null);
      setCallTimeoutId(null);
    }
  };

  /**
   * @description when user clicks on call button on vendor header or price page
   * @param vendor
   * @param otherDatas
   */
  const handleCallVendor = async (vendor: UserVendor, otherDatas?: any) => {
    setActiveVendor(vendor);

    pushToDataLayer({
      event: "vendorCall.request",
      vendorName: vendor?.name,
      vendorId: vendor?.id,
    });

    let userPhoneNumber = profile?.user?.mobile ?? null;

    if (!userPhoneNumber) {
      const {
        value: caller,
        isDismissed: phoneNumberDismissed,
        isConfirmed: phoneNumberConfirmed,
      } = await MySwal.fire({
        title: `<h4 style="margin-top:7px">برای تماس با بنگاه،</h4>
        <h4 style="line-height:22px"> می‌بایست شماره همراه خود را وارد کنید</h4>`,
        html: `<p class="mt-20">
                  <div class="custome-checkbox text-end">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="termsCheckbox"
                      style="width: auto"
                    />
                    <label
                      class="form-check-label"
                      for="termsCheckbox"
                    >
                      <span>با <a target="_blank" href="/terms">قوانین</a> سایت موافقم.</span>
                    </label>
                  </div>
                </p>
                <label for="swal2-input" class="swal2-input-label">شماره همراه</label>
                <input class="swal2-input product-call-phone-input" id="swal2-input" placeholder="09-- --- ----" type="tel">

           
        `,
        showCloseButton: true,
        confirmButtonText: "تایید",
        customClass: {
          closeButton: "product-table-call-close-btn",
          confirmButton: "product-table-call-confirm-btn",
        },
        // @ts-ignore
        preConfirm: () => {
          //@ts-ignore
          const phoneNumber = document.getElementById("swal2-input").value;
          const termsCheckbox =
            //@ts-ignore
            document.getElementById("termsCheckbox").checked;

          if (!termsCheckbox)
            return Swal.showValidationMessage(
              "لطفا قوانین و مقررات را مطالعه کنید"
            );

          if (!phoneNumber)
            return Swal.showValidationMessage(
              "لطفا شماره موبایل خود را وارد کنید"
            );

          const regex = /^(\+98|0)?9\d{9}$/;

          if (!regex.test(phoneNumber))
            return Swal.showValidationMessage(
              "شماره موبایل وارد شده نامعتبر است"
            );

          return phoneNumber;
        },
      });

      if (phoneNumberConfirmed) {
        userPhoneNumber = caller;

        pushToDataLayer({
          event: "vendorCall.phoneEntered",
          vendorName: vendor?.name,
          vendorId: vendor?.id,
          caller: userPhoneNumber,
        });

        sendLoginOTP({ mobile: userPhoneNumber })
          .then(async (results: any) => {
            const {
              value: otp,
              isDismissed,
              isConfirmed,
            } = await MySwal.fire({
              title: "لطفا کد پیامک شده به شماره همراه خود را وارد کنید",
              input: "number",
              inputLabel: "کد یکبار مصرف",
              inputPlaceholder: "- - - - -",
              showCancelButton: true,
              confirmButtonText: "برقراری تماس",
              cancelButtonText: "لغو",
              //@ts-ignore
              inputValidator: async (value) => {
                if (!value) {
                  return "لطفا کد پیامک شده به شماره همراه خود را وارد کنید";
                }

                try {
                  const res = await login({
                    // @ts-ignore
                    mobile: userPhoneNumber,
                    login_code: value,
                    grant_type: "sms",
                  });

                  //@ts-ignore
                  dispatch(saveAccessToken(res.data.access_token));

                  const userProfileRes = await fetchUserProfile({
                    access_token: res.data.access_token,
                  });

                  const loggedInUserData: AuthUserProfile =
                    userProfileRes.data.data;

                  let tags = "";

                  if (loggedInUserData?.vendor) {
                    tags = `بنگاه,${loggedInUserData?.vendor?.name},${
                      process.env.SITE_URL +
                      "/vendor/" +
                      loggedInUserData?.vendor?.id
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

                  //@ts-ignore
                  dispatch(saveLoggedInUserData(userProfileRes.data.data));
                } catch (err: any) {
                  console.log("err", err);
                  console.log("err?.response", err?.response);
                  console.log("err?.response?.data", err?.response?.data);
                  return err.response.data.message;
                }
              },
            });

            if (isConfirmed)
              sendCallRequest(vendor, userPhoneNumber, otherDatas);
          })
          .catch((err: any) => {
            console.log(err);
            toast.error("ارسال پیامک تایید با خطا مواجه شد", { rtl: true });
          });
      }
    } else {
      sendCallRequest(vendor, userPhoneNumber, otherDatas);
    }
  };

  return {
    handleCallVendor,
    CallModalsContainer,
    connecting: connect === "connecting",
  };
};

export default useSecureCall;
