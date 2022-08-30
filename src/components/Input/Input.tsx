import StyledInput from "./StyledInput";

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {}

const Input = ({ ...props }: InputProps): JSX.Element => {
  return <StyledInput {...props} />;
};

export default Input;
