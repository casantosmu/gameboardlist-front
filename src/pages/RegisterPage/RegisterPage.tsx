import Container from "../../components/Container/Container";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import StyledRegisterPage from "./StyledRegisterPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import VisuallyHidden from "../../components/VisuallyHidden/VisuallyHidden";

const RegisterPage = (): JSX.Element => {
  return (
    <StyledRegisterPage>
      <Container breakpoint="small">
        <div className="register-page__top">
          <h1 className="register-page__heading">Register</h1>
          <Link to={"/login"}>
            <FontAwesomeIcon
              icon={faXmark}
              size="xl"
              className="register-page__close"
              title="Back to login page"
              aria-hidden="true"
            />
            <VisuallyHidden>Back to login</VisuallyHidden>
          </Link>
        </div>
        <RegisterForm />
      </Container>
    </StyledRegisterPage>
  );
};

export default RegisterPage;
