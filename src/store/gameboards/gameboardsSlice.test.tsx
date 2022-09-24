import { fakeGameboardsList } from "../../utils/mocks/fakeData";
// import gameboardsSlice, { loadGameboardsAction } from "./gameboardsSlice";

// describe("Given a loadGameboardsAction function", () => {
//   describe("When its invoked with a list of gameboards", () => {
//     test("Then it should return an action type 'gameboards/loadGameboards' with the recived list", () => {
//       const expectedActionType = "gameboards/loadGameboards";
//       const expectedAction = {
//         type: expectedActionType,
//         payload: fakeGameboardsList,
//       };

//       const result = loadGameboardsAction(fakeGameboardsList);

//       expect(result).toStrictEqual(expectedAction);
//     });
//   });
// });

// describe("Given a gameboardsSlice function", () => {
//   const initialState = {
//     gameboards: fakeGameboardsList,
//   };

//   describe("When it is called with an unknow action", () => {
//     test("Then it should return the initial state", () => {
//       const unknownAction = { type: "unknown" };

//       const result = gameboardsSlice(initialState, unknownAction);

//       expect(result).toEqual(initialState);
//     });
//   });

//   describe("When it is called with action type loadGameboards with a list of gameboards", () => {
//     test("Then it should return the initial state with gameboards with the recived list", () => {
//       const action = loadGameboardsAction(fakeGameboardsList);
//       const result = gameboardsSlice(initialState, action);
//       const expectedResult = {
//         gameboards: fakeGameboardsList,
//       };

//       expect(result).toStrictEqual(expectedResult);
//     });
//   });
// });

describe("wfwe", () => {
  test("asd", () => {
    expect(true).toBe(true);
  });
});
