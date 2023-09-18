import {
  FormGroup,
  FormLabel,
  FormSelect as RFormSelect,
  FormSelectProps,
} from "react-bootstrap";
import { FormFeedback } from "reactstrap";

const Select = (props: SelectProps) => {
  return (
    <FormGroup>
      {props.label ? (
        <FormLabel>
          {props.label}{" "}
          {props.required ? <span className="required">*</span> : null}{" "}
        </FormLabel>
      ) : null}
      <div className="custom_select">
        <RFormSelect
          {...props}
          className={props.className ?? "" + " mb-3"}
          // @ts-ignore
          value={props.value ?? null}
          onChange={(e) => {
            props.onChange && props.onChange(e.target.value);
          }}
        >
          {props.options && props.options.length
            ? props.options.map((option, index) => (
                <option key={index} value={option?.value ?? option}>
                  {option?.label ?? option?.value ?? option}
                </option>
              ))
            : null}
        </RFormSelect>
      </div>
      {props.hint ? <div style={{ color: "red" }}>{props.hint}</div> : null}
    </FormGroup>
  );
};

export interface SelectProps extends FormSelectProps {
  onChange?: (value: any) => void;
  options: { value: any; label?: any }[] | any[];
  label?: string;
  hint?: string;
}

export default Select;
