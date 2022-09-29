import { Gameboards } from "../../types/gameboards";
import {
  fakeGameboard1,
  fakeGameboard2,
  fakeGameboards,
} from "../../utils/mocks/fakeData";
import gameboardsSlice, {
  gameboardsAddAction,
  gameboardsDeleteAction,
  gameboardsLoadAction,
  gameboardsLoadFailureAction,
  gameboardsLoadSuccessAction,
} from "./gameboardsSlice";

interface InitialState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | false;
  gameboards: Gameboards;
}

describe("Given a gameboardsSlice function", () => {
  describe("When it is called with action type gameboardsLoadSuccessAction with a list of gameboards", () => {
    test("Then it should return the initial state with gameboards with the recived list and success status", () => {
      const initialState: InitialState = {
        gameboards: fakeGameboards,
        status: "idle",
        error: false,
      };
      const expectedResult: InitialState = {
        gameboards: fakeGameboards,
        error: false,
        status: "succeeded",
      };

      const action = gameboardsLoadSuccessAction(fakeGameboards);
      const result = gameboardsSlice(initialState, action);

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe("When it is called with action type gameboardsLoadAction with a list of gameboards", () => {
    test("Then it should return the initial state with status 'loading'", () => {
      const initialState: InitialState = {
        gameboards: fakeGameboards,
        status: "idle",
        error: false,
      };
      const expectedResult: InitialState = {
        gameboards: fakeGameboards,
        error: false,
        status: "loading",
      };

      const action = gameboardsLoadAction();
      const result = gameboardsSlice(initialState, action);

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe("When it is called with action type gameboardsLoadFailure with a error message 'Bad'", () => {
    test("Then it should return empty gameboards, fail status and the recived error message", () => {
      const initialState: InitialState = {
        gameboards: fakeGameboards,
        status: "idle",
        error: false,
      };
      const errorMessage = "Bad";
      const expectedResult: InitialState = {
        gameboards: [],
        error: errorMessage,
        status: "failed",
      };

      const action = gameboardsLoadFailureAction(errorMessage);
      const result = gameboardsSlice(initialState, action);

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe("When it is called with action type gameboardsDelete with id 1", () => {
    test("Then it should return the initial state and all gameboards without id 1", () => {
      const initialState: InitialState = {
        gameboards: [fakeGameboard1, fakeGameboard2],
        status: "idle",
        error: false,
      };
      const expectedResult: InitialState = {
        gameboards: [fakeGameboard2],
        status: "idle",
        error: false,
      };
      const id = fakeGameboard1.id;

      const action = gameboardsDeleteAction(id);
      const result = gameboardsSlice(initialState, action);

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe("When it is called with action type gameboardsAdd with a Gameboards", () => {
    test("Then it should return the initial state and all gameboards without the redived gameboards", () => {
      const initialState: InitialState = {
        gameboards: [fakeGameboard1],
        status: "idle",
        error: false,
      };
      const expectedResult: InitialState = {
        gameboards: [fakeGameboard1, fakeGameboard2],
        status: "idle",
        error: false,
      };

      const action = gameboardsAddAction(fakeGameboard2);
      const result = gameboardsSlice(initialState, action);

      expect(result).toStrictEqual(expectedResult);
    });
  });
});
