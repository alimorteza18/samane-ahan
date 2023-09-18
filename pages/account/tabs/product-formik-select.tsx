import { useField, useFormikContext } from "formik";
import Select, { SelectProps } from "@/components/input/select";

const ProductFormikSelect = (props: SelectProps) => {
  //@ts-ignore
  const [field, meta, helpers] = useField(props);
  const { setFieldValue } = useFormikContext();

  return (
    <Select
      {...field}
      {...props}
      onChange={(e) => {
        let foudedOption = props.options.find((op) => op.value == e);

        props.onChange
          ? props.onChange({
              id: foudedOption.value,
              value: foudedOption.label,
            })
          : null;

        setFieldValue(field.name, foudedOption.value);
        setFieldValue(field.name.replace(".id", ".value"), foudedOption.label);
      }}
    />
  );
};

export default ProductFormikSelect;
