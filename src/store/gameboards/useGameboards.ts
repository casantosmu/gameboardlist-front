import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import FetchApi from "../../services/FetchApi";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  closeLoadingAction,
  openDialogAction,
  OpenDialogActionPayload,
  showLoadingAction,
} from "../ui/uiSlice";
import {
  gameboardsAddAction,
  gameboardsDeleteSuccessAction,
  gameboardsLoadAction,
  gameboardsLoadFailureAction,
  gameboardsLoadSuccessAction,
} from "./gameboardsSlice";

const useGameboards = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const getGameboards = useCallback(async () => {
    const fetchApi = new FetchApi();

    dispatch(showLoadingAction());
    dispatch(gameboardsLoadAction());

    try {
      const { gameboards: gameboardsResponse } = await fetchApi.getGameboards(
        token
      );
      const gameboards = gameboardsResponse.map(({ image, ...gameboard }) => ({
        ...gameboard,
        image: `${process.env.REACT_APP_API_URL}/${image}`,
      }));

      dispatch(gameboardsLoadSuccessAction(gameboards));
    } catch (error) {
      dispatch(gameboardsLoadFailureAction((error as Error).message));
    } finally {
      dispatch(closeLoadingAction());
    }
  }, [dispatch, token]);

  const deleteGameboards = async (id: string) => {
    const fetchApi = new FetchApi();

    dispatch(showLoadingAction());

    try {
      await fetchApi.deleteGameboard(token, id);

      dispatch(gameboardsDeleteSuccessAction(id));
    } catch {
      const openDialogPayload: OpenDialogActionPayload = {
        text: "Ups! Shomething went wrong",
        type: "error",
      };
      dispatch(openDialogAction(openDialogPayload));
    } finally {
      dispatch(closeLoadingAction());
    }
  };

  const postGameboards = async (gameboard: FormData) => {
    const fetchApi = new FetchApi();

    dispatch(showLoadingAction());

    try {
      const { gameboard: gameboardResponse } = await fetchApi.postGameboard(
        token,
        gameboard
      );

      const openDialogPayload: OpenDialogActionPayload = {
        type: "success",
        text: "Successfully added!",
        onClose: () => navigate("/"),
      };
      dispatch(openDialogAction(openDialogPayload));

      dispatch(gameboardsAddAction(gameboardResponse));
    } catch {
      const openDialogPayload: OpenDialogActionPayload = {
        text: "Ups! Shomething went wrong",
        type: "error",
      };

      dispatch(openDialogAction(openDialogPayload));
    } finally {
      dispatch(closeLoadingAction());
    }
  };

  return {
    getGameboards,
    deleteGameboards,
    postGameboards,
  };
};

export default useGameboards;
