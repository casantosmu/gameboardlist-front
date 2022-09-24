import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import Error from "../../components/Error/Error";
import GameboardsGrid from "../../components/GameboardsGrid/GameboardsGrid";
import { useAppSelector } from "../../store/hooks";
import useGameboards from "../../store/gameboards/useGameboards";
import StyledHomePage from "./StyledHomePage";

const HomePage = (): JSX.Element => {
  const { getGameboards } = useGameboards();
  const { status, error, gameboards } = useAppSelector(
    (state) => state.gameboards
  );
  const navigate = useNavigate();

  useEffect(() => {
    getGameboards();
  }, [getGameboards]);

  if (error) {
    return <Error />;
  }

  return (
    <>
      {status !== "loading" && (
        <Container breakpoint="large" style={{ paddingBottom: "2rem" }}>
          <StyledHomePage>
            <header className="home-page__header">
              <h1 className="home-page__heading">Your collection</h1>
              <Button onClick={() => navigate("/gameboard/create")}>
                <FontAwesomeIcon
                  icon="plus"
                  aria-hidden="true"
                  className="home-page__header-icon"
                />
                Add New
              </Button>
            </header>
            <GameboardsGrid gameboards={gameboards} />
          </StyledHomePage>
        </Container>
      )}
    </>
  );
};

export default HomePage;
