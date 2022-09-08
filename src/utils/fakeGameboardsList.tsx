import { Gameboards } from "../types/interfaces";

const fakeGameboardsList: Gameboards = [
  {
    id: "1",
    image: "gerge",
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
  },
  {
    id: "2",
    image: "fewfw",
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
  },
  {
    id: "3",
    image: "hjds",
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
  },
  {
    id: "4",
    image: "hthtr",
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
  },
];

export default fakeGameboardsList;
