import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import StyledNotFoundPage from "./StyledNotFoundPage";

const NotFoundPage = (): JSX.Element => {
  return (
    <Container breakpoint="small">
      <StyledNotFoundPage>
        <FontAwesomeIcon icon={"question"} className="not-found-page__icon" />
        <h1 className="not-found-page__heading">404: Oops!</h1>
        <span className="not-found-page__description">
          The page you're looking for could not be found
        </span>
        <Button renderAs={Link} to={"/"}>
          Home
        </Button>
      </StyledNotFoundPage>
    </Container>
  );
};

export default NotFoundPage;
