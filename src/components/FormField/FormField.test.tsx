import { screen } from "@testing-library/react";
import renderWithProviders from "../../utils/test-utils";
import Input from "../Input/Input";
import FormField, { IFormField } from "./FormField";

describe("Given a FormField component", () => {
  describe("When it recives 'name' as id, 'Carlos' as label and an input as child", () => {
    test("It should display an input labeled by 'Carlos'", () => {
      const id = "name";
      const label = "Carlos";
      const input = <Input id={id} />;

      const formProps: IFormField = {
        id: id,
        label: label,
        status: "required",
        children: input,
      };

      renderWithProviders(<FormField {...formProps} />);

      const inputResult = screen.getByLabelText(/Carlos/, {
        selector: "input",
      });

      expect(inputResult).toBeInTheDocument();
    });
  });

  describe("When it recives isRequired", () => {
    test("Then it should show an asterisk to highlight that input is required", () => {
      const formProps: IFormField = {
        id: "",
        label: "",
        status: "required",
        children: <span></span>,
      };

      renderWithProviders(<FormField {...formProps} />);

      const requiredSpan = screen.getByTestId("required-span");

      expect(requiredSpan).toBeInTheDocument();
    });
  });
});
