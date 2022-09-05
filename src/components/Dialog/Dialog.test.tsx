import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithProviders from "../../utils/test-utils";
import Dialog from "./Dialog";

const keyCodes: { [key: string]: number } = {
  Escape: 27,
};

function patchKeyEvent(e: KeyboardEvent) {
  Object.defineProperty(e, "keyCode", {
    get: () => keyCodes[e.code] ?? 0,
  });
}

beforeAll(() => {
  document.addEventListener("keydown", patchKeyEvent, { capture: true });
});

describe("Given a Dialog component", () => {
  describe("When dialog state isOpen with a 'Hola' text", () => {
    test("Then it should render a modal with text 'Hola' inside", () => {
      const text = "Hola";

      const initialUi = {
        dialog: {
          isOpen: true,
          type: "error",
          text,
        },
        isLoading: false,
      };

      renderWithProviders(<Dialog />, {
        preloadedState: { ui: initialUi },
      });

      const modal = screen.getByLabelText(text);
      const span = within(modal).getByText(text);

      expect(span).toBeInTheDocument();
    });

    test("Then it should render a button that closes the modal", async () => {
      const user = userEvent.setup();

      const label = "label";
      const initialUi = {
        dialog: {
          isOpen: true,
          type: "error",
          text: label,
        },
        isLoading: false,
      };

      renderWithProviders(<Dialog />, {
        preloadedState: { ui: initialUi },
      });

      const modal = screen.getByLabelText(label);
      const button = within(modal).getByRole("button");

      expect(modal).toBeInTheDocument();

      await user.click(button);

      expect(modal).not.toBeInTheDocument();
    });

    test("Then it should close when the user presses ESC key", async () => {
      const user = userEvent.setup();

      const label = "label";
      const initialUi = {
        dialog: {
          isOpen: true,
          type: "error",
          text: label,
        },
        isLoading: false,
      };

      renderWithProviders(<Dialog />, {
        preloadedState: { ui: initialUi },
      });

      const modal = screen.getByLabelText(label);

      expect(modal).toBeInTheDocument();

      await user.keyboard("{Escape}");

      await expect(modal).not.toBeInTheDocument();
    });
  });
});
