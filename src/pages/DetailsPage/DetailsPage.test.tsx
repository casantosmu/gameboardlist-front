import renderWithProviders from "../../utils/test-utils";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { fakeGameboard1 } from "../../utils/mocks/fakeData";
import DetailsPage from "./DetailsPage";

const mockGetGameboard = jest.fn();
jest.mock("../../store/gameboard/useGameboard", () => () => ({
  ...jest.requireActual("../../store/gameboard/useGameboard"),
  getGameboard: mockGetGameboard,
}));

describe("Given a GameboardDetailsPage component", () => {
  describe("When its rendered and status is not loading and error", () => {
    test("Then it should render a heading with gameboard name from store", () => {
      const expectedHeadingText = fakeGameboard1.name;

      renderWithProviders(<DetailsPage />, {
        preloadedState: {
          gameboard: {
            error: false,
            gameboard: fakeGameboard1,
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

  test("Then it should render a link 'Back to collection'", async () => {
    const user = userEvent.setup();

    const createPath = "/";
    const linkText = "Back to collection";

    renderWithProviders(<DetailsPage />, {
      preloadedState: {
        gameboard: {
          error: false,
          gameboard: fakeGameboard1,
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

  describe("When its rendered and there is an error on gameboard store", () => {
    test("Then it should render an error", () => {
      renderWithProviders(<DetailsPage />, {
        preloadedState: {
          gameboard: {
            error: "Bad",
            gameboard: null,
            status: "failed",
          },
        },
      });

      const element = screen.getByText(/Error/);

      expect(element).toBeInTheDocument();
    });
  });

  describe("When its rendered and there is a 'Bad request' error on gameboard stor", () => {
    test("Then it should render an error", () => {
      const errorMessage = "Bad Request";

      renderWithProviders(<DetailsPage />, {
        preloadedState: {
          gameboard: {
            error: errorMessage,
            gameboard: null,
            status: "failed",
          },
        },
      });

      const element = screen.getByText(/404/);

      expect(element).toBeInTheDocument();
    });
  });

  describe("When it recive an image and a backup image and there is an error with the image", () => {
    test("Then it should show the backup image", () => {
      const errorEvent = new ErrorEvent("error");
      const imageBackup = fakeGameboard1.imageBackup;

      renderWithProviders(<DetailsPage />, {
        preloadedState: {
          gameboard: {
            error: false,
            gameboard: fakeGameboard1,
            status: "succeeded",
          },
        },
      });

      const image = screen.getByRole("img");

      image.dispatchEvent(errorEvent);

      expect(image).toHaveAttribute("src", imageBackup);
    });
  });
});
