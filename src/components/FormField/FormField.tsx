import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  fontAwesomeIcon,
}: IFormField): JSX.Element => (
  <StyledFormField icon={!!fontAwesomeIcon}>
    <label htmlFor={id} className="form-field__label">
      {isRequired ? (
        <span
          className="form-field__required"
          aria-hidden="true"
          data-testid="required-span"
        >
          *
        </span>
      ) : null}
      {label}
    </label>
    <div className="form-field__input-wrapper">
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={isRequired}
      />
      {fontAwesomeIcon ? (
        <FontAwesomeIcon icon={fontAwesomeIcon} className="form-field__icon" />
      ) : null}
    </div>
  </StyledFormField>
);

export default FormField;
