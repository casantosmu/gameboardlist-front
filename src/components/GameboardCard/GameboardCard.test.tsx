import { screen } from "@testing-library/react";
import renderWithProviders from "../../utils/test-utils";
import GameboardCard from "./GameboardCard";
import userEvent from "@testing-library/user-event";
import { Gameboard } from "../../types/gameboards";

const mockDeleteGameboards = jest.fn();
jest.mock("../../store/gameboards/useGameboards", () => () => ({
  getGameboards: jest.fn().mockResolvedValue(true),
  deleteGameboards: mockDeleteGameboards,
}));

describe("Given a GameboardCard", () => {
  describe("When it recive a 'Azul' as name and 2020 as year", () => {
    test("Then it should show a heading with 'Azul (2020)'", () => {
      const name = "Azul";
      const year = 2020;
      const expectedHeading = `${name} (${year})`;

      const gameboard: Gameboard = {
        id: "",
        image: "",
        imageBackup: "",
        name,
        year,
        players: {
          min: 0,
          max: 0,
        },
        time: {
          min: 0,
          max: 0,
        },
        weight: 0,
        rating: 0,
        authorship: "",
        category: "family",
        createdBy: "",
      };

      renderWithProviders(<GameboardCard {...gameboard} />);

      const heading = screen.getByRole("heading", {
        level: 2,
        name: expectedHeading,
      });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When it recive a 8 as rating", () => {
    test("Then it should show an 8 as rating", () => {
      const rating = 8;
      const label = "Rating";

      const gameboard: Gameboard = {
        id: "",
        image: "",
        imageBackup: "",
        name: "",
        year: 0,
        players: {
          min: 0,
          max: 0,
        },
        time: {
          min: 0,
          max: 0,
        },
        weight: 0,
        rating,
        authorship: "",
        category: "family",
        createdBy: "",
      };

      renderWithProviders(<GameboardCard {...gameboard} />);

      const ratingElement = screen.getByLabelText(label);

      expect(ratingElement.textContent).toBe(`${rating}`);
    });

    describe("When it recive 2 min players and 4 max players", () => {
      test("Then it should show '2-4' text", () => {
        const minPlayers = 2;
        const maxPlayers = 4;
        const expectedText = `${minPlayers}-${maxPlayers}`;

        const gameboard: Gameboard = {
          id: "",
          image: "",
          imageBackup: "",
          name: "",
          year: 0,
          players: {
            min: minPlayers,
            max: maxPlayers,
          },
          time: {
            min: 0,
            max: 0,
          },
          weight: 0,
          rating: 0,
          authorship: "",
          category: "family",
          createdBy: "",
        };

        renderWithProviders(<GameboardCard {...gameboard} />);

        const result = screen.getByText(expectedText);

        expect(result).toBeInTheDocument();
      });
    });
  });

  describe("When it recive 2 as weight", () => {
    test("Then it should show '2 / 5' as weight", () => {
      const weight = 2;
      const expectedText = `${weight} / 5`;

      const gameboard: Gameboard = {
        id: "",
        image: "",
        imageBackup: "",
        name: "",
        year: 0,
        players: {
          min: 0,
          max: 0,
        },
        time: {
          min: 0,
          max: 0,
        },
        weight,
        rating: 0,
        authorship: "",
        category: "family",
        createdBy: "",
      };

      renderWithProviders(<GameboardCard {...gameboard} />);

      const result = screen.getByText(expectedText);

      expect(result).toBeInTheDocument();
    });

    describe("When it recive an image and a backup image and there is an error with the image", () => {
      test("Then it should show the backup image", () => {
        const errorEvent = new ErrorEvent("error");
        const imageBackup = "backupimage";

        const gameboard: Gameboard = {
          id: "",
          image: "",
          imageBackup,
          name: "",
          year: 0,
          players: {
            min: 0,
            max: 0,
          },
          time: {
            min: 0,
            max: 0,
          },
          weight: 0,
          rating: 0,
          authorship: "",
          category: "family",
          createdBy: "",
        };

        renderWithProviders(<GameboardCard {...gameboard} />);

        const image = screen.getByRole("img");

        image.dispatchEvent(errorEvent);

        expect(image).toHaveAttribute("src", imageBackup);
      });
    });
  });

  describe("When its rendered, it recives an ID and users clicks on Delte button", () => {
    test("Then it should call the function deleteGameboard returned by useGameboard with the recived id", async () => {
      const user = userEvent.setup();

      const id = "id";
      const buttonText = "Delete";

      const gameboard: Gameboard = {
        id,
        image: "",
        imageBackup: "",
        name: "",
        year: 0,
        players: {
          min: 0,
          max: 0,
        },
        time: {
          min: 0,
          max: 0,
        },
        weight: 0,
        rating: 0,
        authorship: "",
        category: "family",
        createdBy: "",
      };

      renderWithProviders(<GameboardCard {...gameboard} />);

      const image = screen.getByRole("button", {
        name: buttonText,
      });

      await user.click(image);

      expect(mockDeleteGameboards).toHaveBeenCalledWith(id);
    });
  });
});
