import { useState } from "react";
import { FormField as IFormField } from "../../types/interfaces";
import Button from "../Button/Button";
import FormField from "../FormField/FormField";

const LoginForm = (): JSX.Element => {
  const initialFormDataState = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormDataState);
  const { email, password } = formData;

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
      type: "email",
      value: email,
      onChange: onChange,
      isRequired: true,
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      value: password,
      onChange: onChange,
      isRequired: true,
    },
  ];

  return (
    <form onSubmit={onSubmit} aria-label="Login form" noValidate>
      {formFields.map((formField) => (
        <FormField {...formField} />
      ))}
      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginForm;
