import { screen } from "@testing-library/react";
import renderWithProviders from "../../utils/test-utils";
import RegisterPage from "./RegisterPage";

describe("Given a LoginPage component", () => {
  describe("When its rendered", () => {
    test("Then it should render a heading with 'Register'", () => {
      const expectedText = "Register";

      renderWithProviders(<RegisterPage />);

      const heading = screen.getByRole("heading", {
        name: expectedText,
      });

      expect(heading).toBeInTheDocument();
    });

    test("Then it should render a register form", () => {
      const expectedFormName = "Register form";

      renderWithProviders(<RegisterPage />);

      const form = screen.getByRole("form", { name: expectedFormName });

      expect(form).toBeInTheDocument();
    });

    test("Then it should render a 'Back to login' link to '/login'", () => {
      const expectedLinkText = "Back to login";
      const expectedLinkHref = "/login";

      renderWithProviders(<RegisterPage />);

      const link = screen.getByRole("link", { name: expectedLinkText });

      expect(link).toHaveAttribute("href", expectedLinkHref);
    });
  });
});
