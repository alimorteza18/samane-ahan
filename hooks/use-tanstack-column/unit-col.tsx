const UnitCol = ({ row }: { row: Product }) => {
  // @ts-ignore
  return <span style={{ fontWeight: "500" }}>{row.unit}</span>;
};

export default UnitCol;
