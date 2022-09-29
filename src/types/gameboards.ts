import config from "../config";

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
