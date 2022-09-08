import { UserLogin, UserRegister } from "../types/interfaces";
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
        const expectedGameboards = ["game1", "game2"];

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
});
