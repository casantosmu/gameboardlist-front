import { Navigate, useOutlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

interface ProtectedLayoutProps {
  token: string;
}

const ProtectedLayout = ({ token }: ProtectedLayoutProps): JSX.Element => {
  const outlet = useOutlet();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar pages={[{ label: "Home", path: "/" }]} />
      {outlet}
    </>
  );
};

export default ProtectedLayout;
