import { FormField as IFormField } from "../../types/interfaces";
import Input from "../Input/Input";
import StyledFormField from "./StyledFormField";

const FormField = ({
  id,
  isRequired,
  onChange,
  type,
  value,
  label,
  placeholder,
}: IFormField): JSX.Element => (
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
