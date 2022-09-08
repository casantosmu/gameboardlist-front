import { HTMLInputTypeAttribute } from "react";
import { IconName } from "@fortawesome/fontawesome-svg-core";

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
  fontAwesomeIcon?: ["fas", IconName];
}

export type GameboardsCategories =
  | "party"
  | "family"
  | "thematic"
  | "wargame"
  | "strategy";

export interface MinMax {
  min: number;
  max: number;
}

export interface Gameboard {
  id: string;
  image: string;
  rating: number;
  weight: number;
  name: string;
  year: number;
  category: GameboardsCategories;
  authorship?: string;
  createdBy: string;
  players: MinMax;
  time: MinMax;
}

export type Gameboards = Array<Gameboard>;
