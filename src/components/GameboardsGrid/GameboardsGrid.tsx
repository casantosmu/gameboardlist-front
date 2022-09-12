import { Gameboards } from "../../types/interfaces";
import GameboardCard from "../GameboardCard/GameboardCard";
import StyledGameboardsGrid from "./StyledGameboardsGrid";

interface GameboardsGridProps {
  gameboards: Gameboards;
}

const GameboardsGrid = ({ gameboards }: GameboardsGridProps): JSX.Element => {
  return (
    <StyledGameboardsGrid aria-label="Your collection list">
      {gameboards.map(
        ({
          id,
          image,
          imageBackup,
          name,
          year,
          players,
          time,
          weight,
          rating,
        }) => (
          <li className="gameboards-grid__col" key={id}>
            <GameboardCard
              id={id}
              image={image}
              imageBackup={imageBackup}
              name={name}
              year={year}
              players={players}
              time={time}
              weight={weight}
              rating={rating}
            />
          </li>
        )
      )}
    </StyledGameboardsGrid>
  );
};

export default GameboardsGrid;
