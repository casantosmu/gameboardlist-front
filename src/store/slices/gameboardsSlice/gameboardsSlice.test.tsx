import { fakeGameboards } from "../../../utils/mocks/fakeData";
import gameboardsSlice, { loadGameboardsAction } from "./gameboardsSlice";

describe("Given a loadGameboardsAction function", () => {
  describe("When its invoked with a list of gameboards", () => {
    test("Then it should return an action type 'gameboards/loadGameboards' with the recived list", () => {
      const expectedActionType = "gameboards/loadGameboards";
      const expectedAction = {
        type: expectedActionType,
        payload: fakeGameboards,
      };

      const result = loadGameboardsAction(fakeGameboards);

      expect(result).toStrictEqual(expectedAction);
    });
  });
});

describe("Given a gameboardsSlice function", () => {
  const initialState = {
    gameboards: fakeGameboards,
  };

  describe("When it is called with an unknow action", () => {
    test("Then it should return the initial state", () => {
      const unknownAction = { type: "unknown" };

      const result = gameboardsSlice(initialState, unknownAction);

      expect(result).toEqual(initialState);
    });
  });

  describe("When it is called with action type loadGameboards with a list of gameboards", () => {
    test("Then it should return the initial state with gameboards with the recived list", () => {
      const action = loadGameboardsAction(fakeGameboards);
      const result = gameboardsSlice(initialState, action);
      const expectedResult = {
        gameboards: fakeGameboards,
      };

      expect(result).toStrictEqual(expectedResult);
    });
  });
});
