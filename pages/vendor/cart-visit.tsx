import { useState } from "react";
import QRCode from "qrcode.react";
import styles from "./VisitCardDesktop.module.css";
import { Card, CardBody } from "reactstrap";
export default function VisitCard() {
  const [showModirName, setShowModirName] = useState(false);
  return (
    <Card
      className="vendor-stats"
      style={{
        // maxHeight: "50%",
        backgroundColor: "rgba(255,255,255,1)",
        padding: "0.75rem",
        paddingBottom: 0,
        width: "100%",
        borderRadius: "10px",
      }}
    >
      <CardBody>کارت ویزیت (در حال توسعه)</CardBody>
    </Card>
  );
}
