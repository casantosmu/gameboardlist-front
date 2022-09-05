import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OpenDialogActionPayload {
  type: "error" | "success";
  text: string;
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
  initialState,
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
          isOpen: false,
          type: "",
          text: "",
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
