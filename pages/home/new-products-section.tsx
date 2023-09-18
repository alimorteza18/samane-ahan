import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import Table from "./table";
import { useState } from "react";
import { fetchGroupedProducts } from "@/services/product-services";
import useHttp from "@/hooks/use-http";
import {
  PRODUCT_TYPE,
  PRODUCT_TYPE_DETAILS,
} from "@/services/product-type-services";
import { Progress } from "reactstrap";

const NewProductsSection = ({ currentTime = "00:00" }) => {
  const [typeId, setTypeId] = useState(PRODUCT_TYPE.REBAR);
  const types = PRODUCT_TYPE_DETAILS[typeId];

  const {
    data: girders,
    loading: girdersLoading,
    setSingleFieldValue: girderSetSingleFieldValue,
  } = useHttp<Array<GroupedProduct>>(
    fetchGroupedProducts,
    {
      type_id: PRODUCT_TYPE.GIRDER,
      // per_page: 400,
      sizeValue: 18,
      order: "created_at",
      includes: [
        { name: "userVendor", fields: ["id", "name", "vendor_profile_img"] },
      ],
    },
    true
  );

  const {
    data: rebars,
    setData,
    loading: rebarsLoading,
    setSingleFieldValue: rebarSetSingleFieldValue,
  } = useHttp<Array<GroupedProduct>>(
    fetchGroupedProducts,
    {
      type_id: PRODUCT_TYPE.REBAR,
      // per_page: 400,
      sizeValue: 16,
      order: "created_at",
      includes: [
        { name: "userVendor", fields: ["id", "name", "vendor_profile_img"] },
      ],
    },
    true
  );

  let data = [...(girders ?? []), ...(rebars ?? [])];

  return (
    <section>
      <Container fluid>
        <div className="list-sellers mt-50 mb-50">
          <div className="title">لیست قیمت آهن فروشی‌ها</div>
          {girdersLoading || rebarsLoading ? (
            <div
              style={{ width: "100%", height: "10px", marginBottom: "50px" }}
            >
              <Progress
                animated
                value={100}
                color="warning"
                style={{ borderRadius: 0 }}
              />
            </div>
          ) : (
            <Row className="mt-50 justify-content-center">
              {data && Object.keys(data).length > 0
                ? // @ts-ignore
                  data.map((res: any) => (
                    <Col md={6}>
                      <Table
                        currentTime={currentTime}
                        product={res}
                        setData={setData}
                        loading={girdersLoading || rebarsLoading}
                        setSingleFieldValue={
                          res?.items[0]?.type_id == PRODUCT_TYPE.GIRDER
                            ? girderSetSingleFieldValue
                            : rebarSetSingleFieldValue
                        }
                      />
                    </Col>
                  ))
                : null}
            </Row>
          )}

          <div className="see-all-product">
            <Link href="/price/rebar-ribbed">مشاهده تمام محصولات</Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default NewProductsSection;
