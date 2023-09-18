const FilterDropdown = (props: FilterDropdownProps) => {
  return (
    <div className="sort-by-cover mr-10 mt-5">
      <div className="sort-by-product-wrap">
        <div className="sort-by">
          <span>
            {props.icon ?? <i className="fi-rs-apps" />}
            {props.label ?? "عنوان"}:
          </span>
        </div>
        <div className="sort-by-dropdown-wrap custom-select">
          <select
            value={props.value ?? null}
            onChange={(e) => {
              props.onChange && props.onChange(e.target.value);
            }}
          >
            {props.options.length
              ? props.options.map((option, index) => (
                  <option key={index} value={option?.value ?? option}>
                    {option?.label ?? option?.value ?? option}
                  </option>
                ))
              : null}
          </select>
        </div>
      </div>
    </div>
  );
};

interface FilterDropdownProps {
  onChange: (value: any) => void;
  options: { value: any; label?: any }[] | any[];
  label?: string;
  icon?: JSX.Element;
  value?: any;
}

export default FilterDropdown;
