import Link from "next/link";
import { Col, Row } from "react-bootstrap";

export default function BlogsGrid() {
  var data = [
    {
      id: 1,
      title: "گزارش تصویری دومین نشست فولادیم",
      category: "فولادیم",
      href: "https://blog.samaneahan.com/fooladium/%d9%81%d9%88%d9%84%d8%a7%d8%af%db%8c%d9%85-2/",
      img: "https://blog.samaneahan.com/wp-content/uploads/2022/11/jpeg-optimizer-7f71b915-4e79-4dbc-a60e-69624f8a4314-780x470.jpg",
      desc: "دومین نشست تجار، کارخانجات و مصرف کنندگان آهن ایران",
    },
    {
      id: 2,
      title: "میز آهن ایران",
      category: "میز آهن ایران",
      href: "https://blog.samaneahan.com/fooladium/%D9%85%DB%8C%D8%B2-%D8%A2%D9%87%D9%86-%D8%A7%DB%8C%D8%B1%D8%A7%D9%86/",
      img: "https://blog.samaneahan.com/wp-content/uploads/2022/11/IMG_20221116_103503_823-780x470.jpg",
      desc: "اولین نشست مصرف کنندگان و فروشندگان آهن ایران",
    },
    {
      id: 3,
      title: "کتاب فولاد ایران رونمایی شد",
      category: "فولادیم",
      href: "https://blog.samaneahan.com/fooladium/%da%a9%d8%aa%d8%a7%d8%a8-%d9%81%d9%88%d9%84%d8%a7%d8%af-%d8%a7%db%8c%d8%b1%d8%a7%d9%86-%d8%b1%d9%88%d9%86%d9%85%d8%a7%db%8c%db%8c-%d8%b4%d8%af/",
      img: "https://blog.samaneahan.com/wp-content/uploads/2022/11/1216bcec-78db-4279-b1ef-2c873a5e6b39.jpg",
      desc: "اطلاعات کارخانه‌ها، صاحبان بار و مصرف‌کننده را در کتاب فولاد ایران پیدا کنید",
    },
  ];

  return (
    <>
      <Row>
        {data.map((item, i) => (
          <Col xl={4} lg={4} md={4} sm={12}>
            <article className={"text-center hover-up mb-30 animated"} key={i}>
              <div className="post-thumb">
                <Link href={item.href} target="_blank">
                  <img className="border-radius-15" src={item.img} />
                </Link>
                <div className="entry-meta">
                  <Link
                    href={item.href}
                    target="_blank"
                    style={{ padding: "2px", width: "50px" }}
                  >
                    {item.category}
                  </Link>
                </div>
              </div>
              <div className="entry-content-2">
                <h6 className="mb-10 font-sm">
                  <Link
                    href={item.href}
                    target="_blank"
                    className="entry-meta text-muted"
                  >
                    {item.title}
                  </Link>
                </h6>
                <p className="post-title mb-15">
                  <Link href={item.href} target="_blank">
                    {item.desc}
                  </Link>
                </p>
              </div>
            </article>
          </Col>
        ))}
      </Row>
    </>
  );
}
