// ** Hooks
import { useState } from "react";
// ** Components
import { Input, Label } from "reactstrap";
// ** Services
import { randomString } from "@/services/util-service";
import type { RadioGroupProps, RadioProps } from "@/types/input";

const Radio = (props: RadioProps) => {
  const [showHint, setShowHint] = useState(false);

  const id = randomString();

  return (
    <div className="custome-radio">
      <Input {...props} type="radio" id={id} />
      <Label className="form-check-label" htmlFor={id}>
        {props.label ?? ""}

        {props.hint ? (
          <i
            onClick={() => setShowHint(!showHint)}
            className="fi-rs-info mr-5"
          />
        ) : null}
      </Label>

      {props.hint ? (
        <div className={`form-group collapse ${showHint && "show"}`}>
          <p className="text-muted mt-5">{props.hint}</p>
        </div>
      ) : null}
    </div>
  );
};

const RadioGroup = (props: RadioGroupProps) => {
  let name = props.name ?? randomString();

  return (
    <div {...props.containerProps}>
      {props.options && props.options.length
        ? props.options.map((option: any, index: number) => (
            <Radio {...option} key={index} name={name} />
          ))
        : null}
    </div>
  );
};

export default RadioGroup;

export { Radio };
