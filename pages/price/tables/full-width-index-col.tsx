interface FullWidthIndexColumnProps {
  factory_group_item: any;
}

const FullWidthIndexColumn = ({
  factory_group_item,
}: FullWidthIndexColumnProps) => {
  return (
    <span
      className={
        factory_group_item.group_by_value.length > 8 &&
        factory_group_item.items?.length === 1
          ? "dt-full-width-text-animate"
          : "dt-full-width-text"
      }
      style={{
        color: "black",
        fontSize: "0.9rem",
        fontWeight: 800,
      }}
    >
      {factory_group_item.group_by_value}
    </span>
  );
};

export default FullWidthIndexColumn;
