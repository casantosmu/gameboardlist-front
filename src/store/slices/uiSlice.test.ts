import uiSlice, {
  closeDialogAction,
  closeLoadingAction,
  openDialogAction,
  OpenDialogActionPayload,
  showLoadingAction,
} from "./uiSlice";

describe("Given a openDialogAction function", () => {
  describe("When its invoked with a type 'error' and 'Hola' text", () => {
    test("Then it should return an action type 'ui/openDialog' with the recived type and text", () => {
      const payload: OpenDialogActionPayload = {
        type: "error",
        text: "Hola",
      };
      const expectedActionType = "ui/openDialog";
      const expectedUser = payload;
      const expectedAction = {
        type: expectedActionType,
        payload: expectedUser,
      };

      const result = openDialogAction(payload);

      expect(result).toStrictEqual(expectedAction);
    });
  });
});

describe("Given a closeDialogAction function", () => {
  describe("When its invoked", () => {
    test("Then it should return an action type 'ui/closeDialog'", () => {
      const expectedActionType = "ui/closeDialog";
      const expectedAction = {
        type: expectedActionType,
        payload: undefined,
      };

      const result = closeDialogAction();

      expect(result).toStrictEqual(expectedAction);
    });
  });
});

describe("Given a showLoadingAction function", () => {
  describe("When its invoked", () => {
    test("Then it should return an action type 'ui/showLoading'", () => {
      const expectedActionType = "ui/showLoading";
      const expectedAction = {
        type: expectedActionType,
        payload: undefined,
      };

      const result = showLoadingAction();

      expect(result).toStrictEqual(expectedAction);
    });
  });
});

describe("Given a closeLoadingAction function", () => {
  describe("When its invoked", () => {
    test("Then it should return an action type 'ui/closeLoading'", () => {
      const expectedActionType = "ui/closeLoading";
      const expectedAction = {
        type: expectedActionType,
        payload: undefined,
      };

      const result = closeLoadingAction();

      expect(result).toStrictEqual(expectedAction);
    });
  });
});

describe("Given a uiSlice function", () => {
  const initialState = {
    dialog: {
      isOpen: false,
      type: "error" as "error",
      text: "text",
    },
    isLoading: false,
  };

  describe("When it is called with an unknow action", () => {
    test("Then it should return the initial state", () => {
      const unknownAction = { type: "unknown" };

      const result = uiSlice(initialState, unknownAction);

      expect(result).toEqual(initialState);
    });
  });

  describe("When it is called with action type openDialog with a type 'error' and 'Hola' text", () => {
    test("Then it should return the intial state with dialog as open and the recived text and type", () => {
      const payload: OpenDialogActionPayload = {
        type: "error",
        text: "Hola",
      };
      const expectedResult = {
        ...initialState,
        dialog: {
          isOpen: true,
          ...payload,
        },
      };

      const action = openDialogAction(payload);
      const result = uiSlice(initialState, action);

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe("When it is called with action type closeDialog", () => {
    test("Then it should return the intial state with dialog as closed", () => {
      const expectedResult = {
        ...initialState,
        dialog: {
          ...initialState.dialog,
          isOpen: false,
        },
      };

      const action = closeDialogAction();
      const result = uiSlice(initialState, action);

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe("When it is called with action type showLoading", () => {
    test("Then it should return the intial state with isLoading as true", () => {
      const expectedResult = {
        ...initialState,
        isLoading: true,
      };

      const action = showLoadingAction();
      const result = uiSlice(initialState, action);

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe("When it is called with action type closeLoading", () => {
    test("Then it should return the intial state with isLoading as false", () => {
      const expectedResult = {
        ...initialState,
        isLoading: false,
      };

      const action = closeLoadingAction();
      const result = uiSlice(initialState, action);

      expect(result).toStrictEqual(expectedResult);
    });
  });
});
