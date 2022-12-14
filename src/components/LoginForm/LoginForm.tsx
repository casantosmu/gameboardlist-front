import { useState } from "react";
import useUser from "../../store/user/useUser";
import Button from "../Button/Button";
import FormField, { IFormField } from "../FormField/FormField";
import Input from "../Input/Input";
import StyledLoginForm from "./StyledLoginForm";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

const LoginForm = (): JSX.Element => {
  const initialFormDataState = {
    email: "",
    password: "",
  };

  const { loginUser } = useUser();
  const [formData, setFormData] = useState(initialFormDataState);
  const { email, password } = formData;

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    loginUser({ email, password });
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  const formFields: Array<IFormField> = [
    {
      id: "email",
      label: "Email",
      status: "required",
      children: (
        <Input
          id="email"
          type="email"
          value={email}
          onChange={onChange}
          required={true}
          placeholder="email"
          fontAwesomeIcon={faUser}
        />
      ),
    },
    {
      id: "password",
      label: "Password",
      status: "required",
      children: (
        <Input
          id="password"
          type="password"
          value={password}
          onChange={onChange}
          required={true}
          placeholder="password"
          fontAwesomeIcon={faLock}
        />
      ),
    },
  ];

  return (
    <StyledLoginForm onSubmit={onSubmit} aria-label="Login form" noValidate>
      {formFields.map((formField) => (
        <FormField {...formField} key={formField.id} />
      ))}
      <div className="login-form__button-field">
        <Button type="submit">Login</Button>
      </div>
    </StyledLoginForm>
  );
};

export default LoginForm;
