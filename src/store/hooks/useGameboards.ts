import { useCallback } from "react";
import FetchApi from "../../services/FetchApi";
import { useAppDispatch, useAppSelector } from "../hooks";
import { loadGameboardsAction } from "../slices/gameboardsSlice/gameboardsSlice";
import {
  closeLoadingAction,
  openDialogAction,
  showLoadingAction,
} from "../slices/uiSlice/uiSlice";

const useGameboards = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.user);

  const getGameboards = useCallback(async () => {
    const fetchApi = new FetchApi();

    try {
      dispatch(showLoadingAction());

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

  return {
    getGameboards,
  };
};

export default useGameboards;
