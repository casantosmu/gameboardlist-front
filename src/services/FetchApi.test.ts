import { UserLogin, UserRegister } from "../types/interfaces";
import { fakeGameboard1, fakeGameboards } from "../utils/mocks/fakeData";
import FetchApi from "./FetchApi";

describe("Given a FetchApi class", () => {
  const fetchApi = new FetchApi();

  describe("When instantated and invoked its method loginUser with a user", () => {
    describe("And the POST fetch to login endpoint, with a user, respone with a ok status", () => {
      test("Then it should resolve with the user token", async () => {
        const user: UserLogin = {
          email: "email",
          password: "password",
        };
        const expectedResponse = {
          user: {
            token: "token",
          },
        };

        let result: unknown;
        try {
          result = await fetchApi.loginUser(user);
        } catch {}

        expect(result).toStrictEqual(expectedResponse);
      });
    });

    describe("And the POST fetch to login endpoint, with a user, respone with 'Bad Request'", () => {
      test("Then it should reject with an error with 'Bad Request'", async () => {
        const user = {
          email: "exists",
          password: "password",
        };
        const expectedMessage = "Bad Request";

        let result: unknown;
        try {
          result = await fetchApi.loginUser(user);
        } catch (error) {
          result = error;
        }

        expect((result as Error).message).toBe(expectedMessage);
      });
    });
  });

  describe("When instantated and invoked its method registerUser with a user", () => {
    describe("And the POST fetch to register endpoint, with a user, respone with a ok status", () => {
      test("Then it should resolve parsing the body text as JSON", async () => {
        const user: UserRegister = {
          name: "name",
          email: "email",
          password: "password",
        };

        let result: unknown;
        try {
          result = await fetchApi.registerUser(user);
        } catch (error) {
          result = error;
        }

        expect(result).toBe(true);
      });
    });
  });

  describe("When instantated and invoked its method getGameboards with token 'valid'", () => {
    describe("And GET fetch to gameboards endpoint, with a valid authorization, respone with a ok status", () => {
      test("Then it should resolve with a list of gameboards", async () => {
        const token = "valid";
        const expectedGameboards = fakeGameboards;

        let result: unknown;
        try {
          result = await fetchApi.getGameboards(token);
        } catch (error) {
          result = error;
        }

        expect(result).toStrictEqual(expectedGameboards);
      });
    });

    describe("When instantated and invoked its method getGameboards with token 'asdfa'", () => {
      describe("And the GET fetch to gameboards endpoint, with a invalid authorization, respone with an unauthorized status", () => {
        test("Then it should reject with an error with 'Unauthorized", async () => {
          const token = "asdfa";
          const expectedMessage = "Unauthorized";

          let result: unknown;
          try {
            result = await fetchApi.getGameboards(token);
          } catch (error) {
            result = error;
          }

          expect((result as Error).message).toBe(expectedMessage);
        });
      });
    });
  });

  describe("When instantated and invoked its method postGameboard with a token and a FormData", () => {
    describe("And the POST fetch to gameboards endpoint, with token and FormData, respone with a ok status", () => {
      test("Then it should resolve parsing the body text as JSON", async () => {
        const data = new FormData();
        const token = "token";

        let result: unknown;
        try {
          result = await fetchApi.postGameboard(token, data);
        } catch (error) {
          result = error;
        }

        expect(result).toBe(true);
      });
    });
  });

  describe("When instantated and invoked its method deleteGameboard with a token and an id", () => {
    describe("And the DELETE fetch to gameboards endpoint with param as id, with authentication token, respone with a 204 status", () => {
      test("Then it should resolve as undefined", async () => {
        const id = "id1";
        const token = "token";
        const expectedResult = undefined;

        let result: unknown;
        try {
          result = await fetchApi.deleteGameboard(token, id);
        } catch (error) {
          result = error;
        }

        expect(result).toBe(expectedResult);
      });
    });

    describe("And the DELETE fetch to gameboards endpoint with param as id, with authentication token, respone with a 200 status", () => {
      test("Then it should resolve as undefined", async () => {
        const id = "id2";
        const token = "token";
        const expectedResult = undefined;

        let result: unknown;
        try {
          result = await fetchApi.deleteGameboard(token, id);
        } catch (error) {
          result = error;
        }

        expect(result).toBe(expectedResult);
      });
    });
  });

  describe("When instantated and invoked its method getGameboard with a token and an id", () => {
    describe("And the GET fetch to gameboards endpoint with an id, with an auth token, respone with a ok status", () => {
      test("Then it should resolve with gameboard data", async () => {
        const id = "id";
        const token = "token";

        let result: unknown;
        try {
          result = await fetchApi.getGameboard(token, id);
        } catch (error) {
          result = error;
        }

        expect(result).toStrictEqual(fakeGameboard1);
      });
    });
  });
});
