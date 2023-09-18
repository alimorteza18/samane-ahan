import { CountUp } from "use-count-up";
import { InView } from "react-intersection-observer";

const StatisticSection = () => {
  return (
    <InView>
      {({ ref, inView }) => (
        <section ref={ref} className="container mb-50 d-none d-md-block">
          <div className="row about-count">
            <div className="col-lg-3 col-md-6 text-center mb-lg-0 mb-md-5">
              <h1 className="heading-1">
                <span className="count">
                  <CountUp isCounting={inView} end={4500} duration={2} />
                </span>
                +
              </h1>
              <h4>بنگاه‌ها</h4>
            </div>
            <div className="col-lg-3 col-md-6 text-center">
              <h1 className="heading-1">
                <span className="count">
                  <CountUp isCounting={inView} end={30000} duration={2} />
                </span>
                +
              </h1>
              <h4>بارهای ثبت شده</h4>
            </div>
            <div className="col-lg-3 col-md-6 text-center">
              <h1 className="heading-1">
                <span className="count">
                  <CountUp isCounting={inView} end={500} duration={2} />
                </span>
                +
              </h1>
              <h4>مصرف‌کننده‌ها</h4>
            </div>
            <div className="col-lg-3 text-center d-none d-lg-block">
              <h1 className="heading-1">
                <span className="count">
                  <CountUp isCounting={inView} end={30000} duration={2} />
                </span>
                +
              </h1>
              <h4>کاربران</h4>
            </div>
          </div>
        </section>
      )}
    </InView>
  );
};

export default StatisticSection;
