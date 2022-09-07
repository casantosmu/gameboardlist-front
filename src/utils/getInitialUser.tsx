import jwtDecode from "jwt-decode";
import { User } from "../types/interfaces";

interface TokenPayload {
  id: string;
  name: string;
  email: string;
}

const getInitialUser = (): User => {
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

export default getInitialUser;
