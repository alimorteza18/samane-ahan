const SelectSecond = (props: FilterDropdownProps) => {
  return (
    <div className="custom_select">
      <select
        className="mb-3 form-select"
        placeholder={props.placeholder}
        value={props.value ?? null}
        onChange={(e) => {
          props.onChange && props.onChange(e.target.value);
        }}
      >
        <option>{props.placeholder}</option>
        {props.options.length
          ? props.options.map((option, index) => (
              <option key={index} value={option?.value ?? option}>
                {option?.label ?? option?.value ?? option}
              </option>
            ))
          : null}
      </select>
    </div>
  );
};

interface FilterDropdownProps {
  onChange: (value: any) => void;
  options: { value: any; label?: any }[] | any[];
  label?: string;
  icon?: JSX.Element;
  value?: any;
  placeholder?: any;
}

export default SelectSecond;
