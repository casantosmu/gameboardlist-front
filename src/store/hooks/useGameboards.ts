import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import FetchApi from "../../services/FetchApi";
import { useAppDispatch, useAppSelector } from "../hooks";
import { loadGameboardsAction } from "../slices/gameboardsSlice/gameboardsSlice";
import {
  closeLoadingAction,
  openDialogAction,
  OpenDialogActionPayload,
  showLoadingAction,
} from "../slices/uiSlice/uiSlice";

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
  const { token, id } = useAppSelector((state) => state.user);

  const getGameboards = useCallback(async () => {
    const fetchApi = new FetchApi();

    dispatch(showLoadingAction());

    try {
      const { gameboards } = await fetchApi.getGameboards(token);

      dispatch(loadGameboardsAction(gameboards));
    } catch {
      dispatch(
        openDialogAction({
          text: "Ups! Shomething went wrong",
          type: "error",
        })
      );
    }

    dispatch(closeLoadingAction());
  }, [dispatch, token]);

  const postGameboard = useCallback(
    async (gameboard: PostGameboard) => {
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
      formData.append("createdBy", id);

      try {
        await fetchApi.postGameboard(token, formData);

        const payload: OpenDialogActionPayload = {
          type: "success",
          text: "Successfully added!",
          onClose: () => navigate("/"),
        };

        dispatch(openDialogAction(payload));
      } catch {
        dispatch(
          openDialogAction({
            text: "Ups! Shomething went wrong",
            type: "error",
          })
        );
      }

      dispatch(closeLoadingAction());
    },
    [dispatch, id, navigate, token]
  );

  return {
    getGameboards,
    postGameboard,
  };
};

export default useGameboards;
