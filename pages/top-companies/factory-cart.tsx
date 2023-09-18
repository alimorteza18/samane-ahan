import { Row, Spinner } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import useAuth from "@/hooks/use-auth";
import Link from "next/link";

export default function FactoryCart(props: any) {
  const {
    id,
    slug = null,
    permissions,
    name,
    vendor_profile_img,
    loading,
    title,
    rate,
    province_name,
  } = props;

  const { isEditMode } = useAuth();

  return (
    <Link href={`/vendor/${slug ?? id}`}>
      <div className="factory-card mt-50" style={{ position: "relative" }}>
        {isEditMode ? (
          <a
            className="position-absolute"
            href={`https://panel.samaneahan.com/vendors/${id}`}
            target="_blank"
          >
            <FontAwesomeIcon color="black" className="p-10" icon={faUserEdit} />
          </a>
        ) : null}
        <div
          className="detail"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <div className="profile-img">
            <img
              src={
                vendor_profile_img
                  ? vendor_profile_img
                  : "assets/imgs/theme/Default_profile.svg"
              }
              alt=""
            />
            <span>{title}</span>
          </div>
          <div>
            <span>{name}</span>
            <hr style={{ border: "2px solid #ffc020", margin: "5px 0" }} />
            <svg
              width={18}
              height={18}
              viewBox="0 0 20 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 0C7.3488 0.00307185 4.80708 1.03881 2.93239 2.88002C1.05771 4.72123 0.00313834 7.21757 1.0639e-05 9.82143C-0.00316471 11.9493 0.704538 14.0194 2.01455 15.7143C2.01455 15.7143 2.28728 16.067 2.33183 16.1179L10 25L17.6718 16.1134C17.7118 16.0661 17.9854 15.7143 17.9854 15.7143L17.9864 15.7116C19.2957 14.0175 20.0031 11.9483 20 9.82143C19.9969 7.21757 18.9423 4.72123 17.0676 2.88002C15.1929 1.03881 12.6512 0.00307185 10 0ZM10 13.3929C9.2808 13.3929 8.57774 13.1834 7.97975 12.791C7.38175 12.3985 6.91567 11.8407 6.64044 11.1882C6.36521 10.5356 6.2932 9.81747 6.43351 9.12468C6.57382 8.43189 6.92015 7.79552 7.42871 7.29605C7.93726 6.79657 8.5852 6.45643 9.29058 6.31862C9.99597 6.18082 10.7271 6.25155 11.3916 6.52186C12.056 6.79217 12.624 7.24993 13.0235 7.83725C13.4231 8.42457 13.6364 9.11507 13.6364 9.82143C13.6352 10.7683 13.2517 11.676 12.57 12.3455C11.8883 13.015 10.9641 13.3917 10 13.3929Z"
                // fill="#ffcb11"
                stroke="#ffc020"
                strokeWidth={2}
              />
            </svg>
            <label>{province_name}</label>
            {isEditMode ? <label>امتیاز: ({rate}) </label> : null}
          </div>
        </div>
        <div className="mt-10 d-flex" style={{ justifyContent: "center" }}>
          <Swiper
            className="custom-class"
            // centerInsufficientSlides={true}
            autoplay
            spaceBetween={50}
            pagination={{ clickable: true }}
            breakpoints={{
              300: { slidesPerView: 3, spaceBetween: 5 },
              480: { slidesPerView: 3, spaceBetween: 5 },
              640: { slidesPerView: 3, spaceBetween: 10 },
              768: { slidesPerView: 3, spaceBetween: 10 },
              1024: { slidesPerView: 3, spaceBetween: 10 },
              1200: { slidesPerView: 6, spaceBetween: 4 },
            }}
          >
            {loading ? (
              <Row style={{ placeContent: "center" }}>
                <Spinner />
              </Row>
            ) : (
              permissions &&
              permissions.map((item: any, i: any) => (
                <>
                  <SwiperSlide
                    key={i}
                    style={{
                      height: "64%",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "flex",
                      justifyContent: "center",
                      padding: "0 25px",
                      borderLeft:
                        permissions.length - 1 !== i
                          ? "3px solid #ffbd16"
                          : "0px",
                    }}
                  >
                    <span style={{ paddingLeft: "8px" }}>
                      {item?.id === 3 ? "قوطی" : item.type}
                    </span>
                  </SwiperSlide>
                </>
              ))
            )}
          </Swiper>
        </div>
      </div>
    </Link>
  );
}
