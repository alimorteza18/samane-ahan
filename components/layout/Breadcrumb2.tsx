import Link from "next/link";
import Tags from "../ecommerce/Filter/Tags";

type BreadcrumbType = {
  parent?: string;
  sub?: string;
  subChild?: any;
  noBreadcrumb?: string;
  title: any;
};

const Breadcrumb2 = ({
  parent,
  sub,
  subChild = "",
  title = "",
  noBreadcrumb,
}: BreadcrumbType) => {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="archive-header">
            <div className="row align-items-center">
              <div className="col-xl-3">
                <h1 className="mb-15 text-capitalize">{title}</h1>
                <div className="breadcrumb">
                  {parent ? (
                    <Link href="/">
                      <i className="fi-rs-home mr-5"></i>
                      {parent}
                    </Link>
                  ) : null}

                  {sub ? (
                    <>
                      <span></span>
                      {sub}
                    </>
                  ) : null}
                  {subChild ? (
                    <>
                      <span></span>
                      {subChild}
                    </>
                  ) : null}
                </div>
              </div>
              <div className="col-xl-9 text-end d-none d-xl-block">
                {/* <Tags /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Breadcrumb2;
