import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Container from "../Container/Container";
import StyledNotFound from "./StyledNotFound";

const NotFound = (): JSX.Element => {
  return (
    <Container breakpoint="small">
      <StyledNotFound>
        <FontAwesomeIcon icon={"question"} className="not-found-page__icon" />
        <h1 className="not-found-page__heading">404: Oops!</h1>
        <span className="not-found-page__description">
          The page you're looking for could not be found
        </span>
        <Button renderAs={Link} to={"/"}>
          Home
        </Button>
      </StyledNotFound>
    </Container>
  );
};

export default NotFound;
