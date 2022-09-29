import { useCallback } from "react";
import { useDispatch } from "react-redux";
import FetchApi from "../../services/FetchApi";
import { useAppSelector } from "../hooks";
import { closeLoadingAction, showLoadingAction } from "../ui/uiSlice";
import {
  gameboardLoadAction,
  gameboardLoadFailureAction,
  gameboardLoadSuccessAction,
} from "./gameboardSlice";

const useGameboard = () => {
  const { token } = useAppSelector((state) => state.user);
  const dispatch = useDispatch();

  const getGameboard = useCallback(
    async (id: string) => {
      const fetchApi = new FetchApi();

      dispatch(showLoadingAction());
      dispatch(gameboardLoadAction());

      try {
        const { gameboard: gameboardResponse } = await fetchApi.getGameboard(
          token,
          id
        );
        const gameboard = {
          ...gameboardResponse,
          image: `${process.env.REACT_APP_API_URL}/${gameboardResponse.image}`,
        };

        dispatch(gameboardLoadSuccessAction(gameboard));
      } catch (error) {
        dispatch(gameboardLoadFailureAction((error as Error).message));
      } finally {
        dispatch(closeLoadingAction());
      }
    },
    [dispatch, token]
  );

  return {
    getGameboard,
  };
};

export default useGameboard;
