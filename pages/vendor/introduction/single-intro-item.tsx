import { Item, ItemProps } from "react-photoswipe-gallery";
import { getType } from "../service";
import Button from "@/components/input/button";

interface SingleIntroProps {
  item: GalleryIntroduction;
}

const SingleIntroItem = ({ item }: SingleIntroProps) => {
  let itemProps: Omit<ItemProps, "children"> = {};

  if (item) {
    itemProps = {
      original: item?.file_path,
      thumbnail:
        getType(item?.file_path) !== "pdf"
          ? item?.file_path
          : "/assets/imgs/theme/icons/file-pdf.png",
    };

    if (getType(item?.file_path) === "pdf") {
      itemProps.content = (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            borderRadius: "10px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <Button label="دانلود" href={item.file_path} target="_blank" />

            <p style={{ fontSize: "20px", color: "white", marginTop: "30px" }}>
              برای مشاهده فایل PDF روی دانلود کلیک کنید
            </p>
          </div>
        </div>
      );
    }
  }

  return typeof item === "undefined" ? (
    <img
      className="bongahnema"
      src={"/assets/imgs/theme/placeholder-image.svg"}
    />
  ) : (
    <Item {...itemProps}>
      {({ ref, open }) => (
        <img
          // @ts-ignore
          ref={ref}
          style={{ borderRadius: "10px" }}
          onClick={open}
          className="bongahnema"
          src={
            getType(item.file_path) !== "pdf"
              ? item.file_path
              : "/assets/imgs/theme/icons/file-pdf.png"
          }
        />
      )}
    </Item>
  );
};

export default SingleIntroItem;
