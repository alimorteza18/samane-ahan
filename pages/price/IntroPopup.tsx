import { fetchVendor } from "@/services/vendor-services";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Modal } from "reactstrap";

const IntroPopup = ({ handleCall }: any) => {
  const [openClass, setOpenClass] = useState<boolean>(false);
  const router = useRouter();

  const handleRemove = () => setOpenClass(false);

  const callVendor = () => {
    fetchVendor({ id: 1070 }).then((vendor) => {
      handleCall(vendor.data.data);
      handleRemove();
    });
  };

  useEffect(() => {
    const hasModalShownToday = localStorage.getItem("callmodalShownToday");
    const currentDate = new Date().toDateString();

    if (!hasModalShownToday || hasModalShownToday !== currentDate) {
      if (
        router.pathname === "/" ||
        router.pathname === "/price/[type_kind_size]" ||
        router.pathname === "/price/[type_kind_size]/[factory]" ||
        router.pathname === "/vendor/[id]"
      ) {
        setOpenClass(true);
        localStorage.setItem("callmodalShownToday", currentDate);
      }
    }
  }, [router.pathname]);

  return (
    <Modal
      // @ts-ignore
      isOpen={openClass}
      contentClassName="no-bg-modal align-items-center"
      size="lg"
    >
      <i
        className="fi-rs-cross"
        style={{
          position: "absolute",
          right: "15%",
          color: "white",
          top: "5%",
          zIndex: 2,
          cursor: "pointer",
        }}
        onClick={handleRemove}
      />
      <div style={{ position: "relative", textAlign: "center" }}>
        <img
          style={{ width: "80%", height: "auto" }}
          src="/assets/imgs/banner/good-price-call-banner.jpg"
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "30%",
            cursor: "pointer",
          }}
          onClick={callVendor}
        ></div>
      </div>
    </Modal>
  );
};

export default IntroPopup;
