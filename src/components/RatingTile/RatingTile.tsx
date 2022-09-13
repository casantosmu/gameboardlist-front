import StyledRatingTile from "./StyledRatingTile";

interface RatingTileProps {
  rating: number;
}

const RatingTile = ({ rating }: RatingTileProps): JSX.Element => (
  <StyledRatingTile aria-label="Rating">{rating}</StyledRatingTile>
);

export default RatingTile;
