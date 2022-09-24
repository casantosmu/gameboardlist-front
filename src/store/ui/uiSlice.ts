import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OpenDialogActionPayload {
  type: "error" | "success";
  text: string;
  onClose?: () => void;
}

interface UiState {
  isLoading: boolean;
  dialog: {
    isOpen: boolean;
    type: "error" | "success";
    text: string;
    onClose?: () => void;
  };
}

const initialState = {
  isLoading: false,
  dialog: {
    isOpen: false,
    type: "",
    text: "",
  },
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
        isLoading: true,
        dialog: state.dialog,
      };
    },
    closeLoading(state) {
      return {
        isLoading: false,
        dialog: state.dialog,
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
