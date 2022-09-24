import { screen } from "@testing-library/react";
import renderWithProviders from "../../utils/test-utils";
import userEvent from "@testing-library/user-event";
import LoginForm from "./LoginForm";

const mockLoginUser = jest.fn();

jest.mock("../../store/user/useUser", () => () => ({
  loginUser: mockLoginUser,
}));

describe("Given a loginForm", () => {
  const user = userEvent.setup();
  const writtenText = "Carlos";

  describe("When its rendered and user writes Carlos on inputs", () => {
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
