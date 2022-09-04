import { screen } from "@testing-library/react";
import renderWithProviders from "../../utils/test-utils";
import NotFoundPage from "./NotFoundPage";

describe("Given a registerForm", () => {
  describe("When its rendered", () => {
    test("Then it should render a heading with '404: Oops!'", () => {
      const expectedText = "404: Oops!";

      renderWithProviders(<NotFoundPage />);

      const heading = screen.getByRole("heading", {
        name: expectedText,
      });

      expect(heading).toBeInTheDocument();
    });

    test("Then it should render 'The page you're looking for could not be found'", () => {
      const expectedText = "The page you're looking for could not be found";

      renderWithProviders(<NotFoundPage />);

      const result = screen.getByText(expectedText);

      expect(result).toBeInTheDocument();
    });

    test("Then it should render a link to Home page", () => {
      const expectedText = "Home";

      renderWithProviders(<NotFoundPage />);

      const link = screen.getByRole("link", {
        name: expectedText,
      });

      expect(link).toHaveAttribute("href", "/");
    });
  });
});
