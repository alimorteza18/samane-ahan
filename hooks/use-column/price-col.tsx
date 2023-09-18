import { seperateThousands } from "@/services/number-services";

const PriceCol = (row: Product) => (
  <span className="cell-price">{seperateThousands(row.price)}</span>
);

export default PriceCol;
