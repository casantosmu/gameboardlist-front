import { useState } from "react";
import useUser from "../../store/hooks/useUser";
import { FormField as IFormField } from "../../types/interfaces";
import Button from "../Button/Button";
import FormField from "../FormField/FormField";
import StyledLoginForm from "./StyledLoginForm";

const LoginForm = (): JSX.Element => {
  const initialFormDataState = {
    email: "",
    password: "",
    remember: false,
  };

  const { loginUser } = useUser();
  const [formData, setFormData] = useState(initialFormDataState);
  const { email, password, remember } = formData;

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    loginUser({ email, password });
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.type === "checkbox"
      ? setFormData((prevState) => ({
          ...prevState,
          [event.target.id]: event.target.checked,
        }))
      : setFormData((prevState) => ({
          ...prevState,
          [event.target.id]: event.target.value,
        }));
  };

  const formFields: Array<IFormField> = [
    {
      id: "email",
      label: "Email",
      type: "email",
      value: email,
      onChange: onChange,
      isRequired: true,
      placeholder: "email",
      fontAwesomeIcon: ["fas", "user"],
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      value: password,
      onChange: onChange,
      isRequired: true,
      placeholder: "password",
      fontAwesomeIcon: ["fas", "lock"],
    },
  ];

  return (
    <StyledLoginForm onSubmit={onSubmit} aria-label="Login form" noValidate>
      {formFields.map((formField) => (
        <FormField {...formField} />
      ))}
      <div className="login-form__checkbox-field">
        <input
          type="checkbox"
          id="remember"
          checked={remember}
          onChange={onChange}
        />
        <label htmlFor="remember">Remember me</label>
      </div>
      <div className="login-form__button-field">
        <Button type="submit">Login</Button>
      </div>
    </StyledLoginForm>
  );
};

export default LoginForm;
