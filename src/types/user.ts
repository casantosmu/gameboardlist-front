export interface UserRegister {
  name: string;
  email: string;
  password: string;
}

export interface TokenPayload {
  id: string;
  name: string;
  email: string;
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
