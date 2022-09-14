import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import StyledButton from "./StyledButton";

type ButtonProps<T extends ElementType> = {
  renderAs?: T;
  semantic?: "primary" | "secondary";
  children: ReactNode;
} & ComponentPropsWithoutRef<T>;

const Button = <T extends ElementType = "button">({
  renderAs,
  children,
  semantic = "primary",
  ...rest
}: ButtonProps<T>): JSX.Element => {
  return (
    <StyledButton as={renderAs as ElementType} {...rest} semantic={semantic}>
      {children}
    </StyledButton>
  );
};

export default Button;
