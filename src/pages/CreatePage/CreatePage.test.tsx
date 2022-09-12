import { screen } from "@testing-library/react";
import renderWithProviders from "../../utils/test-utils";
import CreatePage from "./CreatePage";

describe("Given a CreatePage component", () => {
  describe("When its render", () => {
    test("Then it should render a heading with 'Add new'", () => {
      const expectedHeading = "Add new";

      renderWithProviders(<CreatePage />);

      const heading = screen.getByRole("heading", {
        level: 1,
        name: expectedHeading,
      });

      expect(heading).toBeInTheDocument();
    });

    test("Then it should render a 'Add a boardgame' form", () => {
      const expectedForm = "Add a boardgame";

      renderWithProviders(<CreatePage />);

      const form = screen.getByRole("form", {
        name: expectedForm,
      });

      expect(form).toBeInTheDocument();
    });
  });
});
