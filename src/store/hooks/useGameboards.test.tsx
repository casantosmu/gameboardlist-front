import { renderHook } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { setupStore } from "../store";
import { Provider } from "react-redux";
import useGameboards from "./useGameboards";
import {
  openDialogAction,
  OpenDialogActionPayload,
  showLoadingAction,
} from "../slices/uiSlice/uiSlice";
import FetchApi from "../../services/FetchApi";
import { Gameboards } from "../../types/interfaces";
import { loadGameboardsAction } from "../slices/gameboardsSlice/gameboardsSlice";
import { fakeGameboards } from "../../utils/mocks/fakeData";

const preloadedState = {
  user: {
    id: "id",
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

const mockedUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
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
      const expectedResult = fakeGameboards.map(({ image, ...gameboard }) => ({
        ...gameboard,
        image: `${process.env.REACT_APP_API_URL}/${image}`,
      }));

      const fetchResponse = {
        gameboards: fakeGameboards,
      };

      jest
        .spyOn(FetchApi.prototype, "getGameboards")
        .mockResolvedValue(fetchResponse);
      mockLoadGameboardsAction = jest.fn();

      await result.current.getGameboards();

      expect(mockLoadGameboardsAction).toHaveBeenCalledWith(expectedResult);
    });

    test("Then it should call the function returned by useDispatch with the action returned by loadGameboardsAction", async () => {
      const fetchResponse = {
        gameboards: fakeGameboards,
      };
      const action = loadGameboardsAction(fakeGameboards);

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

  describe("When its invoked its postGameboard function", () => {
    const { result } = renderHook(useGameboards, { wrapper: Wrapper });

    const gameboard = {
      image: "",
      rating: "",
      name: "",
      year: "",
      category: "",
      weight: "",
      playersMin: "",
      playersMax: "",
      timeMin: "",
      timeMax: "",
      authorship: "",
    };

    test("Then it should call the function returned by useDispatch with showLoadingAction function", async () => {
      await result.current.postGameboard(gameboard);

      expect(mockUseDispatch).toHaveBeenCalledWith(showLoadingAction());
    });

    test("Then it should invoke FetchApi getGameboards method with the user token from store and data on FormData and with user id from store", async () => {
      const expectedData = new FormData();
      expectedData.append("image", gameboard.image);
      expectedData.append("rating", gameboard.rating);
      expectedData.append("name", gameboard.name);
      expectedData.append("year", gameboard.year);
      expectedData.append("category", gameboard.category);
      expectedData.append("weight", gameboard.weight);
      expectedData.append("players[min]", gameboard.playersMin);
      expectedData.append("players[max]", gameboard.playersMax);
      expectedData.append("time[min]", gameboard.timeMin);
      expectedData.append("time[max]", gameboard.timeMax);
      expectedData.append("authorship", gameboard.authorship || "-");

      const expectedToken = preloadedState.user.token;

      const getGameboardsMock = jest.spyOn(FetchApi.prototype, "postGameboard");

      await result.current.postGameboard(gameboard);

      expect(getGameboardsMock).toHaveBeenCalledWith(
        expectedToken,
        expectedData
      );
    });

    test("Then it should call openDialogAction with type success, 'Successfully added!' and the function returned by useNavigate with root path", async () => {
      jest.spyOn(FetchApi.prototype, "postGameboard").mockResolvedValue({});
      mockOpenDialogAction = jest.fn();

      const expectedOnClose = mockedUseNavigate("/");
      const expectedType = "success";
      const expectedText = "Successfully added!";

      await result.current.postGameboard(gameboard);

      const mockParameter = mockOpenDialogAction.mock.calls[0][0];

      expect(mockParameter.type).toBe(expectedType);
      expect(mockParameter.text).toBe(expectedText);
      expect(mockParameter.onClose()).toBe(expectedOnClose);
    });

    describe("When FetchApi postGameboards method rejects with an error", () => {
      test("Then it should call openDialogAction with type error and 'Ups! Shomething went wrong'", async () => {
        const error = new Error();

        jest
          .spyOn(FetchApi.prototype, "postGameboard")
          .mockRejectedValue(error);
        mockOpenDialogAction = jest.fn();

        const expectedPayload: OpenDialogActionPayload = {
          type: "error",
          text: "Ups! Shomething went wrong",
        };

        await result.current.postGameboard(gameboard);

        expect(mockOpenDialogAction).toHaveBeenCalledWith(expectedPayload);
      });

      test("Then it should call the function returned by useDispatch with the action returned by openDialogAction", async () => {
        const error = new Error();

        jest
          .spyOn(FetchApi.prototype, "postGameboard")
          .mockRejectedValue(error);
        mockOpenDialogAction = jest.fn();

        const actionPayload: OpenDialogActionPayload = {
          type: "error",
          text: "Ups! Shomething went wrong",
        };

        const action = openDialogAction(actionPayload);

        await result.current.postGameboard(gameboard);

        expect(mockUseDispatch).toHaveBeenCalledWith(action);
      });
    });
  });

  describe("When its invoked its deleteGameboard function with an id", () => {
    const { result } = renderHook(useGameboards, { wrapper: Wrapper });

    test("Then it should call the function returned by useDispatch with showLoadingAction function", async () => {
      await result.current.deleteGameboard("");

      expect(mockUseDispatch).toHaveBeenCalledWith(showLoadingAction());
    });

    test("Then it should invoke FetchApi deleteGameboards method with the user token from store and data on FormData and with user id from store", async () => {
      const expectedId = "id";
      const expectedToken = preloadedState.user.token;

      const deleteGameboardMock = jest.spyOn(
        FetchApi.prototype,
        "deleteGameboard"
      );

      await result.current.deleteGameboard(expectedId);

      expect(deleteGameboardMock).toHaveBeenCalledWith(
        expectedToken,
        expectedId
      );
    });

    test("Then it should invoke FetchApi getGameboards method by calling its getGameboard function", async () => {
      jest.spyOn(FetchApi.prototype, "deleteGameboard").mockResolvedValue({});
      const getGameboardsMock = jest.spyOn(FetchApi.prototype, "getGameboards");

      await result.current.deleteGameboard("id");

      expect(getGameboardsMock).toHaveBeenCalled();
    });

    describe("When FetchApi deleteGameboard method rejects with an error", () => {
      test("Then it should call openDialogAction with type error and 'Ups! Shomething went wrong'", async () => {
        const error = new Error();
        const expectedPayload: OpenDialogActionPayload = {
          type: "error",
          text: "Ups! Shomething went wrong",
        };

        jest
          .spyOn(FetchApi.prototype, "deleteGameboard")
          .mockRejectedValue(error);
        mockOpenDialogAction = jest.fn();

        await result.current.deleteGameboard("id");

        expect(mockOpenDialogAction).toHaveBeenCalledWith(expectedPayload);
      });

      test("Then it should call the function returned by useDispatch with the action returned by openDialogAction", async () => {
        const error = new Error();

        jest
          .spyOn(FetchApi.prototype, "deleteGameboard")
          .mockRejectedValue(error);
        mockOpenDialogAction = jest.fn();

        const actionPayload: OpenDialogActionPayload = {
          type: "error",
          text: "Ups! Shomething went wrong",
        };

        const action = openDialogAction(actionPayload);

        await result.current.deleteGameboard("id");

        expect(mockUseDispatch).toHaveBeenCalledWith(action);
      });
    });
  });
});
