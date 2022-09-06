import { renderHook } from "@testing-library/react";
import useUser from "./useUser";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { setupStore } from "../store";
import { User, UserLogin, UserRegister } from "../../types/interfaces";
import FetchApi from "../../services/FetchApi";
import { loginUserAction } from "../slices/userSlice";

const store = setupStore();

const Wrapper = ({ children }: PropsWithChildren): JSX.Element => (
  <Provider store={store}>{children}</Provider>
);

afterEach(() => {
  jest.clearAllMocks();
});

const mockUseDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockUseDispatch,
}));

let mockLoginUserAction: (payload: User) => string;
jest.mock("../slices/userSlice", () => ({
  ...jest.requireActual("../slices/userSlice"),
  loginUserAction: (payload: User) => mockLoginUserAction(payload),
}));

let mockJwtDecode: () => string;
jest.mock("jwt-decode", () => () => mockJwtDecode());

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Given a useUser function", () => {
  describe("When its invoked its loginUser function with a user", () => {
    const user: UserLogin = {
      email: "email",
      password: "password",
    };

    const response = {
      user: {
        token: "token",
      },
    };
    const payload = {
      id: "id",
      name: "name",
      email: "email",
    };

    const { result } = renderHook(useUser, { wrapper: Wrapper });

    test("Then it should invoke FetchApi loginUser method with the recived user", async () => {
      const loginUserMock = jest.spyOn(FetchApi.prototype, "loginUser");

      await result.current.loginUser(user);

      expect(loginUserMock).toHaveBeenCalledWith(user);
    });

    test("Then it should call jwtDecode with the token retured by loginUser FetchApi method", async () => {
      jest.spyOn(FetchApi.prototype, "loginUser").mockResolvedValue(response);
      mockJwtDecode = jest.fn();

      await result.current.loginUser(user);

      expect(mockJwtDecode).toHaveBeenCalled();
    });

    test("Then it should call loginUserAction with the decoded token", async () => {
      jest.spyOn(FetchApi.prototype, "loginUser").mockResolvedValue(response);
      mockJwtDecode = jest.fn().mockReturnValue(payload);
      mockLoginUserAction = jest.fn();

      const expectedPayload = {
        id: "id",
        name: "name",
        email: "email",
        token: response.user.token,
      };

      await result.current.loginUser(user);

      expect(mockLoginUserAction).toHaveBeenCalledWith(expectedPayload);
    });

    test("Then it should call the function returned by useDispatch with the action returned by loginUserAction", async () => {
      jest.spyOn(FetchApi.prototype, "loginUser").mockResolvedValue(response);
      mockJwtDecode = jest.fn().mockReturnValue(payload);

      const actionPayload = {
        id: "id",
        name: "name",
        email: "email",
        token: "token",
      };
      const action = loginUserAction(actionPayload);

      await result.current.loginUser(user);

      expect(mockUseDispatch).toHaveBeenCalledWith(action);
    });

    test("Then it should call the setItem localStorage method with the token retured by loginUser FetchApi method", async () => {
      jest.spyOn(FetchApi.prototype, "loginUser").mockResolvedValue(response);
      mockLoginUserAction = jest.fn();
      mockJwtDecode = jest.fn().mockReturnValue(payload);
      Storage.prototype.setItem = jest.fn();

      await result.current.loginUser(user);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        "token",
        response.user.token
      );
    });
  });

  describe("When its invoked its registerUser function with a user", () => {
    const { result } = renderHook(useUser, { wrapper: Wrapper });

    const user: UserRegister = {
      name: "name",
      email: "email",
      password: "password",
    };

    test("Then it should invoke FetchApi loginUser method with the recived user", async () => {
      const registerUserMock = jest.spyOn(FetchApi.prototype, "registerUser");

      await result.current.registerUser(user);

      expect(registerUserMock).toHaveBeenCalledWith(user);
    });
  });
});
