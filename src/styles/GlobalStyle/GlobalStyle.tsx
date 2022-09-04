import { createGlobalStyle } from "styled-components";
import styles from "../styles";
import "@fontsource/roboto";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background-color:  ${styles.colors.neutral.backgroundBody};
    color: ${styles.colors.neutral.primaryText};
    font-family: "Roboto", sans-serif;
    font-size: 14px;
  }
`;

export default GlobalStyle;
