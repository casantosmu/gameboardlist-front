import { Gameboards } from "../../types/gameboards";
import GameboardCard from "../GameboardCard/GameboardCard";
import StyledGameboardsGrid from "./StyledGameboardsGrid";

interface GameboardsGridProps {
  gameboards: Gameboards;
}

const GameboardsGrid = ({ gameboards }: GameboardsGridProps): JSX.Element => {
  return (
    <StyledGameboardsGrid aria-label="Your collection list">
      {gameboards.map((gameboard) => (
        <li className="gameboards-grid__col" key={gameboard.id}>
          <GameboardCard {...gameboard} />
        </li>
      ))}
    </StyledGameboardsGrid>
  );
};

export default GameboardsGrid;
