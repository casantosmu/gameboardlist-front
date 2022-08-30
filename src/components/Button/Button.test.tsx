import { screen, within } from "@testing-library/react";
import renderWithProviders from "../../utils/test-utils";
import Button from "./Button";

describe("Given a Button component", () => {
  describe("When it recives an element", () => {
    test("Then it should render inside him the recived element", () => {
      const expectedText = "Hi";

      renderWithProviders(<Button>{expectedText}</Button>);

      const button = screen.getByRole("button");
      const chidlren = within(button).getByText(expectedText);

      expect(chidlren).toBeInTheDocument();
    });
  });

  describe("When it receives render as anchor with a link", () => {
    test("Then it should render an anchor with the recived link", () => {
      const expectedLink = "www.some.com";

      renderWithProviders(
        <Button renderAs={"a"} href={expectedLink}>
          *
        </Button>
      );

      const link = screen.getByRole("link");

      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", expectedLink);
    });
  });
});
