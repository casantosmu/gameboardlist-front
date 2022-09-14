import { FormField as IFormField } from "../../types/interfaces";
import StyledFormField from "./StyledFormField";

const FormField = ({
  id,
  label,
  description,
  status,
  children,
}: IFormField): JSX.Element => (
  <StyledFormField>
    <label htmlFor={id} className="form-field__label">
      {status === "required" && (
        <span
          className="form-field__required"
          aria-hidden="true"
          data-testid="required-span"
        >
          *{" "}
        </span>
      )}
      {label}
      {status === "optional" && (
        <span className="form-field__optional" data-testid="optional-span">
          {" "}
          (optional)
        </span>
      )}
    </label>
    {description && (
      <span className="form-field__description">{description}</span>
    )}
    {children}
  </StyledFormField>
);

export default FormField;
