import { screen } from "@testing-library/react";
import renderWithProviders from "../../utils/test-utils";
import Error from "./Error";

describe("Given a Error component", () => {
  describe("When its rendered", () => {
    test("Then it should display a heading with 'Error'", () => {
      const expectedHeading = "Error";
      const expectedHeadingLevel = 1;

      renderWithProviders(<Error />);

      const heading = screen.getByRole("heading", {
        name: expectedHeading,
        level: expectedHeadingLevel,
      });

      expect(heading).toBeInTheDocument();
    });

    test("Then it should display a link with 'Home'", () => {
      const expectedLink = "Home";

      renderWithProviders(<Error />);

      const link = screen.getByRole("link", {
        name: expectedLink,
      });

      expect(link).toBeInTheDocument();
    });
  });
});
