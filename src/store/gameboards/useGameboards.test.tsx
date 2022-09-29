import { renderHook } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { setupStore } from "../store";
import { Provider } from "react-redux";
import useGameboards from "./useGameboards";
import FetchApi from "../../services/FetchApi";
import {
  openDialogAction,
  OpenDialogActionPayload,
  showLoadingAction,
} from "../ui/uiSlice";
import { fakeGameboard1, fakeGameboards } from "../../utils/mocks/fakeData";
import {
  gameboardsDeleteAction,
  gameboardsLoadSuccessAction,
} from "./gameboardsSlice";
import { Gameboards } from "../../types/gameboards";

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

beforeEach(() => {
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
jest.mock("./gameboardsSlice", () => ({
  ...jest.requireActual("./gameboardsSlice"),
  loadGameboardsAction: (payload: Gameboards) =>
    mockLoadGameboardsAction(payload),
}));

let mockOpenDialogAction = jest.fn();
jest.mock("../ui/uiSlice", () => ({
  ...jest.requireActual("../ui/uiSlice"),
  openDialogAction: (payload: OpenDialogActionPayload) =>
    mockOpenDialogAction(payload),
}));

const expectedData = new FormData();
expectedData.append("image", fakeGameboard1.image);
expectedData.append("rating", `${fakeGameboard1.rating}`);
expectedData.append("name", fakeGameboard1.name);
expectedData.append("year", `${fakeGameboard1.year}`);
expectedData.append("category", fakeGameboard1.category);
expectedData.append("weight", `${fakeGameboard1.weight}`);
expectedData.append("players[min]", `${fakeGameboard1.players.min}`);
expectedData.append("players[max]", `${fakeGameboard1.players.max}`);
expectedData.append("time[min]", `${fakeGameboard1.time.min}`);
expectedData.append("time[max]", `${fakeGameboard1.time.max}`);
expectedData.append("authorship", fakeGameboard1.authorship || "-");

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

    test("Then it should call the function returned by useDispatch with the action returned by gameboardsLoadSuccessAction", async () => {
      const fetchResponse = {
        gameboards: fakeGameboards,
      };
      const actionPayload = fakeGameboards.map(({ image, ...gameboard }) => ({
        ...gameboard,
        image: `${process.env.REACT_APP_API_URL}/${image}`,
      }));

      const action = gameboardsLoadSuccessAction(actionPayload);

      jest
        .spyOn(FetchApi.prototype, "getGameboards")
        .mockResolvedValue(fetchResponse);

      await result.current.getGameboards();

      expect(mockUseDispatch).toHaveBeenCalledWith(action);
    });
  });

  describe("When its invoked its postGameboard function", () => {
    const { result } = renderHook(useGameboards, { wrapper: Wrapper });

    test("Then it should invoke FetchApi getGameboards method with the user token from store and data on FormData and with user id from store", async () => {
      const expectedToken = preloadedState.user.token;

      const postGameboardsMock = jest.spyOn(
        FetchApi.prototype,
        "postGameboard"
      );

      await result.current.postGameboards(expectedData);

      expect(postGameboardsMock).toHaveBeenCalledWith(
        expectedToken,
        expectedData
      );
    });

    test("Then it should call openDialogAction with type success, 'Successfully added!' and the function returned by useNavigate with root path", async () => {
      jest
        .spyOn(FetchApi.prototype, "postGameboard")
        .mockResolvedValue({} as unknown as void);
      mockOpenDialogAction = jest.fn();

      const expectedOnClose = mockedUseNavigate("/");
      const expectedType = "success";
      const expectedText = "Successfully added!";

      await result.current.postGameboards(expectedData);

      const mockParameter = mockOpenDialogAction.mock.calls[0][0];

      expect(mockParameter.type).toBe(expectedType);
      expect(mockParameter.text).toBe(expectedText);
      expect(mockParameter.onClose()).toBe(expectedOnClose);
    });

    test("Then it should call the function returned by useDispatch with the action returned by gameboardsDeleteAction with id", async () => {
      const id = "id";
      const fetchResponse = {
        gameboards: fakeGameboards,
      };
      const action = gameboardsDeleteAction(id);

      jest
        .spyOn(FetchApi.prototype, "deleteGameboard")
        .mockResolvedValue(fetchResponse);

      await result.current.deleteGameboards(id);

      expect(mockUseDispatch).toHaveBeenCalledWith(action);
    });

    describe("When FetchApi postGameboards method rejects with an error", () => {
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

        await result.current.postGameboards(expectedData);

        expect(mockUseDispatch).toHaveBeenCalledWith(action);
      });
    });
  });

  describe("When its invoked its deleteGameboard function with an id", () => {
    const { result } = renderHook(useGameboards, { wrapper: Wrapper });

    test("Then it should call the function returned by useDispatch with showLoadingAction function", async () => {
      await result.current.deleteGameboards("id");

      expect(mockUseDispatch).toHaveBeenCalledWith(showLoadingAction());
    });

    test("Then it should invoke FetchApi deleteGameboards method with the user token from store and with the recived id", async () => {
      const expectedId = "id";
      const expectedToken = preloadedState.user.token;

      const deleteGameboardMock = jest.spyOn(
        FetchApi.prototype,
        "deleteGameboard"
      );

      await result.current.deleteGameboards(expectedId);

      expect(deleteGameboardMock).toHaveBeenCalledWith(
        expectedToken,
        expectedId
      );
    });

    describe("When FetchApi deleteGameboard method rejects with an error", () => {
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

        await result.current.deleteGameboards("id");

        expect(mockUseDispatch).toHaveBeenCalledWith(action);
      });
    });
  });
});
