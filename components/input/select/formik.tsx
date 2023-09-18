import { useField, useFormikContext } from "formik";
import Select, { SelectProps } from ".";

const FormikSelect = (props: SelectProps) => {
  //@ts-ignore
  const [field, meta, helpers] = useField(props);
  const { setFieldValue } = useFormikContext();

  return (
    <>
      <Select
        {...field}
        {...props}
        hint={meta.error}
        onChange={(e) => {
          props.onChange ? props.onChange(e) : null;
          setFieldValue(field.name, e);
        }}
      />
    </>
  );
};

export default FormikSelect;
