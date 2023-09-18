import { HTMLAttributes } from "react";
import type { InputProps, FormGroupProps } from "reactstrap";

interface InputFieldProps extends InputProps {
  label?: string;
  containerProps?: FormGroupProps;
}

interface TextFieldProps extends InputProps {
  label?: string;
}

interface RadioProps extends InputProps {
  label?: string | number;
  hint?: string | number | JSX.Element;
}

interface RadioGroupProps {
  name?: string;
  options: RadioProps[];
  containerProps?: HTMLAttributes<HTMLDivElement>;
}

type SingleDropdownItem = {
  label?: string | number;
  value: string | number;
};
