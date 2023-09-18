import { Col, Row } from "reactstrap";

const VendorReviewsTabContent = ({ data }: any) => {
  return (
    <Row>
      <Col sm="12">
        <h4>نظرات مشتریان</h4>
        <Row>
          {data?.comments?.map((comment: any) => (
            <Col lg={3}>
              <span>{comment.user.name ? comment.user.name : "ناشناس"} : </span>
              <p>{comment.content}</p>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default VendorReviewsTabContent;
