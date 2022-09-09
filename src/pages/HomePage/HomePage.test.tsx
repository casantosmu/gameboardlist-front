import { screen } from "@testing-library/react";
import renderWithProviders from "../../utils/test-utils";
import HomePage from "./HomePage";

describe("Given a HomePage component", () => {
  describe("When its rendered", () => {
    test("Then it should render a heading with 'Your collection'", () => {
      const expectedHeadingText = "Your collection";

      renderWithProviders(<HomePage />);

      const heading = screen.getByRole("heading", {
        level: 1,
        name: expectedHeadingText,
      });

      expect(heading).toBeInTheDocument();
    });

    test("Then it should render a 'Add New' button", () => {
      const expectedButtonText = "Add New";

      renderWithProviders(<HomePage />);

      const button = screen.getByRole("button", {
        name: expectedButtonText,
      });

      expect(button).toBeInTheDocument();
    });
  });
});
