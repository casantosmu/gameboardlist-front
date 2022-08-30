import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

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
    <button as={renderAs as ElementType} {...rest}>
      {children}
    </button>
  );
};

export default Button;
