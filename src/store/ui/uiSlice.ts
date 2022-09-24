import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OpenDialogActionPayload {
  type: "error" | "success";
  text: string;
  onClose?: () => void;
}

interface UiState {
  dialog: {
    isOpen: boolean;
    type: "error" | "success";
    text: string;
    onClose?: () => void;
  };
  isLoading: boolean;
}

const initialState = {
  dialog: {
    isOpen: false,
    type: "",
    text: "",
  },
  isLoading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState as UiState,
  reducers: {
    openDialog(state, action: PayloadAction<OpenDialogActionPayload>) {
      return {
        ...state,
        dialog: {
          isOpen: true,
          ...action.payload,
        },
      };
    },
    closeDialog(state) {
      return {
        ...state,
        dialog: {
          ...state.dialog,
          isOpen: false,
        },
      };
    },
    showLoading(state) {
      return {
        ...state,
        isLoading: true,
      };
    },
    closeLoading(state) {
      return {
        ...state,
        isLoading: false,
      };
    },
  },
});

export const {
  openDialog: openDialogAction,
  closeDialog: closeDialogAction,
  showLoading: showLoadingAction,
  closeLoading: closeLoadingAction,
} = uiSlice.actions;
export default uiSlice.reducer;
