import { AuthUser } from "../types/interfaces";
import UserApi from "./UserApi";

afterEach(() => {
  jest.clearAllMocks();
});

const fetchMock = jest.fn();
global.fetch = fetchMock;

describe("Given a UserApi class", () => {
  const user: AuthUser = {
    email: "email",
    password: "password",
    name: "name",
  };

  describe("When its invoked its postUser function with a user", () => {
    describe("And fetch resolve with ok status and a success message", () => {
      test("Then it should resolve with the success message", async () => {
        const expectMessage = { sucess: "User has been registered" };

        const fetchResponse = {
          ok: true,
          json: jest.fn().mockResolvedValue(expectMessage),
        };

        fetchMock.mockResolvedValue(fetchResponse);

        const userApi = new UserApi();
        const result = await userApi.postUser(user, "/users/login");

        expect(result).toStrictEqual(expectMessage);
      });
    });

    describe("And fetch resolve with not ok status and an error message", () => {
      test("Then it should reject with an error with the responed message", async () => {
        const errorMessage = "Ups!";
        const errorStatus = 400;
        const expectedErrror = new Error(`${errorStatus}: ${errorMessage}`);

        const fetchResponse = {
          ok: false,
          status: errorStatus,
          json: jest.fn().mockResolvedValue({ error: errorMessage }),
        };

        fetchMock.mockResolvedValue(fetchResponse);

        const userApi = new UserApi();

        await expect(userApi.postUser(user, "/users/login")).rejects.toThrow(
          expectedErrror
        );
      });
    });

    describe("And fetch rejects with an error", () => {
      test("Then it should reject with an error", async () => {
        const errorMessage = "Error";
        const expectedErrror = new Error(errorMessage);

        fetchMock.mockRejectedValue(expectedErrror);

        const userApi = new UserApi();

        await expect(userApi.postUser(user, "/users/login")).rejects.toThrow(
          expectedErrror
        );
      });
    });
  });
});
