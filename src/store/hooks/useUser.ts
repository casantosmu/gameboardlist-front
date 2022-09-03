import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import FetchApi from "../../services/FetchApi";
import { UserLogin } from "../../types/interfaces";
import { loginUserAction } from "../slices/userSlice";

const fetchApi = new FetchApi();

interface TokenPayload {
  id: string;
  name: string;
  email: string;
}

const useUser = () => {
  const dispatch = useDispatch();

  const loginUser = async (user: UserLogin) => {
    try {
      const response = await fetchApi.loginUser(user);

      const token = response.user.token;
      const { name, email, id } = jwtDecode<TokenPayload>(token);

      dispatch(loginUserAction({ token, email, id, name }));
      localStorage.setItem("token", token);
    } catch (error: unknown) {
      if (error instanceof Error && error.message === "Bad Request") {
        alert("Username or password is incorrect");
      }
    }
  };

  return { loginUser };
};

export default useUser;
