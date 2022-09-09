import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import GameboardsGrid from "../../components/GameboardsGrid/GameboardsGrid";
import { useAppSelector } from "../../store/hooks";
import useGameboards from "../../store/hooks/useGameboards";
import StyledHomePage from "./StyledHomePage";

const HomePage = (): JSX.Element => {
  const { getGameboards } = useGameboards();
  const { gameboards } = useAppSelector((state) => state.gameboards);

  useEffect(() => {
    getGameboards();
  }, [getGameboards]);

  return (
    <StyledHomePage>
      <Container breakpoint="large">
        <header className="home-page__header">
          <h1 className="home-page__heading">Your collection</h1>
          <Button onClick={() => {}}>
            <FontAwesomeIcon
              icon="plus"
              aria-hidden="true"
              className="home-page__header-icon"
            />
            Add New
          </Button>
        </header>
        <GameboardsGrid gameboards={gameboards} />
      </Container>
    </StyledHomePage>
  );
};

export default HomePage;
