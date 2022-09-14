import { FormField as IFormField } from "../../types/interfaces";
import StyledFormField from "./StyledFormField";

const FormField = ({
  id,
  status,
  label,
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
    {children}
  </StyledFormField>
);

export default FormField;
