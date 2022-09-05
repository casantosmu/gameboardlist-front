import { screen } from "@testing-library/react";
import renderWithProviders from "../../utils/test-utils";
import RegisterForm from "./RegisterForm";
import userEvent from "@testing-library/user-event";

const mockRegisterUser = jest.fn();

jest.mock("../../store/hooks/useUser", () => () => ({
  registerUser: mockRegisterUser,
}));

describe("Given a registerForm", () => {
  const user = userEvent.setup();

  describe("When its rendered and user writes Carlos on an input", () => {
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

  describe("When its render and user submits form", () => {
    test("Then it should call the function loginUser returned by useUser with the inputs values", async () => {
      renderWithProviders(<RegisterForm />);

      const name = "name";
      const email = "email";
      const password = "password";

      const inputName = screen.getByLabelText<HTMLInputElement>(/Name/);
      const inputEmail = screen.getByLabelText<HTMLInputElement>(/Email/);
      const inputPassword = screen.getByLabelText<HTMLInputElement>(/Password/);
      const submitButton = screen.getByRole("button", {
        name: /Register/,
      });

      await user.click(inputName);
      await user.keyboard(name);
      await user.click(inputEmail);
      await user.keyboard(email);
      await user.click(inputPassword);
      await user.keyboard(password);
      await user.click(submitButton);

      expect(mockRegisterUser).toHaveBeenCalledWith({
        name,
        email,
        password,
      });
    });
  });
});
