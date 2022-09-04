import { Breakpoints } from "../../styles/styles";
import StyledContainer from "./StyledContainer";

interface ContainerProps extends React.ComponentPropsWithoutRef<"div"> {
  breakpoint: Breakpoints;
}

const Container = ({
  children,
  breakpoint,
  ...rest
}: ContainerProps): JSX.Element => {
  return (
    <StyledContainer breakpoint={breakpoint} {...rest} data-testid="container">
      {children}
    </StyledContainer>
  );
};

export default Container;
