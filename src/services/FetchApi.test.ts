import FetchApi from "./FetchApi";

describe("Given a FetchApi class", () => {
  const fetchApi = new FetchApi();

  describe("When instantated and invoked its method loginUser with a user", () => {
    describe("And fetch to API login endpoint with method post and the user its ok", () => {
      test("Then it should resolve with the user token", async () => {
        const user = {
          email: "email",
          password: "password",
        };

        let result: any;
        try {
          result = await fetchApi.loginUser(user);
        } catch (error) {
          result = error;
        }

        const expectedResponse = {
          user: {
            token: "token",
          },
        };

        expect(result).toStrictEqual(expectedResponse);
      });
    });

    describe("And fetch to API login endpoint with method post and the user its Bad Request", () => {
      test("Then it should reject with an error with 'Bad request'", async () => {
        const user = {
          email: "exists",
          password: "password",
        };

        let result: any;
        try {
          result = await fetchApi.loginUser(user);
        } catch (error) {
          result = error;
        }

        expect(result.message).toBe("Bad Request");
      });
    });
  });
});
