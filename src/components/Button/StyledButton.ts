import styled, { css } from "styled-components";

interface ButtonProps {
  semantic: "primary" | "secondary";
}

const PrimaryButton = css`
  background-color: ${({ theme }) => theme.colors.brand.normal};
  color: ${({ theme }) => theme.colors.neutral.light};
  border: 1px solid ${({ theme }) => theme.colors.brand.normal};

  &:hover {
    background-color: ${({ theme }) => theme.colors.brand.hover};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.brand.click};
  }

  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.brand.hover};
    box-shadow: inset 0px 0px 0px 1px ${({ theme }) => theme.colors.brand.click};
  }
`;

const SecondaryButton = css`
  background-color: ${({ theme }) => theme.colors.neutral.light};
  color: ${({ theme }) => theme.colors.neutral.primaryText};
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral.lightHover};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.neutral.lightClick};
  }

  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.neutral.lightHover};
    box-shadow: inset 0px 0px 0px 1px
      ${({ theme }) => theme.colors.neutral.lightClick};
  }
`;

const StyledButton = styled.button<ButtonProps>`
  display: inline-block;
  padding: 0.75em 1em;
  text-align: center;
  border-radius: 2px;
  cursor: pointer;

  &:active {
    outline: none;
  }

  ${({ semantic }) => semantic === "primary" && PrimaryButton}
  ${({ semantic }) => semantic === "secondary" && SecondaryButton}
`;

export default StyledButton;
