import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import LazyLoad from "react-lazyload";

SwiperCore.use([Navigation, Autoplay]);

const VendorsSlider = ({ data }: VendorsSliderProps) => {
  return (
    <>
      <Swiper
        spaceBetween={0}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          300: { slidesPerView: 1 },
          480: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1200: { slidesPerView: 5 },
        }}
        navigation={{
          prevEl: ".custom_prev_ct1",
          nextEl: ".custom_next_ct1",
        }}
        className="custom-class"
      >
        {data.map((item, i) => (
          <SwiperSlide key={i}>
            <a href={`/vendor/${item.id}`}>
              <div
                className="seller-card mt-50"
                style={{ position: "relative", boxShadow: "none" }}
              >
                <div className="profile-img">
                  <div className="position-relative" style={{ height: "100%" }}>
                    <LazyLoad once>
                      <img src={item.vendor_profile_img} alt="" />
                    </LazyLoad>
                    <span className="position-absolute card-title">
                      فروشنده
                    </span>
                  </div>
                </div>

                <div
                  className="card-inner"
                  style={{ boxShadow: "0 5px 7px rgba(0, 0, 0, 0.3)" }}
                >
                  <div className="card-inner-inner">
                    <div
                      style={{
                        position: "absolute",
                        top: "0",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                        backgroundColor: "#fff",
                        fontSize: "10px",
                        fontWeight: "700",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <svg
                        width={22}
                        height={22}
                        viewBox="0 0 20 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 0C7.3488 0.00307185 4.80708 1.03881 2.93239 2.88002C1.05771 4.72123 0.00313834 7.21757 1.0639e-05 9.82143C-0.00316471 11.9493 0.704538 14.0194 2.01455 15.7143C2.01455 15.7143 2.28728 16.067 2.33183 16.1179L10 25L17.6718 16.1134C17.7118 16.0661 17.9854 15.7143 17.9854 15.7143L17.9864 15.7116C19.2957 14.0175 20.0031 11.9483 20 9.82143C19.9969 7.21757 18.9423 4.72123 17.0676 2.88002C15.1929 1.03881 12.6512 0.00307185 10 0ZM10 13.3929C9.2808 13.3929 8.57774 13.1834 7.97975 12.791C7.38175 12.3985 6.91567 11.8407 6.64044 11.1882C6.36521 10.5356 6.2932 9.81747 6.43351 9.12468C6.57382 8.43189 6.92015 7.79552 7.42871 7.29605C7.93726 6.79657 8.5852 6.45643 9.29058 6.31862C9.99597 6.18082 10.7271 6.25155 11.3916 6.52186C12.056 6.79217 12.624 7.24993 13.0235 7.83725C13.4231 8.42457 13.6364 9.11507 13.6364 9.82143C13.6352 10.7683 13.2517 11.676 12.57 12.3455C11.8883 13.015 10.9641 13.3917 10 13.3929Z"
                          fill="#fff"
                          stroke="#ffbd16"
                          strokeWidth={2}
                        />
                      </svg>
                      <span className="mr-5" style={{ color: "#000" }}>
                        {item.province.name}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <h6
                        style={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.name}
                      </h6>
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          color: "#B6B6B6",
                          fontSize: "12px",
                        }}
                      >
                        {item.modir_name}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: "#ffbd16",
                        padding: "2px 10px",
                        borderRadius: "15px",
                        color: "black",
                        fontWeight: "600",
                      }}
                    >
                      امتیاز بنگاه:{item.rate}
                    </span>
                  </div>

                  <div
                    className="mt-10 d-flex"
                    style={{ justifyContent: "center" }}
                  >
                    <Swiper
                      className="custom-class"
                      spaceBetween={50}
                      pagination={{ clickable: true }}
                      breakpoints={{
                        300: { slidesPerView: 3, spaceBetween: 5 },
                        480: { slidesPerView: 3, spaceBetween: 5 },
                        640: { slidesPerView: 3, spaceBetween: 20 },
                        768: { slidesPerView: 4, spaceBetween: 30 },
                        1024: { slidesPerView: 5, spaceBetween: 40 },
                        1200: { slidesPerView: 6, spaceBetween: 4 },
                      }}
                    >
                      {item.permissions &&
                        item.permissions.map((item: any, i: any) => (
                          <>
                            <SwiperSlide
                              key={i}
                              style={{
                                whiteSpace: "nowrap",
                                display: "flex",
                                justifyContent: "center",
                                padding: "0 25px",
                                borderLeft:
                                  item.permissions.length - 1 !== i
                                    ? "4px solid #ffbd16"
                                    : "0px",
                              }}
                            >
                              <span style={{ paddingLeft: "8px" }}>
                                {item?.type}
                              </span>
                            </SwiperSlide>
                          </>
                        ))}
                    </Swiper>
                  </div>
                </div>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className="slider-arrow slider-arrow-2 flex-right carausel-10-columns-arrow"
        id="carausel-10-columns-arrows"
      ></div>
    </>
  );
};

interface VendorsSliderProps {
  data: UserVendor[];
}

export default VendorsSlider;
