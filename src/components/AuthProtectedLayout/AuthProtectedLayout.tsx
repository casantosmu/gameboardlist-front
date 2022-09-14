import { Navigate, useOutlet } from "react-router-dom";
import Container from "../Container/Container";
import StyledAuthProtectedLayout from "./StyledAuthProtectedLayout";

interface ProtectedLayoutProps {
  token: string;
}

const AuthProtectedLayout = ({ token }: ProtectedLayoutProps): JSX.Element => {
  const outlet = useOutlet();

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <StyledAuthProtectedLayout>
      <Container breakpoint="small">
        <header className="auth-layout__header">
          <img
            src="/favicon.webp"
            alt="GameboardsList logo"
            height={38}
            width={38}
          />
          <h1 className="auth-layout__heading">GameBoardList</h1>
        </header>
        {outlet}
      </Container>
    </StyledAuthProtectedLayout>
  );
};

export default AuthProtectedLayout;
