import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import useUser from "../../store/hooks/useUser";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps): JSX.Element => {
  const { setUser } = useUser();
  const { token } = useAppSelector((store) => store.user);

  if (!token) {
    setUser();
  }

  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
