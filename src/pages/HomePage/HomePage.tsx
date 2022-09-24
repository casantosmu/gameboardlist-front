import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import GameboardsGrid from "../../components/GameboardsGrid/GameboardsGrid";
import useGameboards from "../../store/gameboards/useGameboards";
import { useAppSelector } from "../../store/hooks";
import StyledHomePage from "./StyledHomePage";

const HomePage = (): JSX.Element => {
  const { getGameboards } = useGameboards();
  const { gameboards } = useAppSelector((state) => state.gameboards);
  const navigate = useNavigate();

  useEffect(() => {
    getGameboards();
  }, [getGameboards]);

  return (
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
  );
};

export default HomePage;
