import { Progress } from "reactstrap";

const TableProgress = () => {
  return (
    <div style={{ width: "100%", height: "10px" }}>
      <Progress
        animated
        value={100}
        color="warning"
        style={{ borderRadius: 0 }}
      />
    </div>
  );
};

export default TableProgress;
