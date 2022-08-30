import { screen, within } from "@testing-library/react";
import renderWithProviders from "../../utils/test-utils";
import Container from "./Container";

describe("Given a Container component", () => {
  describe("When it recives an element", () => {
    test("Then it should render inside him the recived element", () => {
      const expectedInput = <button>""</button>;

      renderWithProviders(
        <Container breakpoint="medium">{expectedInput}</Container>
      );

      const container = screen.getByTestId("container");
      const chidlren = within(container).getByRole("button");

      expect(chidlren).toBeInTheDocument();
    });
  });
});
