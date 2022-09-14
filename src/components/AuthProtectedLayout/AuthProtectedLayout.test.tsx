import { MemoryRouter, Routes, Route } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Theme from "../../styles/Theme/Theme";
import { setupStore } from "../../store/store";
import { Provider } from "react-redux";
import AuthProtectedLayout from "./AuthProtectedLayout";

const store = setupStore();

describe("Given a AuthProtectedLayout component", () => {
  describe("When it recives a nothing as token and a route with a button", () => {
    test("Then it should render a heading with GameBoardList and the button", () => {
      const token = "";
      const expectedHeadingText = "GameBoardList";

      render(
        <Provider store={store}>
          <Theme>
            <MemoryRouter initialEntries={["/login"]}>
              <Routes>
                <Route element={<AuthProtectedLayout token={token} />}>
                  <Route path="/login" element={<button>few</button>} />
                </Route>
                <Route path="/" element={<h1>"fwefweefwe</h1>} />
              </Routes>
            </MemoryRouter>
          </Theme>
        </Provider>
      );

      const heading = screen.getByRole("heading", {
        name: expectedHeadingText,
      });
      const button = screen.getByRole("button");

      expect(heading).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });
  });

  describe("When it recives a token and there is a route to /home with a heading with  'Home'", () => {
    test("Then it should render the heading with 'Home'", () => {
      const token = "token";
      const expectedHeadingText = "Home";

      render(
        <Provider store={store}>
          <Theme>
            <MemoryRouter initialEntries={["/login"]}>
              <Routes>
                <Route element={<AuthProtectedLayout token={token} />}>
                  <Route path="/login" element={<h1>"dsgdsgsdgds"</h1>} />
                </Route>
                <Route path="/" element={<h1>{expectedHeadingText}</h1>} />
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
