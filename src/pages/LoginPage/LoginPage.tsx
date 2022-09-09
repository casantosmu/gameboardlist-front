import { Link } from "react-router-dom";
import Container from "../../components/Container/Container";
import LoginForm from "../../components/LoginForm/LoginForm";
import StyledLoginPage from "./StyledLoginPage";

const LoginPage = (): JSX.Element => {
  return (
    <StyledLoginPage>
      <Container breakpoint="small">
        <h1 className="login-page__heading">Welcome back</h1>
        <LoginForm />
        <span className="login-page__sign-up">
          Don't have an account yet?{" "}
          <Link to="/register" className="login-page__link">
            Sign up now!
          </Link>
        </span>
      </Container>
    </StyledLoginPage>
  );
};

export default LoginPage;
