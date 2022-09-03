import { HTMLInputTypeAttribute } from "react";

export interface UserRegister {
  name: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

export interface FormField {
  id: string;
  label: string;
  value: string;
  type: HTMLInputTypeAttribute;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  isRequired?: boolean;
}
