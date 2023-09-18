import { Col, Row } from "react-bootstrap";

const InvoiceFooter = () => {
  return (
    <div className="invoice-bottom">
      <Row className="row">
        <Col sm={6}>
          <div>
            <h3 className="invoice-title-1">نکات:</h3>
            <ul className="important-notes-list-1">
              <li>تمام مبالغ نشان داده شده در این فاکتور به تومان می باشد</li>
              <li>پس از انجام سفارش، پول قابل بازپرداخت نیست</li>
              <li>ممکن است تحویل به دلیل وابستگی خارجی به تاخیر بیفتد</li>
            </ul>
          </div>
        </Col>
        <Col sm={6} className="col-offsite">
          <div className="text-end" style={{ textAlignLast: "end" }}>
            <p className="mb-0 text-13">متشکریم از اعتماد شما</p>
            <p>
              <strong>سامانه آهن</strong>
            </p>
            <div className="mobile-social-icon mt-50 print-hide">
              <h6>دنبال کنید</h6>
              <a href="#">
                <img src="/assets/imgs/theme/icons/icon-facebook-white.svg" />
              </a>
              <a href="#">
                <img src="/assets/imgs/theme/icons/icon-twitter-white.svg" />
              </a>
              <a href="#">
                <img src="/assets/imgs/theme/icons/icon-instagram-white.svg" />
              </a>
              <a href="#">
                <img src="/assets/imgs/theme/icons/icon-pinterest-white.svg" />
              </a>
              <a href="#">
                <img src="/assets/imgs/theme/icons/icon-youtube-white.svg" />
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default InvoiceFooter;
