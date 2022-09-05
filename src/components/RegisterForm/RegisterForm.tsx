import { useState } from "react";
import useUser from "../../store/hooks/useUser";
import { FormField as IFormField } from "../../types/interfaces";
import Button from "../Button/Button";
import FormField from "../FormField/FormField";

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
      type: "text",
      value: name,
      onChange: onChange,
      isRequired: true,
    },
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
    {
      id: "passwordConfirm",
      label: "Confirm password",
      type: "password",
      value: passwordConfirm,
      onChange: onChange,
      isRequired: true,
    },
  ];

  return (
    <form onSubmit={onSubmit} aria-label="Register form" noValidate>
      {formFields.map((formField) => (
        <FormField {...formField} />
      ))}
      <Button type="submit">Register</Button>
    </form>
  );
};

export default RegisterForm;
