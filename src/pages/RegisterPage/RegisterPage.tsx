import RegisterForm from "../../components/RegisterForm/RegisterForm";
import StyledRegisterPage from "./StyledRegisterPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import VisuallyHidden from "../../components/VisuallyHidden/VisuallyHidden";

const RegisterPage = (): JSX.Element => {
  return (
    <StyledRegisterPage>
      <div className="register-page__top">
        <h2 className="register-page__heading">Register</h2>
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
    </StyledRegisterPage>
  );
};

export default RegisterPage;
