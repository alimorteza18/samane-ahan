import NumberField from ".";
import { useField, useFormikContext } from "formik";
import CurrencyFormat from "react-currency-format";

const FormikNumberField = (props: FormikNumberFieldProps) => {
  //@ts-ignore
  const [field] = useField(props);

  const { name, value } = field;
  const { onBlur, onChange, allowLeadingZero = false, ...rest } = props;
  const { setFieldValue } = useFormikContext();

  return (
    <>
      {/* @ts-ignore */}
      <NumberField
        {...props}
        {...rest}
        value={value}
        onValueChange={(val) => {
          if (allowLeadingZero) {
            setFieldValue(name, val?.value);
          } else {
            setFieldValue(name, val?.floatValue);
          }
        }}
      />
    </>
  );
};

type FormikNumberFieldProps = CurrencyFormat.Props & {
  allowLeadingZero?: boolean;
};

export default FormikNumberField;
