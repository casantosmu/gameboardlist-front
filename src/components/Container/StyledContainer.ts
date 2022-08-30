import styled from "styled-components";
import { Breakpoints } from "../../styles/styles";

interface ContainerStyledProps {
  breakpoint: Breakpoints;
}

const StyledContainer = styled.div<ContainerStyledProps>`
  margin: 0 auto;
  width: 95%;
  max-width: ${({ theme, breakpoint }) => theme.breakpoints[breakpoint]};
`;

export default StyledContainer;
