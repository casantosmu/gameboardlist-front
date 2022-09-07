import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  condition: boolean;
  path: string;
}

const ProtectedRoute = ({
  condition,
  path,
}: ProtectedRouteProps): JSX.Element =>
  condition ? <Outlet /> : <Navigate to={path} />;

export default ProtectedRoute;
