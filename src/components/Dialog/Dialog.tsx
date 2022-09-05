import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactModal from "react-modal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { closeDialogAction } from "../../store/slices/uiSlice";
import DialogModalStyles from "./DialogModalStyles";
import StyledDialog from "./StyledDialog";

// ReactModal.setAppElement("#root");

const Modal = () => {
  const { dialog } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  return (
    <ReactModal
      isOpen={dialog.isOpen}
      shouldCloseOnEsc={true}
      onRequestClose={() => dispatch(closeDialogAction())}
      style={DialogModalStyles}
      contentLabel={dialog.text}
      contentElement={(props, children) => (
        <StyledDialog {...props}>{children}</StyledDialog>
      )}
    >
      <div className="dialog__content">
        <FontAwesomeIcon icon={"close"} className="dialog__icon" />
        <span className="dialog__description">{dialog.text}</span>
      </div>
      <button onClick={() => dispatch(closeDialogAction())}>Accept</button>
    </ReactModal>
  );
};

export default Modal;
