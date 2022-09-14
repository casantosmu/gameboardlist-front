import { screen } from "@testing-library/react";
import App from "./App";
import renderWithProviders from "./utils/test-utils";

describe("Given a component App", () => {
  describe("When rendered without a logged user", () => {
    test("It should show the component Header with the link 'Login'", () => {
      renderWithProviders(<App />);

      const link = screen.getByRole("heading", { name: "Welcome back" });

      expect(link).toBeInTheDocument();
    });
  });
});
