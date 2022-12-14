import { Link } from "react-router-dom";
import useGameboards from "../../store/gameboards/useGameboards";
import { Gameboard } from "../../types/gameboards";
import RatingTile from "../RatingTile/RatingTile";
import StyledGameboardCard from "./StyledGameboardCard";

const GameboardCard = ({
  id,
  image,
  imageBackup,
  name,
  rating,
  year,
  time,
  players,
  weight,
}: Gameboard): JSX.Element => {
  const { deleteGameboards } = useGameboards();

  return (
    <StyledGameboardCard>
      <header>
        <div className="gameboard-card__cover-wrapper">
          <img
            src={image}
            loading="lazy"
            alt={`${name} game cover`}
            className="gameboard-card__cover"
            height={160}
            width={160}
            onError={({ currentTarget: target }) => {
              target.onerror = null;
              target.src = imageBackup;
            }}
          />
        </div>
        <h2 className="gameboard-card__heading">{`${name} (${year})`}</h2>
      </header>
      <div className="gameboard-card__content-wrapper">
        <div className="gameboard-card__content gameboard-card__content--big">
          <div className="gameboard-card__data-row">
            <div className="gameboard-card__data-col">
              <h3 className="gameboard-card__data-title">Players</h3>
              <span className="gameboard-card__data-content">
                {`${players.min}-${players.max}`}
              </span>
            </div>
            <div className="gameboard-card__data-col">
              <h3 className="gameboard-card__data-title">Weight</h3>
              <span className="gameboard-card__data-content">{weight} / 5</span>
            </div>
          </div>
          <div>
            <h3 className="gameboard-card__data-title">Time</h3>
            <span className="gameboard-card__data-content">{`${time.min} / ${time.max} Min`}</span>
          </div>
        </div>
        <div className="gameboard-card__content gameboard-card__content--small">
          <RatingTile rating={rating} />
        </div>
      </div>
      <footer className="gameboard-card__footer">
        <ul className="gameboard-card__footer-list">
          <li className="gameboard-card__footer-item">
            <button
              className="gameboard-card__footer-action"
              onClick={async () => {
                await deleteGameboards(id);
              }}
            >
              Delete
            </button>
          </li>
          <li className="gameboard-card__footer-item">
            <Link
              to={`gameboard/${id}`}
              className="gameboard-card__footer-action"
            >
              View
            </Link>
          </li>
        </ul>
      </footer>
    </StyledGameboardCard>
  );
};

export default GameboardCard;
