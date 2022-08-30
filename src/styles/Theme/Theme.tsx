import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import styles from "../styles";

interface ThemeProps {
  children: ReactNode;
}

type CustomTheme = typeof styles;

declare module "styled-components" {
  export interface DefaultTheme extends CustomTheme {}
}

const Theme = ({ children }: ThemeProps): JSX.Element => (
  <ThemeProvider theme={styles}>{children}</ThemeProvider>
);

export default Theme;
