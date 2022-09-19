import jwtDecode from "jwt-decode";
import { TokenPayload, User } from "../types/interfaces";

export const getInitialUser = (): User => {
  const token = localStorage.getItem("token");

  if (!token) {
    return {
      id: "",
      name: "",
      email: "",
      token: "",
    };
  }

  const payload = jwtDecode<TokenPayload>(token);

  return {
    ...payload,
    token,
  };
};

export function capitalizeFirstLetter(letter: string) {
  return letter.charAt(0).toUpperCase() + letter.slice(1);
}
