import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithProviders from "../../utils/test-utils";
import Navbar from "./Navbar";

const mockLogoutUser = jest.fn();
jest.mock("../../store/user/useUser", () => () => ({
  logoutUser: mockLogoutUser,
}));

describe("Given a Navbar component", () => {
  describe("When its rendered", () => {
    test("Then it should show the logo image with 'GameboardsList logo' as alt text", () => {
      const expectedAltText = "GameboardsList logo";

      renderWithProviders(<Navbar pages={[]} />);

      const image = screen.getByRole("img", {
        name: expectedAltText,
      });

      expect(image).toBeInTheDocument();
    });

    test("Then it should render a Logout button that invoke logoutUser when users clicks", async () => {
      const user = userEvent.setup();
      const expectedLabel = "Logout";

      renderWithProviders(<Navbar pages={[]} />);

      const button = screen.getByRole("button", {
        name: expectedLabel,
      });

      await user.click(button);

      expect(mockLogoutUser).toHaveBeenCalled();
    });
  });

  describe("When its rendered with Home and Profile", () => {
    test("Then it should show a nav list with home and profile links", () => {
      const expectedHomeText = "Home";
      const expectedProfileText = "Profile";

      const pages = [
        {
          label: expectedHomeText,
          path: "/home",
        },
        {
          label: expectedProfileText,
          path: "/profile",
        },
      ];

      renderWithProviders(<Navbar pages={pages} />);

      const homeLink = screen.getByRole("link", {
        name: expectedHomeText,
      });
      const profileLink = screen.getByRole("link", {
        name: expectedProfileText,
      });

      expect(homeLink).toBeInTheDocument();
      expect(profileLink).toBeInTheDocument();
    });
  });
});
