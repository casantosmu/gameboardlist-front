import { HTMLInputTypeAttribute } from "react";
import Input from "../Input/Input";
import StyledFormField from "./StyledFormField";

interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  type: HTMLInputTypeAttribute;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  isRequired?: boolean;
}

const FormField = ({
  id,
  isRequired,
  onChange,
  type,
  value,
  label,
  placeholder,
}: FormFieldProps): JSX.Element => (
  <StyledFormField>
    <label htmlFor={id} className="form-field__label">
      {isRequired ? (
        <span className="form-field__required" data-testid="required-span">
          *
        </span>
      ) : null}
      {label}
    </label>
    <Input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={isRequired}
    />
  </StyledFormField>
);

export default FormField;
