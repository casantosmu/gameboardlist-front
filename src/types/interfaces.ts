import { HTMLInputTypeAttribute, ReactNode } from "react";
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
  isRequired: boolean;
  label: string;
  children: ReactNode;
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
  imageBackup: string;
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
