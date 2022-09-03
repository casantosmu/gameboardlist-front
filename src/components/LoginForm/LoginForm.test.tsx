import { render, screen } from "@testing-library/react";
import React from "react";
import renderWithProviders from "../../utils/test-utils";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "styled-components";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import styles from "../../styles/styles";
import LoginForm from "./LoginForm";

describe("Given a loginForm", () => {
  const user = userEvent.setup();

  describe("When its rendered and user and the user clicks on remember me", () => {
    test("Then remember me it should go from false to true", async () => {
      renderWithProviders(<LoginForm />);

      const checkboxRemember =
        screen.getByLabelText<HTMLInputElement>(/Remember me/);

      expect(checkboxRemember.checked).toBe(false);

      await user.click(checkboxRemember);

      expect(checkboxRemember.checked).toBe(true);
    });
  });

  describe("When its rendered and user writes Carlos on an input", () => {
    const writtenText = "Carlos";

    test("Then it should display Carlos on the selected input", async () => {
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

    test("Then it should invoke the second item returned by useState", async () => {
      const formData = {};
      const setFormData = jest.fn();

      React.useState = jest.fn().mockReturnValue([formData, setFormData]);

      const history = createMemoryHistory();

      render(
        <ThemeProvider theme={styles}>
          <Router location={history.location} navigator={history}>
            <LoginForm />
          </Router>
        </ThemeProvider>
      );

      const input = screen.getByLabelText<HTMLInputElement>(/Email/);

      await user.click(input);
      await user.keyboard(writtenText);

      expect(setFormData).toHaveBeenCalled();
    });
  });
});
