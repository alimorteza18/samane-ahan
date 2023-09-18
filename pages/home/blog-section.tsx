import Button from "@/components/input/button";
import BlogsGrid from "@/components/widgets/blogs-grid";
import { Col, Container, Row } from "reactstrap";

const BlogSection = ({ sectionId = "blog-section" }) => {
  return (
    <section id={sectionId} className="mb-100 mt-10">
      <Container>
        <Row className="mt-100">
          <Col lg={12} className="mb-lg-0 mb-md-5 mb-sm-5">
            <BlogsGrid />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BlogSection;
