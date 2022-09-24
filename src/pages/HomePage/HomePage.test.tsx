import renderWithProviders from "../../utils/test-utils";
import HomePage from "./HomePage";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";

const mockGetGameboards = jest.fn();
jest.mock("../../store/gameboards/useGameboards", () => () => ({
  ...jest.requireActual("../../store/gameboards/useGameboards"),
  getGameboards: mockGetGameboards,
}));

describe("Given a HomePage component", () => {
  describe("When its rendered and status is not loading and error", () => {
    test("Then it should render a heading with 'Your collection'", () => {
      const expectedHeadingText = "Your collection";

      renderWithProviders(<HomePage />, {
        preloadedState: {
          gameboards: {
            error: false,
            gameboards: [],
            status: "succeeded",
          },
        },
      });

      const heading = screen.getByRole("heading", {
        level: 1,
        name: expectedHeadingText,
      });

      expect(heading).toBeInTheDocument();
    });
  });

  test("Then it should render a link to create path witg Add New", async () => {
    const user = userEvent.setup();

    const createPath = "/gameboard/create";
    const linkText = "Add New";

    renderWithProviders(<HomePage />, {
      preloadedState: {
        gameboards: {
          error: false,
          gameboards: [],
          status: "succeeded",
        },
      },
    });

    const link = screen.getByRole("link", {
      name: linkText,
    });

    await user.click(link);
    expect(link).toHaveAttribute("href", createPath);
  });

  describe("When its rendered and there is an error on gameboards store", () => {
    test("Then it should render an error", () => {
      renderWithProviders(<HomePage />, {
        preloadedState: {
          gameboards: {
            error: "Bad",
            gameboards: [],
            status: "failed",
          },
        },
      });

      const element = screen.getByText(/Error/);

      expect(element).toBeInTheDocument();
    });
  });
});
