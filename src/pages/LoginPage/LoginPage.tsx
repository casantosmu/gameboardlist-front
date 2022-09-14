import { Link } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import StyledLoginPage from "./StyledLoginPage";

const LoginPage = (): JSX.Element => {
  return (
    <StyledLoginPage>
      <h2 className="login-page__heading">Welcome back</h2>
      <LoginForm />
      <span className="login-page__sign-up">
        Don't have an account yet?{" "}
        <Link to="/register" className="login-page__link">
          Sign up now!
        </Link>
      </span>
    </StyledLoginPage>
  );
};

export default LoginPage;
