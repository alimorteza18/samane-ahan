import { dateToPersian } from "@/services/datetime-services";
import { Col, Row, Spinner } from "react-bootstrap";

const InvoiceHeader = ({ payment, loading }: InvoiceProps) => {
  return (
    <div
      className="invoice-header"
      style={{
        background:
          "rgba(0, 0, 0, 0.04) url(/assets/imgs/invoice/header-bg-1.png) top left repeat",
      }}
    >
      <Row>
        <Col sm={6}>
          <div className="invoice-name">
            <div className="logo">
              <a href="index.html">
                <img src="/assets/imgs/theme/logo-black.png" alt="logo" />
              </a>
            </div>
          </div>
        </Col>
        <Col sm={6}>
          <div className="invoice-numb" style={{ textAlignLast: "end" }}>
            <h6 className="text-end mb-10 mt-20">
              تاریخ:{" "}
              {loading ? (
                <Spinner animation="grow" size="sm" />
              ) : payment?.transaction ? (
                dateToPersian(payment.transaction.created_at)
              ) : (
                "-"
              )}
            </h6>
            <h6 className="text-end invoice-header-1">
              شماره فاکتور:{" "}
              {loading ? (
                <Spinner animation="grow" size="sm" />
              ) : payment?.transaction ? (
                payment.transaction.id
              ) : (
                "-"
              )}
            </h6>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export interface InvoiceProps {
  payment: VerifyPayment;
  loading: boolean;
}

export default InvoiceHeader;
