import { User } from "../types/interfaces";
import getInitialUser from "./getInitialUser";

let mockJwtDecode: () => string;
jest.mock("jwt-decode", () => () => mockJwtDecode());

describe("Given a getInitialUser function", () => {
  describe("When getItem localStorage method returns 'token", () => {
    test("Then it should call jwtDecode with the token retured by getItem localStorage method", () => {
      const token = "token";

      Storage.prototype.getItem = jest.fn().mockReturnValue(token);
      mockJwtDecode = jest.fn();

      getInitialUser();

      expect(mockJwtDecode).toHaveBeenCalled();
    });

    test("Then it should return the decoded token and the token", () => {
      const token = "token";
      const payload = {
        id: "id",
        name: "name",
        email: "email",
      };
      const expectedResult: User = {
        id: "id",
        name: "name",
        email: "email",
        token,
      };

      Storage.prototype.getItem = jest.fn().mockReturnValue(token);
      mockJwtDecode = jest.fn().mockReturnValue(payload);

      const result = getInitialUser();

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe("When getItem localStorage method returns null", () => {
    test("Then it should return an empty user", () => {
      const expectedResult = {
        id: "",
        name: "",
        email: "",
        token: "",
      };

      Storage.prototype.getItem = jest.fn().mockReturnValue(null);

      getInitialUser();
      const result = getInitialUser();

      expect(result).toStrictEqual(expectedResult);
    });
  });
});
