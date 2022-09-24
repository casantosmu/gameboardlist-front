import { IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StyledInput from "./StyledInput";

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  fontAwesomeIcon?: ["fas", IconName];
}

const Input = ({ fontAwesomeIcon, ...props }: InputProps): JSX.Element => {
  return (
    <StyledInput icon={!!fontAwesomeIcon}>
      <input className="input" {...props} />
      {fontAwesomeIcon && (
        <FontAwesomeIcon icon={fontAwesomeIcon} className="input__icon" />
      )}
    </StyledInput>
  );
};

export default Input;
