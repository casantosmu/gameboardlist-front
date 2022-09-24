import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import Container from "../Container/Container";
import StyledError from "./StyledError";

const Error = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Container breakpoint="small">
      <StyledError>
        <FontAwesomeIcon icon={"close"} className="error-page__icon" />
        <h1 className="error-page__heading">Error</h1>
        <span className="error-page__description">
          Ups! Something went wrong
        </span>
        <Button onClick={() => navigate("/")}>Home</Button>
      </StyledError>
    </Container>
  );
};

export default Error;
