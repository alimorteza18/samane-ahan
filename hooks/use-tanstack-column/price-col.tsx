import { seperateThousands } from "@/services/number-services";

const PriceCol = ({ row }: { row: Product }) => {
  return <span className="cell-price">{seperateThousands(row.price)}</span>;
};

export default PriceCol;
