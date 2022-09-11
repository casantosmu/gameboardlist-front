import { useState } from "react";
import useUser from "../../store/hooks/useUser";
import { FormField as IFormField } from "../../types/interfaces";
import Button from "../Button/Button";
import FormField from "../FormField/FormField";
import Input from "../Input/Input";

const RegisterForm = (): JSX.Element => {
  const initialFormDataState = {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };

  const { registerUser } = useUser();
  const [formData, setFormData] = useState(initialFormDataState);
  const { name, email, password, passwordConfirm } = formData;

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    registerUser({ name, email, password });
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  const formFields: Array<IFormField> = [
    {
      id: "name",
      label: "Name",
      isRequired: true,
      children: (
        <Input
          id="name"
          type="text"
          value={name}
          onChange={onChange}
          required={true}
        />
      ),
    },
    {
      id: "email",
      label: "Email",
      isRequired: true,
      children: (
        <Input
          id="email"
          type="email"
          value={email}
          onChange={onChange}
          required={true}
        />
      ),
    },
    {
      id: "password",
      label: "Password",
      isRequired: true,
      children: (
        <Input
          id="password"
          type="password"
          value={password}
          onChange={onChange}
          required={true}
        />
      ),
    },
    {
      id: "passwordConfirm",
      label: "Confirm password",
      isRequired: true,
      children: (
        <Input
          id="passwordConfirm"
          type="password"
          value={passwordConfirm}
          onChange={onChange}
          required={true}
        />
      ),
    },
  ];

  return (
    <form onSubmit={onSubmit} aria-label="Register form" noValidate>
      {formFields.map((formField) => (
        <FormField {...formField} key={formField.id} />
      ))}
      <Button type="submit">Register</Button>
    </form>
  );
};

export default RegisterForm;
