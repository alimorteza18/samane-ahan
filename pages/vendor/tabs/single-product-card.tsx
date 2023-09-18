// ** Components
import { Badge, Card, CardBody, Col, Row } from "reactstrap";
// ** Services
import { dateToPersian } from "@/services/datetime-services";
import { seperateThousands } from "@/services/number-services";
import {
  getMainFilterOfType,
  getMainFilterLabelOfType,
} from "@/services/product-type-services";

export default function SingleProductCard({
  product,
  isEditMode,
}: SingleProductCardProps) {
  return (
    <Card
      className="bg-white rounded-md h-[7.75rem]"
      style={{
        height: "auto",
        boxShadow:
          "0 1px 2px rgba(0, 0, 0, 0.3), 0 2px 6px 2px rgba(0, 0, 0, 0.15)",
      }}
    >
      <CardBody>
        <Row className="pl-5 pr-5">
          <Col>
            <div>
              <span className="ml-5">
                {getMainFilterLabelOfType(product?.type_id)}:{" "}
              </span>
              <span className="text-black">
                {/* @ts-ignore */}
                {product?.details[getMainFilterOfType(product?.type_id)]}
              </span>
            </div>
            <div className="mt-5">
              <span className="ml-5"> کارخانه: </span>
              <span className="text-black">{product.details.factory}</span>
            </div>
          </Col>
          <Col>
            <div>
              <span className="ml-5"> تاریخ: </span>
              <span className="text-black">
                {dateToPersian(product.price_confirmed_at)}
              </span>
            </div>
            <div className="mt-5">
              <span className="ml-5"> محل بار: </span>
              <span className="text-black">
                {product.details.freight_place}
              </span>
            </div>
          </Col>
          <Col>
            <div>
              <span className="ml-5"> نوع: </span>
              <span className="text-black">{product.details.type}</span>
            </div>
            <div className="mt-5">
              <span className="ml-5"> دسته‌بندی: </span>
              <span className="text-black">{product.details.kind}</span>
            </div>
          </Col>
          <Col>
            <div>
              <span className="ml-5"> قیمت: </span>
              <span style={{ color: "green" }}>
                {seperateThousands(product.vendor_price)}
              </span>
            </div>

            {isEditMode ? (
              <div>
                <span className="ml-5"> شناسه: </span>
                <a
                  target="_blank"
                  href={`https://panel.samaneahan.com/products/${product?.id}`}
                >
                  <Badge color="danger">{product?.id}</Badge>
                </a>
              </div>
            ) : null}
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}

interface SingleProductCardProps {
  product: Product;
  isEditMode: boolean;
}
