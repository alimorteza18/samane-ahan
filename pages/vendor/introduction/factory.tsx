// ** Hooks
import { useContext } from "react";
import { VendorProfileDataContext } from "../[id].page";
// ** Components
import { Gallery, Item } from "react-photoswipe-gallery";
import { Col, Row } from "reactstrap";
// ** Styles
import { Carousel } from "react-bootstrap";
import { getType } from "../service";

const FactoryIntroduction = () => {
  const { introduction } = useContext(VendorProfileDataContext);

  const splitArrayByFileType = () => {
    const result: Array<Array<GalleryIntroduction>> = [];
    let innerArray: Array<GalleryIntroduction> = [];

    introduction?.data?.forEach((obj, i) => {
      innerArray.push(obj);

      if (
        (innerArray.length === 3 &&
          getType(innerArray[0].file_path) === "mp4") ||
        i === introduction.data.length - 1 || // Check if it's the last element
        innerArray.length === 4
      ) {
        result.push(innerArray);
        innerArray = [];
      }
    });

    console.log(result);
    return result;
  };

  return (
    <Gallery>
      {/* desktop */}
      <Carousel
        className="d-none d-lg-flex d-md-flex"
        controls={false}
        touch
        pause="hover"
        indicators={false}
      >
        {splitArrayByFileType().map((row, rowIndex) => (
          <Carousel.Item key={rowIndex}>
            <Row>
              {row.map(({ id, file_path }, colIndex) =>
                getType(file_path) == "mp4" ? (
                  <Col key={colIndex} md={6}>
                    <video
                      controls
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    >
                      <source
                        src={introduction.data[0].file_path}
                        type="video/mp4"
                      />
                    </video>
                  </Col>
                ) : (
                  <Item key={id} original={file_path} thumbnail={file_path}>
                    {({ ref, open }) => (
                      <Col key={colIndex} md={3}>
                        <img
                          style={{
                            height: "370px",
                            overflowX: "scroll",
                            borderRadius: "10px",
                          }}
                          // @ts-ignore
                          ref={ref}
                          onClick={open}
                          className="bongahnema"
                          src={file_path}
                        />
                      </Col>
                    )}
                  </Item>
                )
              )}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* mobile */}
      <Carousel className="d-flex d-md-none">
        {introduction?.data?.map((gal) =>
          getType(gal.file_path) == "img" ? (
            <Carousel.Item>
              <Item
                key={gal.id}
                original={gal.file_path}
                thumbnail={gal.file_path}
              >
                {({ ref, open }) => (
                  <img
                    style={{
                      height: "370px",
                      overflowX: "scroll",
                      borderRadius: "10px",
                    }}
                    // @ts-ignore
                    ref={ref}
                    onClick={open}
                    className="bongahnema"
                    src={gal.file_path}
                  />
                )}
              </Item>
            </Carousel.Item>
          ) : (
            <Carousel.Item>
              <Item
                key={gal.id}
                original={gal.file_path}
                thumbnail={gal.file_path}
              >
                {({ ref, open }) => (
                  <video
                    controls
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  >
                    <source
                      src={introduction.data[0].file_path}
                      type="video/mp4"
                    />
                  </video>
                )}
              </Item>
            </Carousel.Item>
          )
        )}
      </Carousel>
    </Gallery>
  );
};

export default FactoryIntroduction;
