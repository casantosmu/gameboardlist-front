import { screen } from "@testing-library/react";
import renderWithProviders from "../../utils/test-utils";
import RatingTile from "./RatingTile";

describe("Given a RatingTile component", () => {
  describe("When its rendered an it recives a 4", () => {
    test("Then it should render a 4 rating", () => {
      const rating = "4";
      const label = "Rating";
      renderWithProviders(<RatingTile rating={+rating} />);

      const result = screen.getByLabelText(label);

      expect(result.textContent).toBe(rating);
    });
  });
});
