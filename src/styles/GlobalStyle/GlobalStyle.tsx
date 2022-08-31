import { createGlobalStyle } from "styled-components";
import "@fontsource/roboto";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background-color:  ${({ theme }) => theme.colors.neutral.backgroundBody};
    color: ${({ theme }) => theme.colors.neutral.primaryText};
    font-family: "Roboto", sans-serif;
    font-size: 14px;
  }
`;

export default GlobalStyle;
