import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FetchApi from "../../services/FetchApi";
import { TokenPayload, UserLogin, UserRegister } from "../../types/interfaces";
import { openDialogAction, OpenDialogActionPayload } from "../ui/uiSlice";
import { loginUserAction } from "./userSlice";

const fetchApi = new FetchApi();

const useUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginUser = async (user: UserLogin) => {
    try {
      const response = await fetchApi.loginUser(user);

      const token = response!.user.token;
      const { name, email, id } = jwtDecode<TokenPayload>(token);

      dispatch(loginUserAction({ token, email, id, name }));
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      const payload: OpenDialogActionPayload = {
        type: "error",
        text: "Something went wrong",
      };

      if (error instanceof Error && error.message === "Unauthorized") {
        payload.text = "User or password does not exist";
      }

      dispatch(openDialogAction(payload));
    }
  };

  const registerUser = async (user: UserRegister) => {
    try {
      await fetchApi.registerUser(user);

      const payload: OpenDialogActionPayload = {
        type: "success",
        text: "Successfully registred!",
        onClose: () => navigate("/"),
      };

      dispatch(openDialogAction(payload));
    } catch (error) {
      const payload: OpenDialogActionPayload = {
        type: "error",
        text: "Something went wrong",
      };

      if (error instanceof Error) {
        if (error.message === "Bad Request") payload.text = "Wrong fields";
        if (error.message === "Conflict")
          payload.text = "A user with this email already exists";
      }

      dispatch(openDialogAction(payload));
    }
  };

  return { loginUser, registerUser };
};

export default useUser;
