import { Field } from "formik";
import { FormLabel } from "react-bootstrap";

const CheckboxGroup = (props: any) => {
  const { label, name, options, ...rest } = props;
  return (
    <div>
      <label>{label}</label>
      <div>
        {options.map((option: any) => {
          return (
            <div
              key={option.value}
              style={{ float: "right", marginLeft: "25px" }}
            >
              <Field
                style={{
                  height: "18px",
                  width: "20px",
                  marginLeft: "8px",
                }}
                type="checkbox"
                name={name}
                value={option?.value}
                {...rest}
              />
              <FormLabel className="form-check-label label_info">
                {option.label}
              </FormLabel>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CheckboxGroup;
