import { screen, within } from "@testing-library/react";
import { Gameboards } from "../../types/interfaces";
import renderWithProviders from "../../utils/test-utils";
import GameboardsGrid from "./GameboardsGrid";

describe("Given a GameboardsGrid component", () => {
  describe("When it recives 4 gameboards", () => {
    test("Then it should render a 'Your collection list' with 4 cards inside", () => {
      const gameboards: Gameboards = [
        {
          id: "",
          image: "",
          rating: 0,
          name: "",
          year: 0,
          category: "family",
          authorship: "",
          createdBy: "",
          players: {
            min: 0,
            max: 0,
          },
          time: {
            min: 0,
            max: 0,
          },
          weight: 0,
        },
        {
          id: "",
          image: "",
          rating: 0,
          name: "",
          year: 0,
          category: "family",
          authorship: "",
          createdBy: "",
          players: {
            min: 0,
            max: 0,
          },
          time: {
            min: 0,
            max: 0,
          },
          weight: 0,
        },
        {
          id: "",
          image: "",
          rating: 0,
          name: "",
          year: 0,
          category: "family",
          authorship: "",
          createdBy: "",
          players: {
            min: 0,
            max: 0,
          },
          time: {
            min: 0,
            max: 0,
          },
          weight: 0,
        },
        {
          id: "",
          image: "",
          rating: 0,
          name: "",
          year: 0,
          category: "family",
          authorship: "",
          createdBy: "",
          players: {
            min: 0,
            max: 0,
          },
          time: {
            min: 0,
            max: 0,
          },
          weight: 0,
        },
      ];
      const expectedLenght = 4;

      renderWithProviders(<GameboardsGrid gameboards={gameboards} />);

      const list = screen.getByLabelText("Your collection list");
      const cards = within(list).getAllByRole("listitem");

      expect(cards).toHaveLength(expectedLenght);
    });
  });
});
