import { ReactNode } from "react";
import { Breakpoints } from "../../styles/styles";
import StyledContainer from "./StyledContainer";

interface ContainerProps {
  children: ReactNode;
  breakpoint: Breakpoints;
}

const Container = ({ children, breakpoint }: ContainerProps): JSX.Element => {
  return (
    <StyledContainer breakpoint={breakpoint} data-testid="container">
      {children}
    </StyledContainer>
  );
};

export default Container;
