import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Container from "../../components/Container/Container";
import GameboardTable from "../../components/GameboardTable/GameboardTable";
import VisuallyHidden from "../../components/VisuallyHidden/VisuallyHidden";
import { useAppSelector } from "../../store/hooks";
import useGameboard from "../../store/gameboard/useGameboard";
import Error from "../../components/Error/Error";
import StyledGameboardDetailsPage from "./StyledDetailsPage";
import NotFound from "../../components/NotFound/NotFound";
import Button from "../../components/Button/Button";
import useGameboards from "../../store/gameboards/useGameboards";

const DetailsPage = (): JSX.Element => {
  const { id } = useParams();
  const { error, status, gameboard } = useAppSelector(
    (state) => state.gameboard
  );
  const { getGameboard } = useGameboard();
  const { deleteGameboards } = useGameboards();
  const navigate = useNavigate();

  useEffect(() => {
    getGameboard(id!);
  }, [getGameboard, id]);

  if (error) {
    return error === "Not Found" || error === "Bad Request" ? (
      <NotFound />
    ) : (
      <Error />
    );
  }

  return (
    <>
      {gameboard && status !== "loading" && (
        <Container breakpoint="large" style={{ padding: "1rem 0 2rem" }}>
          <StyledGameboardDetailsPage>
            <header className="gameboard-detail__header">
              <div className="gameboard-detail__header-col">
                <Button
                  semantic="secondary"
                  onClick={async () => {
                    await deleteGameboards(gameboard.id);
                    navigate("/");
                  }}
                >
                  Delete
                </Button>
              </div>
              <div className="gameboard-detail__header-col">
                <Link to={"/"} className="gameboard-detail__icon">
                  <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                  <VisuallyHidden>Back to collection</VisuallyHidden>
                </Link>
                <h1 className="gameboard-detail__heading">{gameboard.name}</h1>
                <span className="gameboard-detail__heading-label">
                  {gameboard.year}
                </span>
              </div>
            </header>
            <div className="gameboard-detail__content">
              <img
                src={gameboard.image}
                alt={`${gameboard.name} game cover`}
                className="gameboard-detail__cover"
                height={250}
                width={250}
                onError={({ currentTarget: target }) => {
                  target.onerror = null;
                  target.src = gameboard.imageBackup;
                }}
              />
              <div className="gameboard-detail__info">
                <h2 className="gameboard-detail__subheading">Info</h2>
                <GameboardTable
                  year={gameboard.year}
                  rating={gameboard.rating}
                  players={gameboard.players}
                  time={gameboard.time}
                  weight={gameboard.weight}
                  category={gameboard.category}
                  authorship={gameboard.authorship}
                />
              </div>
            </div>
          </StyledGameboardDetailsPage>
        </Container>
      )}
    </>
  );
};

export default DetailsPage;
