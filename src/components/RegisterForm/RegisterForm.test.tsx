import { render, screen } from "@testing-library/react";
import React from "react";
import renderWithProviders from "../../utils/test-utils";
import RegisterForm from "./RegisterForm";
import { ThemeProvider } from "styled-components";
import styles from "../../styles/styles";
import userEvent from "@testing-library/user-event";

describe("Given a registerForm", () => {
  describe("When its rendered", () => {
    test("Then it should render name, email, password and password confirm", () => {
      renderWithProviders(<RegisterForm />);

      const inputName = screen.getByLabelText(/Name/);
      const inputEmail = screen.getByLabelText(/Email/);
      const inputPassword = screen.getByLabelText(/Password/);
      const inputConfirmPassword = screen.getByLabelText(/Confirm password/);

      expect(inputName).toBeInTheDocument();
      expect(inputEmail).toBeInTheDocument();
      expect(inputPassword).toBeInTheDocument();
      expect(inputConfirmPassword).toBeInTheDocument();
    });
  });

  describe("When its rendered and user writes Carlos on an input", () => {
    const user = userEvent.setup();
    const writtenText = "Carlos";

    test("Then it should display Carlos on the selected input", async () => {
      render(
        <ThemeProvider theme={styles}>
          <RegisterForm />
        </ThemeProvider>
      );

      const input = screen.getByLabelText<HTMLInputElement>(/Name/);

      await user.click(input);
      await user.keyboard(writtenText);

      expect(input.value).toBe(writtenText);
    });

    test("Then it should invoke the second item returned by useState", async () => {
      const formData = {};
      const setFormData = jest.fn();

      React.useState = jest.fn().mockReturnValue([formData, setFormData]);

      render(
        <ThemeProvider theme={styles}>
          <RegisterForm />
        </ThemeProvider>
      );

      const input = screen.getByLabelText(/Name/);

      await user.click(input);
      await user.keyboard(writtenText);

      expect(setFormData).toHaveBeenCalled();
    });
  });
});
