import { createGlobalStyle } from "styled-components";
import "@fontsource/roboto";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    color: ${({ theme }) => theme.colors.neutral.primaryText};
    background-color:  ${({ theme }) => theme.colors.neutral.background};
    font-family: "Roboto", sans-serif;
  }

  input {
    font-family: inherit;
  }
`;

export default GlobalStyle;
