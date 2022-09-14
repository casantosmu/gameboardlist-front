import Modal from "react-modal";
import { useAppSelector } from "../../store/hooks";
import LoadingSpinner from "./assets/LoadingSpinner";
import LoadingModalStyles from "./LoadingModalStyles";

const Loading = (): JSX.Element => {
  const { isLoading } = useAppSelector((state) => state.ui);

  return (
    <Modal isOpen={isLoading} style={LoadingModalStyles} contentLabel="Loading">
      {LoadingSpinner} Loading
    </Modal>
  );
};

export default Loading;
