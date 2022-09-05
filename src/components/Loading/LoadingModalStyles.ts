const LoadingModalStyles: ReactModal.Styles = {
  content: {
    display: "flex",
    gap: ".75em",
    width: "fit-content",
    height: "fit-content",
    padding: "10px 16px",
    top: "16px",
    left: "50%",
    right: "50%",
    transform: "translateX(-50%)",
    border: "none",
    borderRadius: "2px",
    boxShadow: "0px 5px 5px rgba(0, 0, 0, 0.2)",
  },
  overlay: {
    background: "none",
  },
};

export default LoadingModalStyles;
