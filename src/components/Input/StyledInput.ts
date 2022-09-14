import styled, { css } from "styled-components";

interface StyledInputProps {
  icon: boolean;
}

const withIconStyles = css`
  position: relative;

  .input__icon {
    position: absolute;
    left: 1em;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.brand.normal};
  }

  .input {
    padding-left: 2.5em;
  }
`;

const StyledInput = styled.div<StyledInputProps>`
  .input {
    display: block;
    width: 100%;
    padding: 0.7rem 16px;
    border-radius: 2px;
    border: ${({ theme }) => `1px solid ${theme.colors.neutral.border}}`};
  }

  .input::placeholder {
    color: ${({ theme }) => theme.colors.neutral.secondaryText};
  }

  .input:focus {
    outline: 1px solid ${({ theme }) => theme.colors.brand.hover};
    box-shadow: inset 0px 0px 0px 1px ${({ theme }) => theme.colors.brand.click};
    border: ${({ theme }) => `1px solid ${theme.colors.brand.normal}}`};
  }

  ${({ icon }) => icon && withIconStyles};
`;

export default StyledInput;
