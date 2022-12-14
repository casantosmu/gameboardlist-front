import { Gameboard, Gameboards } from "../../types/gameboards";

export const fakeGameboard1: Gameboard = {
  id: "1",
  image: "gerge",
  imageBackup: "fwefe",
  rating: 9,
  name: "Ark Nova",
  year: 2021,
  category: "party",
  authorship: "Mathias Wigge",
  createdBy: "234",
  players: {
    min: 1,
    max: 4,
  },
  time: {
    min: 90,
    max: 150,
  },
  weight: 4,
};

export const fakeGameboard2: Gameboard = {
  id: "2",
  image: "fewfw",
  imageBackup: "fwef",
  rating: 8,
  name: "The Castles of Burgundy",
  year: 2011,
  category: "strategy",
  authorship: "Stefan Feld",
  createdBy: "fwe",
  players: {
    min: 2,
    max: 4,
  },
  time: {
    min: 30,
    max: 90,
  },
  weight: 3,
};

export const fakeGameboard3: Gameboard = {
  id: "3",
  image: "hjds",
  imageBackup: "fw",
  rating: 8,
  name: "Aeon's End",
  year: 2016,
  category: "thematic",
  authorship: "Jenny Iglesias, Nick Little (I), Kevin Riley",
  createdBy: "fwewe",
  players: {
    min: 1,
    max: 4,
  },
  time: {
    min: 60,
    max: 60,
  },
  weight: 3,
};

export const fakeGameboard4: Gameboard = {
  id: "4",
  image: "hthtr",
  imageBackup: "fwfwwaf",
  rating: 7,
  name: "HeroQuest ",
  year: 1989,
  category: "thematic",
  authorship: "Stephen Baker",
  createdBy: "gre",
  players: {
    min: 2,
    max: 5,
  },
  time: {
    min: 90,
    max: 90,
  },
  weight: 2,
};

export const fakeGameboards: Gameboards = [
  { ...fakeGameboard1 },
  { ...fakeGameboard2 },
  { ...fakeGameboard3 },
  { ...fakeGameboard4 },
];

export const fakeGameboardFormData = new FormData();
fakeGameboardFormData.append("image", fakeGameboard1.image);
fakeGameboardFormData.append("rating", `${fakeGameboard1.rating}`);
fakeGameboardFormData.append("name", fakeGameboard1.name);
fakeGameboardFormData.append("year", `${fakeGameboard1.year}`);
fakeGameboardFormData.append("category", fakeGameboard1.category);
fakeGameboardFormData.append("weight", `${fakeGameboard1.weight}`);
fakeGameboardFormData.append("players[min]", `${fakeGameboard1.players.min}`);
fakeGameboardFormData.append("players[max]", `${fakeGameboard1.players.max}`);
fakeGameboardFormData.append("time[min]", `${fakeGameboard1.time.min}`);
fakeGameboardFormData.append("time[max]", `${fakeGameboard1.time.max}`);
fakeGameboardFormData.append("authorship", fakeGameboard1.authorship);
