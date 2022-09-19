import { ReactNode } from "react";
import config from "../config";

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

export interface FormField {
  id?: string;
  label: string;
  description?: string;
  status?: "required" | "optional";
  children: ReactNode;
}

export type GameboardsCategories = typeof config.gameboards.categories[number];

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
  authorship: string;
  createdBy: string;
  players: MinMax;
  time: MinMax;
}

export type Gameboards = Array<Gameboard>;
