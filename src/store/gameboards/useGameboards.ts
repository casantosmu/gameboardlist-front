import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import FetchApi from "../../services/FetchApi";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  closeLoadingAction,
  openDialogAction,
  showLoadingAction,
} from "../ui/uiSlice";
import { gameboardsLoadSuccessAction } from "./gameboardsSlice";

interface PostGameboard {
  image: string;
  rating: string;
  name: string;
  year: string;
  category: string;
  weight: string;
  playersMin: string;
  playersMax: string;
  timeMin: string;
  timeMax: string;
  authorship: string;
}

const useGameboards = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.user);

  const getGameboards = useCallback(async () => {
    const fetchApi = new FetchApi();

    dispatch(showLoadingAction());

    try {
      const gameboards = await fetchApi.getGameboards(token);

      dispatch(
        gameboardsLoadSuccessAction(
          gameboards!.gameboards.map(({ image, ...gameboard }) => ({
            ...gameboard,
            image: `${process.env.REACT_APP_API_URL}/${image}`,
          }))
        )
      );
    } catch {
      dispatch(
        openDialogAction({
          text: "Ups! Shomething went wrong",
          type: "error",
        })
      );
    } finally {
      dispatch(closeLoadingAction());
    }
  }, [dispatch, token]);

  const postGameboard = async (gameboard: PostGameboard) => {
    const fetchApi = new FetchApi();

    dispatch(showLoadingAction());

    const formData = new FormData();
    formData.append("image", gameboard.image);
    formData.append("rating", gameboard.rating);
    formData.append("name", gameboard.name);
    formData.append("year", gameboard.year);
    formData.append("category", gameboard.category);
    formData.append("weight", gameboard.weight);
    formData.append("players[min]", gameboard.playersMin);
    formData.append("players[max]", gameboard.playersMax);
    formData.append("time[min]", gameboard.timeMin);
    formData.append("time[max]", gameboard.timeMax);
    formData.append("authorship", gameboard.authorship || "-");

    try {
      await fetchApi.postGameboard(token, formData);

      dispatch(
        openDialogAction({
          type: "success",
          text: "Successfully added!",
          onClose: () => navigate("/"),
        })
      );
    } catch {
      dispatch(
        openDialogAction({
          text: "Ups! Shomething went wrong",
          type: "error",
        })
      );
    } finally {
      dispatch(closeLoadingAction());
    }
  };

  const deleteGameboard = async (id: string) => {
    const fetchApi = new FetchApi();

    dispatch(showLoadingAction());

    try {
      await fetchApi.deleteGameboard(token, id);
      await getGameboards();
    } catch {
      dispatch(
        openDialogAction({
          text: "Ups! Shomething went wrong",
          type: "error",
        })
      );
    } finally {
      dispatch(closeLoadingAction());
    }
  };

  return {
    getGameboards,
    postGameboard,
    deleteGameboard,
  };
};

export default useGameboards;
