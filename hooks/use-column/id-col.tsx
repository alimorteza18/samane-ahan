import { Badge } from "reactstrap";

const IdCol = (row: Product) => {
  return (
    <Badge>
      <a
        target="_blank"
        href={`https://panel.samaneahan.com/products/${row?.id}`}
      >
        {row.id}
      </a>
    </Badge>
  );
};

export default IdCol;
