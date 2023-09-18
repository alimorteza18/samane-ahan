// ** Hooks
import { useEffect } from "react";
import { useRouter } from "next/router";
import useHttp from "@/hooks/use-http";
// ** Components
import { Col, Container, Row, Spinner } from "react-bootstrap";
import Link from "next/link";
import Button from "@/components/input/button";
import Alert from "react-bootstrap/Alert";
// ** Partials
import InvoiceFooter from "./footer";
import InvoiceHeader from "./header";
import InvoiceDetails from "./details";
// ** Services
import { verifyPayment } from "@/services/payment-services";
import { VerifyPaymentProps } from "@/types/services";

const PaymentInvoice = () => {
  const router = useRouter();
  const query = router.query;

  const { data, execute, loading } = useHttp<VerifyPayment, VerifyPaymentProps>(
    verifyPayment,
    { transaction_id: query?.Authority }
  );

  useEffect(() => {
    if (query?.Authority) {
      execute().then((res) => {
        if (res?.data?.data?.success) localStorage.removeItem("newVendor");
      });
    }
  }, []);

  return (
    <div className="invoice invoice-content invoice-1">
      <div className="back-top-home hover-up mt-30 ml-30">
        <Link className="hover-up" href="/">
          <i className="fi-rs-home mr-5" /> صفحه اصلی
        </Link>
      </div>
      <Container>
        <Row>
          <Col lg={12}>
            <div className="invoice-inner">
              <div className="invoice-info" id="invoice_wrapper">
                <InvoiceHeader payment={data} loading={loading} />
                <Col className="p-10 text-center" style={{ fontSize: "20px" }}>
                  {loading ? (
                    <Alert variant="secondary">
                      <Spinner animation="border" />
                    </Alert>
                  ) : data?.success ? (
                    <Alert variant="success">
                      <i className="fi-rs-check ml-10" />
                      پرداخت موفق بود
                    </Alert>
                  ) : (
                    <Alert variant="danger">
                      <i className="fi-rs-cross ml-10" />
                      پرداخت ناموفق بوده است
                    </Alert>
                  )}
                </Col>
                <InvoiceDetails payment={data} loading={loading} />
                {/* <InvoiceItems /> */}
                <InvoiceFooter />
              </div>
              <div className="invoice-btn-section clearfix d-print-none">
                <Button
                  href={`/${query?.redirect?.toString()}`}
                  size="lg"
                  className=" btn-download hover-up"
                  label="بازگشت"
                  icon={<i className="fi-rs-sign-out ml-5" />}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PaymentInvoice;
