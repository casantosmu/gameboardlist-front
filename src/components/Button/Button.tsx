import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import StyledButton from "./StyledButton";

export type ButtonProps<T extends ElementType> = {
  renderAs?: T;
  children: ReactNode;
} & ComponentPropsWithoutRef<T>;

const Button = <T extends ElementType = "button">({
  renderAs,
  children,
  ...rest
}: ButtonProps<T>): JSX.Element => {
  return (
    <StyledButton as={renderAs as ElementType} {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;
