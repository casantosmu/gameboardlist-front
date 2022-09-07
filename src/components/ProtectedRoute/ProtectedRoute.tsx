import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

const ProtectedRoute = (): JSX.Element => {
  const { token } = useAppSelector((store) => store.user);
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
