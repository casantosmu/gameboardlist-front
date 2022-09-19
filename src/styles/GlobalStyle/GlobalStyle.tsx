import { createGlobalStyle } from "styled-components";
import styles from "../styles";
import "@fontsource/roboto";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background-color:  ${styles.colors.neutral.bodyBackground};
    color: ${styles.colors.neutral.primaryText};
    font-family: "Roboto", sans-serif;
    font-size: 0.875rem;
    line-height: 1.5;

  }

  img {
    display: block;
    max-width: 100%;
  }

  a {
    text-decoration: none;
  }

  input, button, select {
    font: inherit;
  }

  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }
`;

export default GlobalStyle;
