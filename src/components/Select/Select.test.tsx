import { screen } from "@testing-library/react";
import renderWithProviders from "../../utils/test-utils";
import Select from "./Select";
import userEvent from "@testing-library/user-event";

describe("Given a Select component", () => {
  describe("When its rendered with option 1 and option 2 and user clicks on option 2", () => {
    test("Then it should have option 2 as value", async () => {
      const user = userEvent.setup();

      const selectOptions = ["option 1", "option 2"];

      renderWithProviders(
        <Select id="category" items={selectOptions} value="efwe" />
      );

      const select = screen.getByRole("combobox");

      await user.selectOptions(select, "option 2");

      expect(select).toHaveDisplayValue("option 2");
    });
  });
});
