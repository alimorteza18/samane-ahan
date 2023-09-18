const FreightPlaceCol = (row: Product) => {
  return (
    <span
      style={{
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        color: "black",
        fontWeight: "500",
      }}
    >
      {/* @ts-ignore */}
      {row.freight_place}
    </span>
  );
};

export default FreightPlaceCol;
