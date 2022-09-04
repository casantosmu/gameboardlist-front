import { screen } from "@testing-library/react";
import renderWithProviders from "../../utils/test-utils";
import userEvent from "@testing-library/user-event";
import LoginForm from "./LoginForm";

const mockLoginUser = jest.fn();

jest.mock("../../store/hooks/useUser", () => () => ({
  loginUser: mockLoginUser,
}));

describe("Given a loginForm", () => {
  const user = userEvent.setup();

  describe("When its rendered and user and the user clicks on remember me", () => {
    test("Then remember me it should go from unchecked to checked", async () => {
      renderWithProviders(<LoginForm />);

      const checkboxRemember =
        screen.getByLabelText<HTMLInputElement>(/Remember me/);

      expect(checkboxRemember.checked).toBe(false);

      await user.click(checkboxRemember);

      expect(checkboxRemember.checked).toBe(true);
    });
  });

  describe("When its rendered and user writes Carlos on inputs", () => {
    const writtenText = "Carlos";

    test("Then it should display Carlos on inputs", async () => {
      renderWithProviders(<LoginForm />);

      const inputEmail = screen.getByLabelText<HTMLInputElement>(/Email/);
      const inputPassword = screen.getByLabelText<HTMLInputElement>(/Password/);

      await user.click(inputEmail);
      await user.keyboard(writtenText);
      await user.click(inputPassword);
      await user.keyboard(writtenText);

      expect(inputEmail.value).toBe(writtenText);
      expect(inputPassword.value).toBe(writtenText);
    });
  });

  describe("When its render and user submits form", () => {
    test("Then it should call the function loginUser returned by useUser with the inputs values", async () => {
      renderWithProviders(<LoginForm />);

      const email = "email";
      const password = "password";

      const inputEmail = screen.getByLabelText<HTMLInputElement>(/Email/);
      const inputPassword = screen.getByLabelText<HTMLInputElement>(/Password/);
      const submitButton = screen.getByRole("button", {
        name: /Login/,
      });

      await user.click(inputEmail);
      await user.keyboard(email);
      await user.click(inputPassword);
      await user.keyboard(password);
      await user.click(submitButton);

      expect(mockLoginUser).toHaveBeenCalledWith({
        email,
        password,
      });
    });
  });
});
