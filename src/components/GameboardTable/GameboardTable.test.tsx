import { screen } from "@testing-library/react";
import { fakeGameboard1 } from "../../utils/mocks/fakeData";
import renderWithProviders from "../../utils/test-utils";
import GameboardTable from "./GameboardTable";

describe("Given a GamboardTable component", () => {
  describe("When its rendered", () => {
    test("Then it should render a heading for authorship, category, players, rating, time, weight and year", () => {
      const { authorship, category, players, rating, time, weight, year } =
        fakeGameboard1;

      const expectedAuthorshipHeading = "Author/s";
      const expectedCategoryHeading = "Category";
      const expectedRatingHeading = "Rating";
      const expectedPayersHeading = "Players";
      const expectedTimeHeading = "Time";
      const expectedWeightHeading = "Weight";
      const expectedYearHeading = "Year";

      renderWithProviders(
        <GameboardTable
          category={category}
          players={players}
          rating={rating}
          time={time}
          weight={weight}
          year={year}
          authorship={authorship}
        />
      );

      const authorshipResult = screen.getByRole("heading", {
        level: 3,
        name: expectedAuthorshipHeading,
      });
      const categoryResult = screen.getByRole("heading", {
        level: 3,
        name: expectedCategoryHeading,
      });
      const playersResult = screen.getByRole("heading", {
        level: 3,
        name: expectedPayersHeading,
      });
      const ratingResult = screen.getByRole("heading", {
        level: 3,
        name: expectedRatingHeading,
      });
      const timeResult = screen.getByRole("heading", {
        level: 3,
        name: expectedTimeHeading,
      });
      const weightResult = screen.getByRole("heading", {
        level: 3,
        name: expectedWeightHeading,
      });
      const yearResult = screen.getByRole("heading", {
        level: 3,
        name: expectedYearHeading,
      });

      expect(authorshipResult).toBeInTheDocument();
      expect(categoryResult).toBeInTheDocument();
      expect(playersResult).toBeInTheDocument();
      expect(ratingResult).toBeInTheDocument();
      expect(timeResult).toBeInTheDocument();
      expect(weightResult).toBeInTheDocument();
      expect(yearResult).toBeInTheDocument();
    });
  });

  describe("When its rendered with a gameboard data", () => {
    test("Then it should render then it should render all the received data", () => {
      const { authorship, category, players, rating, time, weight, year } =
        fakeGameboard1;
      const expectedPayers = `${players.min}/${players.max}`;
      const expectedTime = `${time.min}/${time.min} Min`;
      const expectedWeight = `${weight}/5`;
      const expectedCategory = "Party";

      renderWithProviders(
        <GameboardTable
          category={category}
          players={players}
          rating={rating}
          time={time}
          weight={weight}
          year={year}
          authorship={authorship}
        />
      );

      const authorshipResult = screen.getByText(authorship);
      const categoryResult = screen.getByText(expectedCategory);
      const playersResult = screen.getByText(expectedPayers);
      const ratingResult = screen.getByText(rating);
      const timeResult = screen.getByText(expectedTime);
      const weightResult = screen.getByText(expectedWeight);
      const yearResult = screen.getByText(year);

      expect(authorshipResult).toBeInTheDocument();
      expect(categoryResult).toBeInTheDocument();
      expect(playersResult).toBeInTheDocument();
      expect(ratingResult).toBeInTheDocument();
      expect(timeResult).toBeInTheDocument();
      expect(weightResult).toBeInTheDocument();
      expect(yearResult).toBeInTheDocument();
    });
  });

  describe("When its rendered without a authorship", () => {
    test("Then it should render '-'", () => {
      const { category, players, rating, time, weight, year } = fakeGameboard1;
      const expectedAuthorship = "-";

      renderWithProviders(
        <GameboardTable
          category={category}
          players={players}
          rating={rating}
          time={time}
          weight={weight}
          year={year}
        />
      );

      const authorshipResult = screen.getByText(expectedAuthorship);

      expect(authorshipResult).toBeInTheDocument();
    });
  });
});
