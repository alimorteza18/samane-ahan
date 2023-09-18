import { Badge } from "reactstrap";

const IdCol = ({ row }: { row: Product }) => {
  return (
    <Badge>
      <a
        target="_blank"
        href={`https://panel.samaneahan.com/crawler/products?product_id=${row?.id}`}
      >
        {row.id}
      </a>
    </Badge>
  );
};

export default IdCol;
