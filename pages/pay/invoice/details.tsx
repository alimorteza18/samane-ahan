import { dateToPersian } from "@/services/datetime-services";
import { Col, Row, Spinner } from "react-bootstrap";
import type { InvoiceProps } from "./header";
import { seperateThousands } from "@/services/number-services";

const InvoiceDetails = ({ loading, payment }: InvoiceProps) => {
  return (
    <div className="invoice-top">
      <Row>
        <Col>
          <Row>
            <div className="invoice-number">
              <h4 className="invoice-title-1 mb-10">مشتری:</h4>
              <p className="invoice-addr-1">
                <strong>{payment?.transaction?.name}</strong>
              </p>
            </div>
          </Row>
          <Row>
            <h4 className="invoice-title-1 mb-10">تاریخ خرید:</h4>
            <p className="invoice-from-1">
              {loading ? (
                <Spinner animation="grow" size="sm" />
              ) : payment?.transaction ? (
                dateToPersian(payment.transaction.created_at)
              ) : (
                "-"
              )}
            </p>
          </Row>
        </Col>
        <Col>
          <Row>
            <h4 className="invoice-title-1 mb-10">مبلغ:</h4>
            <p className="invoice-from-1">
              {payment?.transaction?.amount
                ? seperateThousands(payment?.transaction?.amount)
                : "-"}
            </p>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default InvoiceDetails;
