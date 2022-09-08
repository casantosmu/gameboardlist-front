import { User } from "../../../types/interfaces";
import userSlice, { loginUserAction } from "./userSlice";

describe("Given a loginUserAction function", () => {
  describe("When its invoked with a user", () => {
    test("Then it should return an action type 'user/loginUser' with the recived user", () => {
      const user: User = {
        id: "",
        email: "",
        name: "",
        token: "",
      };
      const expectedActionType = "user/loginUser";
      const expectedUser = user;
      const expectedAction = {
        type: expectedActionType,
        payload: expectedUser,
      };

      const result = loginUserAction(user);

      expect(result).toStrictEqual(expectedAction);
    });
  });
});

describe("Given a userSlice function", () => {
  const initialState: User = {
    id: "",
    name: "",
    email: "",
    token: "",
  };

  describe("When it is called with an unknow action", () => {
    test("Then it should return the initial state", () => {
      const unknownAction = { type: "unknown" };

      const result = userSlice(initialState, unknownAction);

      expect(result).toEqual(initialState);
    });
  });

  describe("When it is called with action type loginUser with a user", () => {
    test("Then it should return the user", () => {
      const user: User = {
        id: "1234",
        email: "emal",
        name: "name",
        token: "1234",
      };

      const action = loginUserAction(user);
      const result = userSlice(initialState, action);

      expect(result).toStrictEqual(user);
    });
  });
});
