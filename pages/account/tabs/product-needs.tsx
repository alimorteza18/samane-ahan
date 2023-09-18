const ProductNeeds = ({ active = false }) => {
  return (
    <div className={"tab-pane fade " + (active ? "active show" : "hidden")}>
      <div className="card">
        <div className="card-header">
          <h3 className="mb-0">نیاز خریداران</h3>
        </div>
        <div className="card-body contact-from-area">
          <h5> در حال ویرایش ...</h5>
        </div>
      </div>
    </div>
  );
};

export default ProductNeeds;
