import { InputFieldProps } from "@/types/input";
import { FormGroup, Label, Input } from "reactstrap";

const Switch = (props: InputFieldProps) => {
  return (
    <FormGroup switch {...props.containerProps}>
      <div>
        <div>
          <Input type="switch" {...props} />

          {props.label ? <Label>{props.label}</Label> : null}
        </div>
      </div>
    </FormGroup>
  );
};

export default Switch;
