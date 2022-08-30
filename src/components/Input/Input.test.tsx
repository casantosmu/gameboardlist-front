import { screen } from "@testing-library/react";
import renderWithProviders from "../../utils/test-utils";
import Input from "./Input";

describe("Given a Input component", () => {
  describe("When its rendered  with label as arial label", () => {
    test("Then it should render an input with the recived atributte", () => {
      renderWithProviders(<Input aria-label="label" />);

      const input = screen.getByLabelText("label");

      expect(input).toBeInTheDocument();
    });
  });
});
