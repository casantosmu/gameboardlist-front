import FetchApi from "./FetchApi";

describe("Given a FetchApi class", () => {
  const fetchApi = new FetchApi();

  describe("When instantated and invoked its method loginUser with a user", () => {
    describe("And the fetch to login endpoint with a POST method and a user respone with a ok status", () => {
      test("Then it should resolve with the user token", async () => {
        const user = {
          email: "email",
          password: "password",
        };
        const expectedResponse = {
          user: {
            token: "token",
          },
        };

        let result: any;
        try {
          result = await fetchApi.loginUser(user);
        } catch (error) {
          result = error;
        }

        expect(result).toStrictEqual(expectedResponse);
      });
    });

    describe("And the fetch to login endpoint with a POST method and a user respone with 'Bad Request'", () => {
      test("Then it should reject with an error with 'Bad Request'", async () => {
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
