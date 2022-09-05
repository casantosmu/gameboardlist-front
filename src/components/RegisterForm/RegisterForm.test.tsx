import { screen } from "@testing-library/react";
import renderWithProviders from "../../utils/test-utils";
import RegisterForm from "./RegisterForm";
import userEvent from "@testing-library/user-event";

describe("Given a registerForm", () => {
  describe("When its rendered and user writes Carlos on an input", () => {
    const user = userEvent.setup();
    const writtenText = "Carlos";

    test("Then it should display Carlos on the selected input", async () => {
      renderWithProviders(<RegisterForm />);

      const inputName = screen.getByLabelText<HTMLInputElement>(/Name/);
      const inputEmail = screen.getByLabelText<HTMLInputElement>(/Email/);
      const inputPassword = screen.getByLabelText<HTMLInputElement>(/Password/);
      const inputConfirmPassword =
        screen.getByLabelText<HTMLInputElement>(/Confirm password/);

      await user.click(inputName);
      await user.keyboard(writtenText);
      await user.click(inputEmail);
      await user.keyboard(writtenText);
      await user.click(inputPassword);
      await user.keyboard(writtenText);
      await user.click(inputConfirmPassword);
      await user.keyboard(writtenText);

      expect(inputName.value).toBe(writtenText);
      expect(inputEmail.value).toBe(writtenText);
      expect(inputPassword.value).toBe(writtenText);
      expect(inputConfirmPassword.value).toBe(writtenText);
    });
  });
});
