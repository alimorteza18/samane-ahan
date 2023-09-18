import Select, { components, Props, ValueContainerProps } from "react-select";

const MultiSelectFilter = (props: Props) => {
  const getValue = () => {
    let results = [];

    //@ts-ignore
    if (props.value) {
      //@ts-ignore
      results = props.value.map((item) => ({ label: item, value: item }));
    }

    return results;
  };

  return (
    <Select
      isRtl
      hideSelectedOptions={false}
      components={{
        IndicatorSeparator: () => null,
        ValueContainer: LimitedChipsContainer(props),
      }}
      isMulti
      styles={{
        control(base, props) {
          return {
            ...base,
            textAlign: "right",
            borderRadius: "5px",
            borderColor: "#ececec",
            height: "50px",
          };
        },
        valueContainer(base) {
          return {
            ...base,
            height: "50px",
          };
        },
        input(base) {
          return {
            ...base,
            height: "50px",
          };
        },
      }}
      {...props}
      value={getValue()}
    />
  );
};

const LimitedChipsContainer =
  (selectProps: Props) =>
  ({ children, hasValue, ...props }: ValueContainerProps) => {
    if (!hasValue) {
      return (
        // @ts-ignore
        <components.ValueContainer {...props}>
          {children}
        </components.ValueContainer>
      );
    }

    const CHIPS_LIMIT = 0;
    // @ts-ignore
    const [chips, otherChildren] = children;
    const overflowCounter = chips.slice(CHIPS_LIMIT).length;

    return (
      // @ts-ignore
      <components.ValueContainer {...props}>
        {selectProps.placeholder} : {overflowCounter} مورد
      </components.ValueContainer>
    );
  };

export default MultiSelectFilter;
