import { screen } from "@testing-library/react";
import renderWithProviders from "../../utils/test-utils";
import FormField from "./FormField";

describe("Given a FormField component", () => {
  describe("When it recives 'name' as id and 'Carlos' as label", () => {
    test("It should display an input labeled by 'Carlos'", () => {
      const id = "name";
      const label = "Carlos";

      const formProps = {
        id: id,
        label: label,
        type: "",
        value: "",
        onChange: () => {},
      };

      renderWithProviders(<FormField {...formProps} />);

      const input = screen.getByLabelText(label, { selector: "input" });

      expect(input).toBeInTheDocument();
    });
  });

  describe("When it recives isRequired", () => {
    test("Then it should show an asterisk to highlight that input is required", () => {
      const formProps = {
        id: "",
        label: "",
        type: "",
        value: "",
        onChange: () => {},
        isRequired: true,
      };

      renderWithProviders(<FormField {...formProps} />);

      const requiredSpan = screen.getByTestId("required-span");

      expect(requiredSpan).toBeInTheDocument();
    });
  });
});
