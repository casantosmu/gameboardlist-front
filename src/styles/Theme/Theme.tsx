import { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";
import styles from "../styles";

type CustomTheme = typeof styles;

declare module "styled-components" {
  export interface DefaultTheme extends CustomTheme {}
}

const Theme = ({ children }: PropsWithChildren): JSX.Element => (
  <ThemeProvider theme={styles}>{children}</ThemeProvider>
);

export default Theme;
