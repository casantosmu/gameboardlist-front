import { screen, within } from "@testing-library/react";
import renderWithProviders from "../../utils/test-utils";
import Loading from "./Loading";

describe("Given a Loading component", () => {
  describe("When isLoading state is true", () => {
    test("Then it should render a modal with text 'Loading' inside", () => {
      const expectedText = "Loading";

      const initialUi = {
        dialog: {
          isOpen: false,
          type: "",
          text: "",
        },
        isLoading: true,
      };

      renderWithProviders(<Loading />, {
        preloadedState: { ui: initialUi },
      });

      const loadingModal = screen.getByLabelText(expectedText);
      const span = within(loadingModal).getByText(expectedText);

      expect(span).toBeInTheDocument();
    });
  });
});
