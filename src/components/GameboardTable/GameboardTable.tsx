import { GameboardsCategories, MinMax } from "../../types/interfaces";
import { capitalizeFirstLetter } from "../../utils/utils";
import RatingTile from "../RatingTile/RatingTile";
import StyledGameboardTable from "./StyledGameboardTable";

interface GameboardTableProps {
  rating: number;
  weight: number;
  year: number;
  category: GameboardsCategories;
  authorship?: string;
  players: MinMax;
  time: MinMax;
}

const GameboardTable = ({
  rating,
  weight,
  year,
  category,
  authorship,
  players,
  time,
}: GameboardTableProps) => {
  return (
    <StyledGameboardTable>
      <div className="gameboard-table__row">
        <div className="gameboard-table__col gameboard-table__col--strong gameboard-table__col--2">
          <h3 className="gameboard-table__heading">Year</h3>
        </div>
        <div className="gameboard-table__col gameboard-table__col--2">
          <span>{year}</span>
        </div>
        <div className="gameboard-table__col gameboard-table__col--strong gameboard-table__col--2">
          <h3 className="gameboard-table__heading">Author/s</h3>
        </div>
        <div className="gameboard-table__col gameboard-table__col--6">
          <span>{authorship || "-"}</span>
        </div>
      </div>
      <div className="gameboard-table__row">
        <div className="gameboard-table__col gameboard-table__col--strong gameboard-table__col--2">
          <h3 className="gameboard-table__heading">Category</h3>
        </div>
        <div className="gameboard-table__col gameboard-table__col--10">
          <span>{capitalizeFirstLetter(category)}</span>
        </div>
      </div>
      <div className="gameboard-table__row">
        <div className="gameboard-table__col gameboard-table__col--strong gameboard-table__col--2">
          <h3 className="gameboard-table__heading">Players</h3>
        </div>
        <div className="gameboard-table__col gameboard-table__col--2">
          <span>{`${players.min}/${players.max}`}</span>
        </div>
        <div className="gameboard-table__col gameboard-table__col--strong gameboard-table__col--2">
          <h3 className="gameboard-table__heading">Time</h3>
        </div>
        <div className="gameboard-table__col gameboard-table__col--2">
          <span>{`${time.min}/${time.min} Min`}</span>
        </div>
        <div className="gameboard-table__col gameboard-table__col--strong gameboard-table__col--2">
          <h3 className="gameboard-table__heading">Weight</h3>
        </div>
        <div className="gameboard-table__col gameboard-table__col--2">
          <span>{`${weight}/5`}</span>
        </div>
      </div>
      <div className="gameboard-table__row">
        <div className="gameboard-table__col gameboard-table__col--strong gameboard-table__col--2">
          <h3 className="gameboard-table__heading">Rating</h3>
        </div>
        <div className="gameboard-table__col gameboard-table__col--10">
          <RatingTile rating={rating} />
        </div>
      </div>
    </StyledGameboardTable>
  );
};

export default GameboardTable;
