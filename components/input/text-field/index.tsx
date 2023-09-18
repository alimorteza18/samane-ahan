import { FormGroup, Input, Label } from "reactstrap";
import type { TextFieldProps } from "@/types/input";

const TextField = (props: TextFieldProps) => {
  return (
    <FormGroup>
      {props.label ? (
        <Label>
          {props.label}{" "}
          {props.required ? <span className="required">*</span> : null}{" "}
        </Label>
      ) : null}
      <Input
        {...props}
        placeholder={
          props.placeholder
            ? props.required
              ? props.placeholder + " * "
              : props.placeholder
            : ""
        }
        style={{
          ...(props.style ?? {}),
          minHeight: props.type === "textarea" ? "180px" : "none",
        }}
      />
    </FormGroup>
  );
};

export default TextField;
