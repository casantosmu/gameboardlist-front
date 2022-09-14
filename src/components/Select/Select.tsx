import StyledSelect from "./StyledSelect";

interface SelectProps extends React.ComponentPropsWithoutRef<"select"> {
  items: Array<string>;
  value: string;
}

const Select = ({ value, items, ...props }: SelectProps) => {
  const defaultSelectValue = items[0];

  return (
    <StyledSelect
      defaultValue={value}
      isDefault={value === defaultSelectValue}
      {...props}
    >
      {items.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </StyledSelect>
  );
};

export default Select;
