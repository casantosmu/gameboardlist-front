import renderWithProviders from "../../utils/test-utils";
import FileUploader from "./FileUploader";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";

describe("Given a FielUploader component", () => {
  describe("When its rendered with a label and user clicks it and uploads a file", () => {
    test("Then it should save the file on FileUploader component", async () => {
      const onChange = jest.fn();

      const user = userEvent.setup();

      const file = new File(["hello"], "hello.png", { type: "image/png" });

      renderWithProviders(
        <>
          <label htmlFor="file">Upload</label>
          <FileUploader id="file" onChange={onChange} children={<p>**</p>} />
        </>
      );

      const button = screen.getByRole("button");
      const input = screen.getByLabelText<HTMLInputElement>("Upload");
      await user.click(button);
      await user.upload(input, file);

      expect(input.files![0]).toBe(file);
    });
  });
});
