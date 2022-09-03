import { HTMLInputTypeAttribute } from "react";

export interface AuthUser {
  name?: string;
  email: string;
  password: string;
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
