// components
import { Gallery, Item, ItemProps } from "react-photoswipe-gallery";
import { Col, Row, Container } from "reactstrap";
import { Carousel } from "react-bootstrap";
import Button from "@/components/input/button";
// services
import { getType } from "../service";
// hooks
import { useContext, useRef, useCallback } from "react";
import { VendorProfileDataContext } from "../[id].page";

export default function GallerySingle(gallery: any) {
  const { dataGallery } = useContext(VendorProfileDataContext);

  return (
    <>
      <Gallery options={{}}>
        <Row className=" d-none d-md-flex">
          {dataGallery?.length
            ? dataGallery.map((gal: any) =>
                getType(gal.file_path) === "mp4" ? (
                  <Col lg={3} md={4} xs={6}>
                    {/* <video controls>
                      <source src={gal?.file_path} />
                    </video> */}
                  </Col>
                ) : (
                  <Col lg={3} md={4} xs={6}>
                    <SingleItem item={gal} />
                  </Col>
                )
              )
            : null}
        </Row>
      </Gallery>
      <Row className="text-center d-flex d-md-none">
        <Gallery>
          <Carousel>
            {dataGallery?.length
              ? dataGallery.map((gal: any) => (
                  <Carousel.Item>
                    {getType(gal.file_path) === "mp4" ? (
                      // <video controls>
                      //   <source src={gal?.file_path} />
                      // </video>
                      <a href="#">dlkldkjdljkdj</a>
                    ) : (
                      <SingleItem item={gal} />
                    )}
                  </Carousel.Item>
                ))
              : null}
          </Carousel>
        </Gallery>
      </Row>
    </>
  );
}
const SingleItem = ({ item }: SingleItemProp) => {
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

  return (
    <Item {...itemProps}>
      {({ ref, open }) => (
        <img
          // @ts-ignore
          ref={ref}
          onClick={open}
          className="img-fluid img-thumbnail"
          src={
            getType(item.file_path) !== "pdf"
              ? item.file_path
              : "/assets/imgs/theme/icons/file-pdf.png"
          }
          style={{
            width: "100%",
            height: "250px",
            objectFit: "cover",
            objectPosition: "50% 50%",
          }}
        />
      )}
    </Item>
  );
};

interface SingleItemProp {
  item: GalleryIntroduction;
}
