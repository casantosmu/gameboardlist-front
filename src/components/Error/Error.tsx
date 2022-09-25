import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Container from "../Container/Container";
import StyledError from "./StyledError";

const Error = (): JSX.Element => {
  return (
    <Container breakpoint="small">
      <StyledError>
        <FontAwesomeIcon icon={faClose} className="error-page__icon" />
        <h1 className="error-page__heading">Error</h1>
        <span className="error-page__description">
          Ups! Something went wrong
        </span>
        <Button renderAs={Link} to={"/"}>
          Home
        </Button>
      </StyledError>
    </Container>
  );
};

export default Error;
