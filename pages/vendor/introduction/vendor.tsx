// ** Hooks
import { useContext } from "react";
import { VendorProfileDataContext } from "../[id].page";
// ** Components
import { Carousel } from "react-bootstrap";
import { Gallery, Item } from "react-photoswipe-gallery";
import { Col, Row } from "reactstrap";
// ** Partials
import SingleIntroItem from "./single-intro-item";
// ** Services
import { getType } from "../service";

const VendorIntroduction = () => {
  const { introduction } = useContext(VendorProfileDataContext);

  return (
    <>
      <Row className="d-none d-lg-flex">
        <Gallery>
          <Col md={5}>
            {getType(introduction.data[0].file_path) === "mp4" ? (
              <video
                controls
                style={{
                  height: "393px",
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              >
                <source src={introduction.data[0].file_path} type="video/mp4" />
              </video>
            ) : (
              <Item
                key={introduction?.data[0].id}
                original={introduction?.data[0].file_path}
                thumbnail={introduction?.data[0].file_path}
              >
                {({ ref, open }) => (
                  <img
                    // @ts-ignore
                    ref={ref}
                    onClick={open}
                    className="bongahnema"
                    style={{
                      height: "394px",
                      borderRadius: "10px",
                    }}
                    src={introduction.data[0].file_path}
                  />
                )}
              </Item>
            )}
          </Col>
          <Col md={7}>
            <Row>
              <Col xs={6}>
                <SingleIntroItem item={introduction?.data[1]} />
              </Col>

              <Col xs={6}>
                <SingleIntroItem item={introduction?.data[2]} />
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <SingleIntroItem item={introduction?.data[3]} />
              </Col>
              <Col xs={6}>
                <SingleIntroItem item={introduction?.data[4]} />
              </Col>
            </Row>
          </Col>
        </Gallery>
      </Row>
      <Row>
        <Gallery>
          <Carousel className="d-flex d-lg-none">
            {introduction?.data?.map((gal) =>
              getType(gal.file_path) === "mp4" ? (
                <Carousel.Item>
                  <video
                    controls
                    style={{
                      height: "393px",
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
                </Carousel.Item>
              ) : (
                <Carousel.Item>
                  <Item
                    key={gal.id}
                    original={gal.file_path}
                    thumbnail={gal.file_path}
                  >
                    {({ ref, open }) => (
                      <img
                        style={{
                          height: "393px",
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
              )
            )}
          </Carousel>
        </Gallery>
      </Row>
    </>
  );
};

export default VendorIntroduction;
