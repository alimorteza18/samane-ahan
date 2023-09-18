import { FormGroup, Label, FormFeedback } from "reactstrap";
import CurrencyFormat from "react-currency-format";

const NumberField = (props: CurrencyFormat.Props) => {
  return (
    <FormGroup>
      {props.label ? (
        <Label>
          <>
            {props.label}{" "}
            {props.required ? <span className="required">*</span> : null}{" "}
          </>
        </Label>
      ) : null}
      <CurrencyFormat
        {...props}
        dir="ltr"
        className={"form-control" + " " + props.className ?? ""}
      />

      {props?.hint ? (
        <FormFeedback style={{ display: "block", color: "gray" }}>
          {/* @ts-ignore */}
          {props?.hint}
        </FormFeedback>
      ) : null}
    </FormGroup>
  );
};

export default NumberField;
