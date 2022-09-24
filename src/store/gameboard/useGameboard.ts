import { useCallback } from "react";
import { useDispatch } from "react-redux";
import FetchApi from "../../services/FetchApi";
import { GameboardResponse } from "../../types/interfaces";
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
        const response = (await fetchApi.getGameboard(
          token,
          id
        )) as GameboardResponse;
        const gameboard = {
          ...response.gameboard,
          image: `${process.env.REACT_APP_API_URL}/${response.gameboard.image}`,
        };

        dispatch(gameboardLoadSuccessAction(gameboard));
      } catch (error) {
        if (error instanceof Error) {
          dispatch(gameboardLoadFailureAction(error.message));
        }
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
