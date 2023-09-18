const InvoiceItems = () => {
  return (
    <div className="invoice-center">
      <div className="table-responsive">
        <table className="table table-striped invoice-table">
          <thead className="bg-active">
            <tr>
              <th>آیتم ها:</th>
              <th className="text-center">قیمت</th>
              <th className="text-center">تعداد</th>
              <th className="text-right">مبلغ نهایی</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="item-desc-1">
                  <span>کاپشن چرمی</span>
                  <small>شناسه: 156932</small>
                </div>
              </td>
              <td className="text-center">140.000 تومان</td>
              <td className="text-center">1</td>
              <td className="text-right">140.000 تومان</td>
            </tr>
            <tr>
              <td>
                <div className="item-desc-1">
                  <span>پالتو چرمی</span>
                  <small>شناسه: 456821</small>
                </div>
              </td>
              <td className="text-center">180.000 تومان</td>
              <td className="text-center">3</td>
              <td className="text-right">180.000 تومان</td>
            </tr>
            <tr>
              <td>
                <div className="item-desc-1">
                  <span>موز بسته 1 کیلوگرمی</span>
                  <small>شناسه: 4986343</small>
                </div>
              </td>
              <td className="text-center">64.000 تومان</td>
              <td className="text-center">1</td>
              <td className="text-right">640.000 تومان</td>
            </tr>
            <tr>
              <td>
                <div className="item-desc-1">
                  <span>گوشت گوساله بسته 1 کیلوگرمی</span>
                  <small>شناسه: 654684</small>
                </div>
              </td>
              <td className="text-center">220.000 تومان</td>
              <td className="text-center">1</td>
              <td className="text-right">220.000 تومان</td>
            </tr>
            <tr>
              <td colSpan={3} className="text-end f-w-600">
                جمع کل
              </td>
              <td className="text-right">1.180.000 تومان</td>
            </tr>
            <tr>
              <td colSpan={3} className="text-end f-w-600">
                هزینه ارسال
              </td>
              <td className="text-right">45.000 تومان</td>
            </tr>
            <tr>
              <td colSpan={3} className="text-end f-w-600">
                قیمت کل فاکتور
              </td>
              <td className="text-right f-w-600">1.225.000 تومان</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceItems;
