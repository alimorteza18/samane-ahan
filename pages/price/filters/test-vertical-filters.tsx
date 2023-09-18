const TestVerticalFilters = () => {
  return (
    <>
      <div id="filterbar" className="collapse show">
        <div className="box border-bottom">
          <div className="form-group text-center">
            <div className="btn-group" data-toggle="buttons">
              <label className="btn btn-success form-check-label">
                <input className="form-check-input" type="radio" /> Reset{" "}
              </label>
              <label className="btn btn-success form-check-label active">
                <input className="form-check-input" type="radio" /> Apply
              </label>
            </div>
          </div>
          <div>
            <label className="tick">
              New
              <input type="checkbox" checked />
              <span className="check"></span>
            </label>
          </div>
          <div>
            <label className="tick">
              Sale
              <input type="checkbox" />
              <span className="check"></span>
            </label>
          </div>
        </div>
        <div className="box border-bottom">
          <div className="box-label text-uppercase d-flex align-items-center">
            Outerwear
            <button
              className="btn ml-auto"
              type="button"
              data-toggle="collapse"
              data-target="#inner-box"
              aria-expanded="true"
              aria-controls="inner-box"
              id="out"
            >
              <span className="fas fa-plus"></span>
            </button>
          </div>
          <div id="inner-box" className="mt-2 mr-1 collapse show">
            <div className="my-1">
              {" "}
              <label className="tick">
                Windbreaker
                <input type="checkbox" checked />
                <span className="check"></span>
              </label>
            </div>
            <div className="my-1">
              <label className="tick">
                Jumpsuit
                <input type="checkbox" />
                <span className="check"></span>
              </label>
            </div>
            <div className="my-1">
              <label className="tick">
                Jacket
                <input type="checkbox" />
                <span className="check"></span>
              </label>
            </div>
            <div className="my-1">
              <label className="tick">
                Coat
                <input type="checkbox" />
                <span className="check"></span>
              </label>
            </div>
            <div className="my-1">
              <label className="tick">
                Raincoat
                <input type="checkbox" />
                <span className="check"></span>
              </label>
            </div>
            <div className="my-1">
              <label className="tick">
                Handbag
                <input type="checkbox" />
                <span className="check"></span>
              </label>
            </div>
            <div className="my-1">
              <label className="tick">
                Warm vest
                <input type="checkbox" />
                <span className="check"></span>
              </label>
            </div>
            <div className="my-1">
              <label className="tick">
                Wallets
                <input type="checkbox" />
                <span className="check"></span>
              </label>
            </div>
          </div>
        </div>
        <div className="box border-bottom">
          <div className="box-label text-uppercase d-flex align-items-center">
            season
            <button
              className="btn ml-auto"
              type="button"
              data-toggle="collapse"
              data-target="#inner-box2"
              aria-expanded="true"
              aria-controls="inner-box2"
            >
              <span className="fas fa-plus"></span>
            </button>
          </div>
          <div id="inner-box2" className="mt-2 mr-1 collapse show">
            <div className="my-1">
              <label className="tick">
                Spring
                <input type="checkbox" checked />
                <span className="check"></span>
              </label>
            </div>
            <div className="my-1">
              <label className="tick">
                Summer
                <input type="checkbox" />
                <span className="check"></span>
              </label>
            </div>
            <div className="my-1">
              <label className="tick">
                Autumn
                <input type="checkbox" />
                <span className="check"></span>
              </label>
            </div>
            <div className="my-1">
              <label className="tick">
                Winter
                <input type="checkbox" />
                <span className="check"></span>
              </label>
            </div>
            <div className="my-1">
              <label className="tick">
                Rainy
                <input type="checkbox" />
                <span className="check"></span>
              </label>
            </div>
          </div>
        </div>
        <div className="box border-bottom">
          <div className="box-label text-uppercase d-flex align-items-center">
            price
            <button
              className="btn ml-auto"
              type="button"
              data-toggle="collapse"
              data-target="#price"
              aria-expanded="false"
              aria-controls="price"
            >
              <span className="fas fa-plus"></span>
            </button>
          </div>
          <div className="collapse" id="price">
            <div className="middle">
              <div className="multi-range-slider">
                <input
                  type="range"
                  id="input-left"
                  min="0"
                  max="100"
                  value="10"
                />
                <input
                  type="range"
                  id="input-right"
                  min="0"
                  max="100"
                  value="50"
                />
                <div className="slider">
                  <div className="track"></div>
                  <div
                    className="range"
                    style={{ left: "10%", right: "50%" }}
                  ></div>
                  <div className="thumb left" style={{ left: "10%" }}></div>
                  <div className="thumb right" style={{ left: "50%" }}></div>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between mt-2">
              <div>
                <span id="amount-left" className="font-weight-bold">
                  1000
                </span>{" "}
                uah
              </div>
              <div>
                <span id="amount-right" className="font-weight-bold">
                  5000
                </span>{" "}
                uah
              </div>
            </div>
          </div>
        </div>
        <div className="box">
          <div className="box-label text-uppercase d-flex align-items-center">
            size
            <button
              className="btn ml-auto"
              type="button"
              data-toggle="collapse"
              data-target="#size"
              aria-expanded="false"
              aria-controls="size"
            >
              <span className="fas fa-plus"></span>
            </button>
          </div>
          <div id="size" className="collapse">
            <div
              className="btn-group d-flex align-items-center flex-wrap"
              data-toggle="buttons"
            >
              <label className="btn btn-success form-check-label">
                <input className="form-check-input" type="checkbox" /> 80
              </label>
              <label className="btn btn-success form-check-label">
                <input className="form-check-input" type="checkbox" /> 92
              </label>
              <label className="btn btn-success form-check-label">
                <input className="form-check-input" type="checkbox" /> 102
              </label>
              <label className="btn btn-success form-check-label">
                <input className="form-check-input" type="checkbox" /> 104
              </label>
              <label className="btn btn-success form-check-label">
                <input className="form-check-input" type="checkbox" /> 106
              </label>
              <label className="btn btn-success form-check-label">
                <input className="form-check-input" type="checkbox" /> 108
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestVerticalFilters;
