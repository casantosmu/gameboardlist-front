import Container from "../../components/Container/Container";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import StyledRegisterPage from "./StyledRegisterPage";

const RegisterPage = (): JSX.Element => {
  return (
    <StyledRegisterPage>
      <Container breakpoint="small">
        <h1 className="register-page__heading">Register</h1>
        <RegisterForm />
      </Container>
    </StyledRegisterPage>
  );
};

export default RegisterPage;
