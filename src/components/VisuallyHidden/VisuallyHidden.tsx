import { PropsWithChildren } from "react";
import StyledVisuallyHidden from "./StyledVisuallyHidden";

const VisuallyHidden = ({ children }: PropsWithChildren): JSX.Element => (
  <StyledVisuallyHidden>{children}</StyledVisuallyHidden>
);

export default VisuallyHidden;
