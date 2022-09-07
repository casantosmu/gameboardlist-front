import renderWithProviders from "../../utils/test-utils";
import ProtectedRoute from "./ProtectedRoute";
import { screen } from "@testing-library/react";

const mockSetUser = jest.fn();
jest.mock("../../store/hooks/useUser", () => () => ({
  setUser: mockSetUser,
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Navigate: () => mockNavigate,
}));

describe("Given a ProtectedRoute component", () => {
  describe("When it recives an element as a children", () => {
    describe("And user from store has no token", () => {
      test("Then you should call the setUser function returned by useUser", () => {
        renderWithProviders(
          <ProtectedRoute>
            <span></span>
          </ProtectedRoute>,
          {
            preloadedState: {
              user: {
                email: "",
                id: "",
                name: "",
                token: "",
              },
            },
          }
        );

        expect(mockSetUser).toHaveBeenCalled();
      });
    });

    describe("When it recives 'hi' as a children", () => {
      describe("And user from store has token", () => {
        test("Then it should render childrens", () => {
          const childrenText = "hi";

          renderWithProviders(
            <ProtectedRoute>
              <p>{childrenText}</p>
            </ProtectedRoute>,
            {
              preloadedState: {
                user: {
                  email: "",
                  id: "",
                  name: "",
                  token: "token",
                },
              },
            }
          );

          const children = screen.getByText(childrenText);

          expect(children).toBeInTheDocument();
        });
      });
    });
  });
});
