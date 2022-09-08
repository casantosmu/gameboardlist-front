import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  condition: boolean;
  rejectPath: string;
}

const ProtectedRoute = ({
  condition,
  rejectPath,
}: ProtectedRouteProps): JSX.Element =>
  condition ? <Outlet /> : <Navigate to={rejectPath} />;

export default ProtectedRoute;
