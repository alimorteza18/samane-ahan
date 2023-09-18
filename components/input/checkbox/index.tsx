export interface CheckboxProps {
  label?: any;
  name?: string;
  value?: string;
  id?: string;
}

const Checkbox = (props: CheckboxProps) => {
  const { label, name, value, ...rest } = props;
  return (
    <div>
      <input
        style={{
          height: "18px",
          width: "20px",
          marginLeft: "8px",
        }}
        type="checkbox"
        name={name}
        value={value}
        {...rest}
      />
      <label className="form-check-label label_info">{label}</label>
    </div>
  );
};

export default Checkbox;
