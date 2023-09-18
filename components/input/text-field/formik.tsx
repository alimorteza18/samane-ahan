import TextField from ".";
import { useField } from "formik";
import type { TextFieldProps } from "@/types/input";

const FormikTextField = (props: TextFieldProps) => {
  //@ts-ignore
  const [field, meta, helpers] = useField(props);

  return (
    <>
      <TextField {...field} {...props} />
      {meta.touched && meta.error ? (
        <div style={{color: 'red'}}>{meta.error}</div>
      ) : null}
    </>
  );
};

export default FormikTextField;
