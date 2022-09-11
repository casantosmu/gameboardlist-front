import { FormField as IFormField } from "../../types/interfaces";
import StyledFormField from "./StyledFormField";

const FormField = ({
  id,
  isRequired,
  label,
  children,
}: IFormField): JSX.Element => (
  <StyledFormField>
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
    {children}
  </StyledFormField>
);

export default FormField;
