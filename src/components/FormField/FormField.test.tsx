import { screen } from "@testing-library/react";
import { FormField as IFormField } from "../../types/interfaces";
import renderWithProviders from "../../utils/test-utils";
import Input from "../Input/Input";
import FormField from "./FormField";

describe("Given a FormField component", () => {
  describe("When it recives 'name' as id, 'Carlos' as label and an input as child", () => {
    test("It should display an input labeled by 'Carlos'", () => {
      const id = "name";
      const label = "Carlos";
      const input = <Input id={id} />;

      const formProps: IFormField = {
        id: id,
        label: label,
        isRequired: false,
        children: input,
      };

      renderWithProviders(<FormField {...formProps} />);

      const inputResult = screen.getByLabelText(label, { selector: "input" });

      expect(inputResult).toBeInTheDocument();
    });
  });

  describe("When it recives isRequired", () => {
    test("Then it should show an asterisk to highlight that input is required", () => {
      const formProps: IFormField = {
        id: "",
        label: "",
        isRequired: true,
        children: <span></span>,
      };

      renderWithProviders(<FormField {...formProps} />);

      const requiredSpan = screen.getByTestId("required-span");

      expect(requiredSpan).toBeInTheDocument();
    });
  });
});
