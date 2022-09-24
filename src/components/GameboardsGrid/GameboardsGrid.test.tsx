import { screen, within } from "@testing-library/react";
import { fakeGameboards } from "../../utils/mocks/fakeData";
import renderWithProviders from "../../utils/test-utils";
import GameboardsGrid from "./GameboardsGrid";

describe("Given a GameboardsGrid component", () => {
  describe("When it recives 4 gameboards", () => {
    test("Then it should render a 'Your collection list' with 4 cards inside", () => {
      const expectedLenght = 4;

      renderWithProviders(<GameboardsGrid gameboards={fakeGameboards} />);

      const list = screen.getByLabelText("Your collection list");
      const cards = within(list).getAllByRole("article");

      expect(cards).toHaveLength(expectedLenght);
    });
  });
});
