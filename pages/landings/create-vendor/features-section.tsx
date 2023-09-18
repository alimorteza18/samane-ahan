import { Col, Row } from "react-bootstrap";
import FeatureCard from "./feature-card";

const FeaturesSection = () => {
  const features = [
    {
      title: "اعلام بار روزانه",
      description:
        "شما می توانید هر روز موجودی و قیمت کالای خود را در شعبه آنلاین خود اعلام کنید",
      image: "/assets/imgs/theme/icons/icon-1.svg",
    },
    {
      title: "معامله بدون کارمزد",
      description: "سامانه آهن هیچ کارمزدی از معاملات شما برنمی‌دارد",
      image: "/assets/imgs/theme/icons/icon-3.svg",
    },
    {
      title: "برندینگ",
      description:
        "حضور شما در میان اطلاعات فعالین حوزه فولاد و قرار گرفتن در معرض جستجوهای اینترنتی اعتبار برند شما را افزایش خواهد داد",
      image: "/assets/imgs/theme/icons/icon-6.svg",
    },
    {
      title: "گالری و کاتالوگ",
      description:
        "شما می‌توانید عکس، فیلم و کاتالوگ از دفتر و انبار و فعالیت شرکت خودتون رو در شعبه خودتون بارگزاری کنید",
      image: "/assets/imgs/theme/icons/icon-5.svg",
    },
    {
      title: "دیجیتال مارکتینگ",
      description:
        "راه‌اندازی شعبه آنلاین فرصت مناسبی برای استفاده از تکنولوژی برای معاملات بهتر در بستر دیجیتال است",
      image: "/assets/imgs/theme/icons/icon-4.svg",
    },
    {
      title: "فروش بهتر",
      description:
        "شما با ثبت اطلاعاتی خود در فضای اینترنت در کنار دیگر آهن‌فروشان می‌توانید احتمال فروش خود را بالاتر ببرید",
      image: "/assets/imgs/theme/icons/icon-2.svg",
    },
  ];

  return (
    <section className="text-center mb-50">
      <h2 className="title style-3 mb-40">
        <span style={{ color: "#3bb77e" }}>
          راه اندازی شعبه اینترنتی چه کمکی به شما میکند؟
        </span>
      </h2>
      <Row>
        {features.map((f, i) => (
          <Col key={i} lg={4} md={6} className="mb-24">
            <FeatureCard {...f} />
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default FeaturesSection;
