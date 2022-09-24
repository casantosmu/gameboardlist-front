import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { closeDialogAction } from "../../store/ui/uiSlice";
import Button from "../Button/Button";
import DialogModalStyles from "./DialogModalStyles";
import StyledDialog from "./StyledDialog";

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

const Dialog = (): JSX.Element => {
  const { dialog } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  return (
    <Modal
      isOpen={dialog.isOpen}
      onAfterClose={dialog.onClose}
      onRequestClose={() => dispatch(closeDialogAction())}
      style={DialogModalStyles}
      contentLabel={dialog.text}
      contentElement={(props, children) => (
        <StyledDialog {...props} type={dialog.type}>
          {children}
        </StyledDialog>
      )}
    >
      <div className="dialog__content">
        <FontAwesomeIcon
          icon={dialog.type === "success" ? "check" : "close"}
          className="dialog__icon"
        />
        <span className="dialog__description">{dialog.text}</span>
      </div>
      <Button
        onClick={() => dispatch(closeDialogAction())}
        semantic="secondary"
      >
        Accept
      </Button>
    </Modal>
  );
};

export default Dialog;
