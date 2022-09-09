import { MemoryRouter, Routes, Route } from "react-router-dom";
import { queryByText, render, screen } from "@testing-library/react";
import ProtectedLayout from "./ProtectedLayout";
import Home from "../../pages/Home/Home";
import Theme from "../../styles/Theme/Theme";
import { setupStore } from "../../store/store";
import { Provider } from "react-redux";

const store = setupStore();

describe("Given a ProtectedLayout component", () => {
  describe("When it recives a 'token' as token and a route with a heading with 'Home'", () => {
    test("Then it should render the heading", () => {
      const token = "token";
      const expectedHeadingText = "Home";

      render(
        <Provider store={store}>
          <Theme>
            <MemoryRouter initialEntries={["/"]}>
              <Routes>
                <Route element={<ProtectedLayout token={token} />}>
                  <Route path="/" element={<h1>{expectedHeadingText}</h1>} />
                </Route>
              </Routes>
            </MemoryRouter>
          </Theme>
        </Provider>
      );

      const heading = screen.getByRole("heading", {
        name: expectedHeadingText,
      });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When it recives an empty token and there is a route to /login with a heading with  'Login'", () => {
    test("Then it should render the heading with 'Login'", () => {
      const token = "";
      const expectedHeadingText = "Login";

      render(
        <Provider store={store}>
          <Theme>
            <MemoryRouter initialEntries={["/"]}>
              <Routes>
                <Route element={<ProtectedLayout token={token} />}>
                  <Route path="/" element={<h1>{expectedHeadingText}</h1>} />
                </Route>
                <Route path="/login" element={<h1>Login</h1>} />
              </Routes>
            </MemoryRouter>
          </Theme>
        </Provider>
      );

      const heading = screen.getByRole("heading", {
        name: expectedHeadingText,
      });

      expect(heading).toBeInTheDocument();
    });
  });
});
