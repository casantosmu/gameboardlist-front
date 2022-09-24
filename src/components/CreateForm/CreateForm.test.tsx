import { screen } from "@testing-library/react";
import renderWithProviders from "../../utils/test-utils";
import userEvent from "@testing-library/user-event";
import CreateForm from "./CreateForm";

const mockPostGameboards = jest.fn();
jest.mock("../../store/gameboards/useGameboards", () => () => ({
  ...jest.requireActual("../../store/gameboards/useGameboards"),
  postGameboards: mockPostGameboards,
}));

const mockedUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("Given a loginForm", () => {
  const user = userEvent.setup();

  describe("When its rendered and user types on all form fields and user press submit button", () => {
    test("Then it should call the function postGameboards returned by useGameboards with a FormData", async () => {
      const expected = {
        image: new File(["hello"], "hello.png", { type: "image/png" }),
        rating: "8",
        name: "Car",
        year: "2020",
        category: "strategy",
        weight: "2",
        playersMin: "2",
        playersMax: "4",
        timeMin: "35",
        timeMax: "45",
        authorship: "Arthur",
      };

      const expectedFormData = new FormData();
      expectedFormData.append("image", expected.image);
      expectedFormData.append("rating", expected.rating);
      expectedFormData.append("name", expected.name);
      expectedFormData.append("year", expected.year);
      expectedFormData.append("category", expected.category);
      expectedFormData.append("weight", expected.weight);
      expectedFormData.append("players[min]", expected.playersMin);
      expectedFormData.append("players[max]", expected.playersMax);
      expectedFormData.append("time[min]", expected.timeMin);
      expectedFormData.append("time[max]", expected.timeMax);
      expectedFormData.append("authorship", expected.authorship || "-");

      renderWithProviders(<CreateForm />);

      const inputImage = screen.getByLabelText<HTMLInputElement>(/Image/);
      const inputReating = screen.getByLabelText<HTMLInputElement>(/Rating/);
      const inputName = screen.getByLabelText<HTMLInputElement>(/Name/);
      const inputYear = screen.getByLabelText<HTMLInputElement>(/Year/);
      const inputCategory =
        screen.getByLabelText<HTMLSelectElement>(/Category/);
      const inputWeight = screen.getByLabelText<HTMLInputElement>(/Weight/);
      const inputMinPlayers = screen.getByLabelText<HTMLInputElement>(
        /Minimum number of players/
      );
      const inputMaxPlayers = screen.getByLabelText<HTMLInputElement>(
        /Maximum number of players/
      );
      const inputMinTime = screen.getByLabelText<HTMLInputElement>(
        /Minimum game duration/
      );
      const inputMaxTime = screen.getByLabelText<HTMLInputElement>(
        /Maximum game duration/
      );
      const inputAuthorship =
        screen.getByLabelText<HTMLInputElement>(/^Author\/s/);
      const submitButton = screen.getByRole("button", {
        name: /Add new/,
      });

      await user.upload(inputImage, expected.image);
      await user.click(inputReating);
      await user.keyboard(expected.rating);
      await user.click(inputName);
      await user.keyboard(expected.name);
      await user.click(inputYear);
      await user.keyboard(expected.year);
      await user.selectOptions(inputCategory, expected.category);
      await user.click(inputWeight);
      await user.keyboard(expected.weight);
      await user.click(inputMinPlayers);
      await user.keyboard(expected.playersMin);
      await user.click(inputMaxPlayers);
      await user.keyboard(expected.playersMax);
      await user.click(inputMinTime);
      await user.keyboard(expected.timeMin);
      await user.click(inputMaxTime);
      await user.keyboard(expected.timeMax);
      await user.click(inputAuthorship);
      await user.keyboard(expected.authorship);

      await user.click(submitButton);

      expect(mockPostGameboards).toHaveBeenCalledWith(expectedFormData);
    });
  });

  describe("When its rendered and user clicks on Cancel button", () => {
    test("Then it should call the function returned by useNavigate with root path", async () => {
      const rootPath = "/";
      const buttonText = /Cancel/;

      renderWithProviders(<CreateForm />);

      const cancelButton = screen.getByRole("button", {
        name: buttonText,
      });

      await user.click(cancelButton);

      expect(mockedUseNavigate).toHaveBeenCalledWith(rootPath);
    });
  });
});
