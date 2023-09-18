import Link from "next/link";

const Breadcrumb = ({
  parent = "خانه",
  sub,
  subChild,
  noBreadcrumb,
}: Breadcrumb) => {
  return (
    <>
      <div
        className={`page-header breadcrumb-wrap ${noBreadcrumb}`}
        style={{ borderBottom: "none" }}
      >
        <div className="container">
          <div className="breadcrumb">
            <Link href="/" legacyBehavior>
              <a>{parent}</a>
            </Link>

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
      </div>
    </>
  );
};

interface Breadcrumb {
  /**
   * @default خانه
   */
  parent?: string;
  sub?: string;
  subChild?: any;
  noBreadcrumb?: string;
}

export default Breadcrumb;
