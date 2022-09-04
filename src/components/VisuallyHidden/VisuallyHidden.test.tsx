import { screen } from "@testing-library/react";
import renderWithProviders from "../../utils/test-utils";
import VisuallyHidden from "./VisuallyHidden";

describe("Given a Container component", () => {
  describe("When it recives an element", () => {
    test("Then it should render inside him the recived element", () => {
      const expectedText = "Hola";

      renderWithProviders(<VisuallyHidden>{expectedText}</VisuallyHidden>);

      const visuallyHidden = screen.getByText(expectedText);

      expect(visuallyHidden).toBeInTheDocument();
    });
  });
});
