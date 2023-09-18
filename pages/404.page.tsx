import Link from "next/link";
function Custom404() {
  return (
    <>
      <main className="main page-404">
        <div className="page-content pt-150 pb-150">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-lg-10 col-md-12 m-auto text-center">
                <p className="mb-20">
                  <img
                    src="/assets/imgs/page/page-404.png"
                    alt=""
                    className="hover-up"
                  />
                </p>
                <h1 className="display-2 mb-30">صفحه مورد نظر یافت نشد</h1>
                <p className="font-lg text-grey-700 mb-30">
                  ممکن است لینک خراب باشد و یا صفحه مورد نظر حذف شده باشد
                  <br />
                  به صفحه{" "}
                  <Link legacyBehavior href="/">
                    <a>
                      {" "}
                      <span> اصلی</span>{" "}
                    </a>
                  </Link>
                  بروید و یا درباره مشکل پیش آمده به صفحه{" "}
                  <Link legacyBehavior href="/page-contact">
                    <a>
                      {" "}
                      <span>تماس با ما</span>{" "}
                    </a>
                  </Link>
                  رفته و به ما اطلاع دهید.
                </p>

                <Link legacyBehavior href="/">
                  <a className="btn btn-default submit-auto-width font-xs hover-up mt-30">
                    <i className="fi-rs-home mr-5"></i> بازگشت به صفحه اصلی
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Custom404;
