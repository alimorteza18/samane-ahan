// ** Hooks
import useHttp from "@/hooks/use-http";
import { useRouter } from "next/router";
// ** Components
import Breadcrumb2 from "@/components/layout/Breadcrumb2";
import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
// ** Services
import { fetchProductKinds } from "@/services/product-kind-services";
import { getProductKindByTypeAndKindTitle } from "./service";

export default function KindsPage(props: KindsPageProps) {
  const { data: kinds = [] } = useHttp<ProductKind[]>(
    fetchProductKinds,
    { type_id: props.type.id },
    true
  );
  const router = useRouter();
  return (
    <>
      <Breadcrumb2
        parent={"خانه"}
        sub={"صورتبار"}
        subChild={props?.type?.label}
        title={props?.type?.label}
      />
      <div className="container pr-50 pl-50 mb-100">
        <div className="page-content pt-20">
          <Container>
            <Row>
              {kinds?.map((item, index) => (
                <Col sm={2} className="hover-up">
                  <Link
                    href={`/price/${props.type.enLabel}-${
                      getProductKindByTypeAndKindTitle(
                        props.type?.label,
                        item.kind
                      )?.enLabel
                    }`}
                  >
                    <div className="rounded overflow-hidden shadow-lg">
                      <div className="relative">
                        <img
                          className="w-full lazyLoad isLoaded pr-30 pl-30"
                          src={item?.image}
                        />
                      </div>
                      <div className="py-4 text-center">
                        <span className="text-gray-500 text-sm fs-5">
                          {item?.kind}
                        </span>
                      </div>
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

interface KindsPageProps {
  type: {
    id: number;
    label: string;
    enLabel: string;
  };
}
