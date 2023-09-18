import Breadcrumb2 from "@/components/layout/Breadcrumb2";
import useHttp from "@/hooks/use-http";
import { fetchProductTypes, PRODUCT_TYPE } from "@/services/product-type-services"; //prettier-ignore
import Link from "next/link";
import { Row } from "reactstrap";

export default function Price() {
  const { data: types = [] } = useHttp<ProductType[]>(
    fetchProductTypes,
    {
      ids: [
        PRODUCT_TYPE.GIRDER,
        PRODUCT_TYPE.REBAR,
        PRODUCT_TYPE.CAN,
        PRODUCT_TYPE.SHEET,
        PRODUCT_TYPE.CORNER,
        PRODUCT_TYPE.STUD,
      ],
    },
    true
  );

  return (
    <>
      <Breadcrumb2 title="دسته بندی های محصولات" />
      <div className="container pr-50 pl-50 mt-50">
        <div className="page-content pt-20">
          <div className="container">
            <div className="archive-header-2 text-center">
              <h1 className="display-2 mb-50"></h1>
            </div>
            <Row className="mb-100">
              {types?.map((type) => (
                <div className="col-lg-2 col-md-2">
                  <Link href={`price/${type?.slug}`}>
                    <div
                      className="banner-img wow animate__animated animate__fadeInUp"
                      data-wow-delay=".2s"
                    >
                      <i
                        className={`icon icon-${type.id}`}
                        style={{ fontSize: "30px" }}
                      />
                      <img src={type?.img} alt="" />
                      <h4 className="list-inline-item">{type?.type}</h4>
                      <div className="banner-text"></div>
                    </div>
                  </Link>
                </div>
              ))}
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}
