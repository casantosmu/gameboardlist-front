import { screen } from "@testing-library/react";
import renderWithProviders from "../../utils/test-utils";
import LoginPage from "./LoginPage";

describe("Given a registerForm", () => {
  describe("When its rendered", () => {
    test("Then it should render a heading with 'Welcome back'", () => {
      const expectedText = "Welcome back";

      renderWithProviders(<LoginPage />);

      const heading = screen.getByRole("heading", {
        name: expectedText,
      });

      expect(heading).toBeInTheDocument();
    });

    test("Then it should render a login form", () => {
      const expectedFormName = "Login form";

      renderWithProviders(<LoginPage />);

      const form = screen.getByRole("form", { name: expectedFormName });

      expect(form).toBeInTheDocument();
    });

    test("Then it should render a link to register page with 'Sign up now!' text", () => {
      const expectedText = "Sign up now!";

      renderWithProviders(<LoginPage />);

      const link = screen.getByRole("link", {
        name: expectedText,
      });

      expect(link).toHaveAttribute("href", "/register");
    });
  });
});
