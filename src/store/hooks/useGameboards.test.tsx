import { renderHook } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { RootState, setupStore } from "../store";
import { Provider } from "react-redux";
import useGameboards from "./useGameboards";
import {
  openDialogAction,
  OpenDialogActionPayload,
  showLoadingAction,
} from "../slices/uiSlice/uiSlice";
import FetchApi from "../../services/FetchApi";
import renderWithProviders from "../../utils/test-utils";
import fakeGameboardsList from "../../utils/fakeGameboardsList";
import { Gameboards } from "../../types/interfaces";
import { loadGameboardsAction } from "../slices/gameboardsSlice/gameboardsSlice";

const preloadedState = {
  user: {
    id: "",
    name: "",
    email: "",
    token: "token",
  },
};
const store = setupStore(preloadedState);

const Wrapper = ({ children }: PropsWithChildren): JSX.Element => (
  <Provider store={store}>{children}</Provider>
);

afterEach(() => {
  jest.clearAllMocks();
});

jest.mock("react-redux", () => ({
  useSelector: jest.fn((fn) => fn()),
}));

const mockUseDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockUseDispatch,
}));

let mockLoadGameboardsAction: (payload: Gameboards) => string;
jest.mock("../slices/gameboardsSlice/gameboardsSlice", () => ({
  ...jest.requireActual("../slices/gameboardsSlice/gameboardsSlice"),
  loadGameboardsAction: (payload: Gameboards) =>
    mockLoadGameboardsAction(payload),
}));

let mockOpenDialogAction = jest.fn();
jest.mock("../slices/uiSlice/uiSlice", () => ({
  ...jest.requireActual("../slices/uiSlice/uiSlice"),
  openDialogAction: (payload: OpenDialogActionPayload) =>
    mockOpenDialogAction(payload),
}));

describe("Given a useGameboards function", () => {
  describe("When its invoked its getGameboards function", () => {
    const { result } = renderHook(useGameboards, { wrapper: Wrapper });

    test("Then it should call the function returned by useDispatch with showLoadingAction function", async () => {
      await result.current.getGameboards();

      expect(mockUseDispatch).toHaveBeenCalledWith(showLoadingAction());
    });

    test("Then it should invoke FetchApi getGameboards method with the user token from state", async () => {
      const expectedToken = preloadedState.user.token;

      const getGameboardsMock = jest.spyOn(FetchApi.prototype, "getGameboards");

      await result.current.getGameboards();

      expect(getGameboardsMock).toHaveBeenCalledWith(expectedToken);
    });

    test("Then it should invoke loadGameboardsAction with the gameboards returned by FetchApi getGameboards method", async () => {
      const fetchResponse = {
        gameboards: fakeGameboardsList,
      };

      jest
        .spyOn(FetchApi.prototype, "getGameboards")
        .mockResolvedValue(fetchResponse);
      mockLoadGameboardsAction = jest.fn();

      await result.current.getGameboards();

      expect(mockLoadGameboardsAction).toHaveBeenCalledWith(fakeGameboardsList);
    });

    test("Then it should call the function returned by useDispatch with the action returned by loadGameboardsAction", async () => {
      const fetchResponse = {
        gameboards: fakeGameboardsList,
      };
      const action = loadGameboardsAction(fakeGameboardsList);

      jest
        .spyOn(FetchApi.prototype, "getGameboards")
        .mockResolvedValue(fetchResponse);

      await result.current.getGameboards();

      expect(mockUseDispatch).toHaveBeenCalledWith(action);
    });

    describe("When FetchApi getGameboards method rejects with an error", () => {
      test("Then it should call openDialogAction with type error and 'Ups! Shomething went wrong'", async () => {
        const error = new Error();

        jest
          .spyOn(FetchApi.prototype, "getGameboards")
          .mockRejectedValue(error);
        mockOpenDialogAction = jest.fn();

        const expectedPayload: OpenDialogActionPayload = {
          type: "error",
          text: "Ups! Shomething went wrong",
        };

        await result.current.getGameboards();

        expect(mockOpenDialogAction).toHaveBeenCalledWith(expectedPayload);
      });

      test("Then it should call the function returned by useDispatch with the action returned by openDialogAction", async () => {
        const error = new Error();

        jest
          .spyOn(FetchApi.prototype, "getGameboards")
          .mockRejectedValue(error);
        mockOpenDialogAction = jest.fn();

        const actionPayload: OpenDialogActionPayload = {
          type: "error",
          text: "Ups! Shomething went wrong",
        };

        const action = openDialogAction(actionPayload);

        await result.current.getGameboards();

        expect(mockUseDispatch).toHaveBeenCalledWith(action);
      });
    });
  });
});
