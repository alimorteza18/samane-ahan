// ** Hooks
import useHttp from "@/hooks/use-http";
import { useRouter } from "next/router";
// ** Components
import Layout from "@/components/layout/Layout";
import { Col, Container, Row } from "react-bootstrap";
import SimpleTable from "@/components/elements/simple-table";
import Button from "@/components/input/button";
import Breadcrumb2 from "../../../components/layout/Breadcrumb2";
// ** Services
import { connect } from "react-redux";
import { fetchShopPackages } from "@/services/payment-services";
import { seperateThousands } from "@/services/number-services";
import { addPackageToCart } from "@/redux/action/package";

const Cart = ({ addPackageToCart, selectedPackages }: PayPageProps) => {
  const router = useRouter();
  const group_id = router.query.group_id;
  const { data } = useHttp<ShopPackage[]>(
    fetchShopPackages,
    { group_id },
    true
  );
  return (
    <>
      <Breadcrumb2
        parent="خانه"
        sub="خرید"
        subChild="آیتم‌ها"
        title="تعرفه خدمات سامانه آهن"
      />
      <section className="mt-50 mb-50">
        <Container>
          <Row>
            <Col lg={8}>
              <SimpleTable
                rows={data}
                columns={[
                  { name: "title", label: "عنوان" },
                  {
                    name: "price",
                    label: "قیمت",
                    render: (row: ShopPackage) => (
                      <Button
                        block
                        onClick={() => addPackageToCart(row)}
                        style={
                          selectedPackages.includes(row)
                            ? { backgroundColor: "#3BB77E", border: "none" }
                            : {}
                        }
                      >
                        {seperateThousands(row.price / 10)}
                        {selectedPackages.includes(row) ? (
                          <i className="fi-rs-check ml-10" />
                        ) : null}
                      </Button>
                    ),
                  },
                ]}
              />
            </Col>

            <Col lg={4}>
              <div className="border p-md-4 p-30 border-radius cart-totals">
                <div className="heading_s1 mb-3">
                  <h4>جمع</h4>
                </div>
                <div className="table-responsive">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td className="cart_total_label">قابل پرداخت</td>
                        <td className="cart_total_amount">
                          <strong>
                            <span className="font-xl fw-900 text-brand">
                              {selectedPackages.length
                                ? seperateThousands(
                                    selectedPackages.reduce(
                                      (sum, item) => sum + item.price,
                                      0
                                    ) / 10
                                  )
                                : 0}
                            </span>
                          </strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <Button
                  href="/pay/checkout"
                  label="ادامه"
                  block
                  style={{ backgroundColor: "#3BB77E", border: "none" }}
                  icon={<i className="fi-rs-arrow-left mr-10" />}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

interface PayPageProps {
  selectedPackages: ShopPackage[];
  addPackageToCart: any;
}

const mapStateToProps = (state: any) => ({
  selectedPackages: state.packages,
});

const mapDispatchToProps = {
  addPackageToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
