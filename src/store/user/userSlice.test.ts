import { User } from "../../types/user";
import userSlice, { loginUserAction, logoutUserAction } from "./userSlice";

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
      const expectedAction = {
        type: expectedActionType,
        payload: user,
      };

      const result = loginUserAction(user);

      expect(result).toStrictEqual(expectedAction);
    });
  });
});

describe("Given a logoutUserAction function", () => {
  describe("When its invoked", () => {
    test("Then it should return an action type 'user/logoutUser'", () => {
      const expectedActionType = "user/logoutUser";
      const expectedAction = {
        type: expectedActionType,
        payload: undefined,
      };

      const result = logoutUserAction();

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
    test("Then it should return the initial state with the recived user", () => {
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

  describe("When it is called with action type logoutUser", () => {
    test("Then it should return an empty user", () => {
      const user: User = {
        id: "1234",
        email: "emal",
        name: "name",
        token: "1234",
      };
      const emptyUser: User = {
        email: "",
        id: "",
        name: "",
        token: "",
      };

      const action = logoutUserAction();
      const result = userSlice(user, action);

      expect(result).toStrictEqual(emptyUser);
    });
  });
});
