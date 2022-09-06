import { screen, within } from "@testing-library/react";
import renderWithProviders from "../../utils/test-utils";
import Loading from "./Loading";

describe("Given a Loading component", () => {
  describe("When isLoading state is true", () => {
    test("Then it should render a modal with text 'Loading' inside", () => {
      const expectedText = "Loading";

      renderWithProviders(<Loading />, {
        preloadedState: {
          ui: {
            dialog: {
              isOpen: false,
              type: "error",
              text: "",
            },
            isLoading: true,
          },
        },
      });

      const loadingModal = screen.getByLabelText(expectedText);
      const span = within(loadingModal).getByText(expectedText);

      expect(span).toBeInTheDocument();
    });
  });
});
