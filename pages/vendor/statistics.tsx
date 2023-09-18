import { Card, CardBody, Col, Row } from "reactstrap";

export default function Statistics({ statistics }: VendorStatisticsProps) {
  const data = [
    {
      title: "بازدید کل از بنگاه",
      precentage: "20%+",
      svg: `<svg
    width="10"
    height="9"
    viewBox="0 0 10 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.8987 0.707031C4.37081 -0.110677 5.55107 -0.110677 6.02317 0.707031L9.20988 6.22656C9.68198 7.04427 9.09185 8.06641 8.14764 8.06641H1.77423C0.830026 8.06641 0.239896 7.04427 0.712 6.22656L3.8987 0.707031Z"
      fill="#009A53"
    />
  </svg>`,
      statistic: `${statistics.all_hits} بازدید`,
    },
    {
      title: "بازدیدهای امروز",
      precentage: "5%-",
      svg: `<svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.02317 8.29297C5.55107 9.11068 4.37081 9.11068 3.8987 8.29297L0.712001 2.77344C0.239897 1.95573 0.830027 0.933593 1.77424 0.933593L8.14764 0.933593C9.09185 0.933594 9.68198 1.95573 9.20988 2.77344L6.02317 8.29297Z" fill="#E32929"/>
    </svg>
    `,
      statistic: `${statistics.today_hits} بازدید`,
    },
    {
      title: "تعداد تماس با بنگاه",
      precentage: "40%+",
      svg: `<svg
    width="10"
    height="9"
    viewBox="0 0 10 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.8987 0.707031C4.37081 -0.110677 5.55107 -0.110677 6.02317 0.707031L9.20988 6.22656C9.68198 7.04427 9.09185 8.06641 8.14764 8.06641H1.77423C0.830026 8.06641 0.239896 7.04427 0.712 6.22656L3.8987 0.707031Z"
      fill="#009A53"
    />
  </svg>`,
      statistic: `${statistics.all_getnumber} مورد`,
    },
    {
      title: "تعداد کل کالای به روزشده  ",
      precentage: "30%-",
      svg: `<svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.02317 8.29297C5.55107 9.11068 4.37081 9.11068 3.8987 8.29297L0.712001 2.77344C0.239897 1.95573 0.830027 0.933593 1.77424 0.933593L8.14764 0.933593C9.09185 0.933594 9.68198 1.95573 9.20988 2.77344L6.02317 8.29297Z" fill="#E32929"/>
    </svg>
    `,
      statistic: `${statistics.all_submited_products} مورد`,
    },
  ];
  return (
    <Card className="vendor-stats">
      <CardBody>
        <p>آمار و گزارشات</p>
        <Row>
          {data
            ? data.map((item, i) => (
                <Col xs={6} className="mt-10" key={i}>
                  <div className="box">
                    <label>{item.title}</label>
                    {/* <div>
                      <span
                        dangerouslySetInnerHTML={{ __html: item.svg }}
                      ></span>
                    </div> */}
                    <div>
                      <span>{item.statistic}</span>
                    </div>
                  </div>
                </Col>
              ))
            : null}
        </Row>
      </CardBody>
    </Card>
  );
}

interface VendorStatisticsProps {
  statistics: VendorStatistics;
}
