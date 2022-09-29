import { Gameboard } from "../../types/gameboards";
import { fakeGameboard1 } from "../../utils/mocks/fakeData";
import gameboardSlice, {
  gameboardLoadAction,
  gameboardLoadFailureAction,
  gameboardLoadSuccessAction,
} from "./gameboardSlice";

interface InitialState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | false;
  gameboard: Gameboard;
}

describe("Given a gameboardsSlice function", () => {
  describe("When it is called with action type gameboardLoadSuccessAction with a gameboard", () => {
    test("Then it should return the initial state with recived gameboard and success status", () => {
      const initialState: InitialState = {
        gameboard: fakeGameboard1,
        status: "idle",
        error: false,
      };
      const expectedResult: InitialState = {
        gameboard: fakeGameboard1,
        error: false,
        status: "succeeded",
      };

      const action = gameboardLoadSuccessAction(fakeGameboard1);
      const result = gameboardSlice(initialState, action);

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe("When it is called with action type gameboardLoadAction with a gameboard", () => {
    test("Then it should return the initial state with status 'loading'", () => {
      const initialState: InitialState = {
        gameboard: fakeGameboard1,
        status: "idle",
        error: false,
      };
      const expectedResult: InitialState = {
        gameboard: fakeGameboard1,
        error: false,
        status: "loading",
      };

      const action = gameboardLoadAction();
      const result = gameboardSlice(initialState, action);

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe("When it is called with action type gameboardLoadFailure with a error message 'Bad'", () => {
    test("Then it should return empty gameboard, fail status and the recived error message", () => {
      const errorMessage = "Bad";
      const initialState: InitialState = {
        gameboard: fakeGameboard1,
        status: "idle",
        error: false,
      };
      const expectedResult = {
        gameboard: null,
        error: errorMessage,
        status: "failed",
      };

      const action = gameboardLoadFailureAction(errorMessage);
      const result = gameboardSlice(initialState, action);

      expect(result).toStrictEqual(expectedResult);
    });
  });
});
