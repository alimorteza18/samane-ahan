import { Field } from "formik";
import Checkbox, { CheckboxProps } from ".";

const FormikCheckbox = (props: CheckboxProps) => {
  const getId = () => {
    if (props?.id) return props?.id;
    else if (props?.name) return props?.name + Math.random().toString();
    else return Math.random().toString();
  };

  return (
    <Field
      type="checkbox"
      as={Checkbox}
      id={getId()}
      name={props.name}
      {...props}
    />
  );
};

export default FormikCheckbox;
