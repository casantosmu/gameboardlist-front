import { screen } from "@testing-library/react";
import renderWithProviders from "../../utils/test-utils";
import HomePage from "./HomePage";
import userEvent from "@testing-library/user-event";

const mockedUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("Given a HomePage component", () => {
  describe("When its rendered", () => {
    test("Then it should render a heading with 'Your collection'", () => {
      const expectedHeadingText = "Your collection";

      renderWithProviders(<HomePage />);

      const heading = screen.getByRole("heading", {
        level: 1,
        name: expectedHeadingText,
      });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When its rendered and user clicks on 'Add New' button", () => {
    test("Then it should call the function returned by useNavigate with root path", async () => {
      const user = userEvent.setup();

      const createPath = "/gameboard/create";
      const buttonText = "Add New";

      renderWithProviders(<HomePage />);

      const button = screen.getByRole("button", {
        name: buttonText,
      });

      await user.click(button);

      expect(mockedUseNavigate).toHaveBeenCalledWith(createPath);
    });
  });
});
