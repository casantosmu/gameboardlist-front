import { renderHook } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { setupStore } from "../store";
import { Provider } from "react-redux";
import useGameboard from "./useGameboard";
import FetchApi from "../../services/FetchApi";
import { showLoadingAction } from "../ui/uiSlice";
import { fakeGameboard1 } from "../../utils/mocks/fakeData";
import { gameboardLoadSuccessAction } from "./gameboardSlice";

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

const mockUseDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockUseDispatch,
}));

describe("Given a useGameboards function", () => {
  describe("When its invoked its getGameboards function and it recives an id", () => {
    const { result } = renderHook(useGameboard, { wrapper: Wrapper });
    const id = "id";

    test("Then it should call the function returned by useDispatch with showLoadingAction function", async () => {
      await result.current.getGameboard(id);

      expect(mockUseDispatch).toHaveBeenCalledWith(showLoadingAction());
    });

    test("Then it should invoke FetchApi getGameboard method with the user token from state and the recived id", async () => {
      const getGameboardMock = jest.spyOn(FetchApi.prototype, "getGameboard");

      await result.current.getGameboard(id);

      expect(getGameboardMock).toHaveBeenCalledWith(
        preloadedState.user.token,
        id
      );
    });

    test("Then it should call the function returned by useDispatch with the action returned by gameboardsLoadSuccessAction", async () => {
      const fetchResponse = {
        gameboard: fakeGameboard1,
      };
      const actionPayload = {
        ...fakeGameboard1,
        image: `${process.env.REACT_APP_API_URL}/${fakeGameboard1.image}`,
      };

      const action = gameboardLoadSuccessAction(actionPayload);

      jest
        .spyOn(FetchApi.prototype, "getGameboard")
        .mockResolvedValue(fetchResponse);

      await result.current.getGameboard(id);

      expect(mockUseDispatch).toHaveBeenCalledWith(action);
    });
  });
});
