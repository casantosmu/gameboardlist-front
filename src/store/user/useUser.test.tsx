import { renderHook } from "@testing-library/react";
import useUser from "./useUser";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { setupStore } from "../store";
import FetchApi from "../../services/FetchApi";
import { openDialogAction, OpenDialogActionPayload } from "../ui/uiSlice";
import { loginUserAction, logoutUserAction } from "./userSlice";
import { User, UserLogin, UserRegister } from "../../types/user";

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
jest.mock("./userSlice", () => ({
  ...jest.requireActual("./userSlice"),
  loginUserAction: (payload: User) => mockLoginUserAction(payload),
}));

let mockOpenDialogAction = jest.fn();
jest.mock("../ui/uiSlice", () => ({
  ...jest.requireActual("../ui/uiSlice"),
  openDialogAction: (payload: OpenDialogActionPayload) =>
    mockOpenDialogAction(payload),
}));

let mockJwtDecode: () => string;
jest.mock("jwt-decode", () => () => mockJwtDecode());

const mockedUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
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

    test("Then it should call the function returned by useNavigate with root path", async () => {
      const rootPath = "/";

      jest.spyOn(FetchApi.prototype, "loginUser").mockResolvedValue(response);
      mockLoginUserAction = jest.fn();
      mockJwtDecode = jest.fn().mockReturnValue(payload);
      Storage.prototype.setItem = jest.fn();

      await result.current.loginUser(user);

      expect(mockedUseNavigate).toHaveBeenCalledWith(rootPath);
    });

    describe("When FetchApi loginUser method rejects with an error", () => {
      test("Then it should call openDialogAction with type error and 'User or password does not exist'", async () => {
        const unauthorizedError = new Error("Unauthorized");

        jest
          .spyOn(FetchApi.prototype, "loginUser")
          .mockRejectedValue(unauthorizedError);
        mockOpenDialogAction = jest.fn();

        const expectedPayload: OpenDialogActionPayload = {
          type: "error",
          text: "User or password does not exist",
        };

        await result.current.loginUser(user);

        expect(mockOpenDialogAction).toHaveBeenCalledWith(expectedPayload);
      });

      test("Then it should call the function returned by useDispatch with the action returned by openDialogAction", async () => {
        const unauthorizedError = new Error("Unauthorized");

        jest
          .spyOn(FetchApi.prototype, "loginUser")
          .mockRejectedValue(unauthorizedError);
        mockOpenDialogAction = jest.fn();

        const actionPayload: OpenDialogActionPayload = {
          type: "error",
          text: "User or password does not exist",
        };

        const action = openDialogAction(actionPayload);

        await result.current.loginUser(user);

        expect(mockUseDispatch).toHaveBeenCalledWith(action);
      });
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

    test("Then it should call openDialogAction with type success, 'Successfully registred!' and onClose action", async () => {
      jest.spyOn(FetchApi.prototype, "registerUser").mockResolvedValue({});
      mockOpenDialogAction = jest.fn();

      const expectedOnClose = mockedUseNavigate("/");
      const expectedType = "success";
      const expectedText = "Successfully registred!";

      await result.current.registerUser(user);

      const mockParameter = mockOpenDialogAction.mock.calls[0][0];

      expect(mockParameter.type).toBe(expectedType);
      expect(mockParameter.text).toBe(expectedText);
      expect(mockParameter.onClose()).toBe(expectedOnClose);
    });

    describe("When FetchApi registerUser method rejects with an 'Bad Request' error", () => {
      test("Then it should call openDialogAction with type error and 'Wrong fields'", async () => {
        const error = new Error("Bad Request");

        jest.spyOn(FetchApi.prototype, "registerUser").mockRejectedValue(error);
        mockOpenDialogAction = jest.fn();

        const expectedPayload: OpenDialogActionPayload = {
          type: "error",
          text: "Wrong fields",
        };

        await result.current.registerUser(user);

        expect(mockOpenDialogAction).toHaveBeenCalledWith(expectedPayload);
      });

      test("Then it should call the function returned by useDispatch with the action returned by openDialogAction", async () => {
        const error = new Error("Bad Request");

        jest.spyOn(FetchApi.prototype, "registerUser").mockRejectedValue(error);
        mockOpenDialogAction = jest.fn();

        const actionPayload: OpenDialogActionPayload = {
          type: "error",
          text: "Wrong fields",
        };

        const action = openDialogAction(actionPayload);

        await result.current.loginUser(user);

        expect(mockUseDispatch).toHaveBeenCalledWith(action);
      });
    });

    describe("When FetchApi registerUser method rejects with an 'Conflict' error", () => {
      test("Then it should call openDialogAction with type error and 'A user with this email already exists'", async () => {
        const error = new Error("Conflict");

        jest.spyOn(FetchApi.prototype, "registerUser").mockRejectedValue(error);
        mockOpenDialogAction = jest.fn();

        const expectedPayload: OpenDialogActionPayload = {
          type: "error",
          text: "A user with this email already exists",
        };

        await result.current.registerUser(user);

        expect(mockOpenDialogAction).toHaveBeenCalledWith(expectedPayload);
      });

      test("Then it should call the function returned by useDispatch with the action returned by openDialogAction", async () => {
        const error = new Error("Conflict");

        jest.spyOn(FetchApi.prototype, "registerUser").mockRejectedValue(error);
        mockOpenDialogAction = jest.fn();

        const actionPayload: OpenDialogActionPayload = {
          type: "error",
          text: "A user with this email already exists",
        };

        const action = openDialogAction(actionPayload);

        await result.current.loginUser(user);

        expect(mockUseDispatch).toHaveBeenCalledWith(action);
      });
    });

    describe("When FetchApi registerUser method rejects", () => {
      test("Then it should call openDialogAction with type error and 'Something went wrong'", async () => {
        jest.spyOn(FetchApi.prototype, "registerUser").mockRejectedValue({});
        mockOpenDialogAction = jest.fn();

        const expectedPayload: OpenDialogActionPayload = {
          type: "error",
          text: "Something went wrong",
        };

        await result.current.registerUser(user);

        expect(mockOpenDialogAction).toHaveBeenCalledWith(expectedPayload);
      });

      test("Then it should call the function returned by useDispatch with the action returned by openDialogAction", async () => {
        jest.spyOn(FetchApi.prototype, "registerUser").mockRejectedValue({});
        mockOpenDialogAction = jest.fn();

        const actionPayload: OpenDialogActionPayload = {
          type: "error",
          text: "Something went wrong",
        };

        const action = openDialogAction(actionPayload);

        await result.current.loginUser(user);

        expect(mockUseDispatch).toHaveBeenCalledWith(action);
      });
    });
  });

  describe("When its invoked its logoutUser function", () => {
    const { result } = renderHook(useUser, { wrapper: Wrapper });

    test("Then it should invoke removeItem method from localStorage with 'token'", async () => {
      Storage.prototype.removeItem = jest.fn();

      await result.current.logoutUser();

      expect(localStorage.removeItem).toHaveBeenCalledWith("token");
    });

    test("Then it should invoke dispatch with logoutUserAction", async () => {
      const action = logoutUserAction();

      await result.current.logoutUser();

      expect(mockUseDispatch).toHaveBeenCalledWith(action);
    });
  });
});
