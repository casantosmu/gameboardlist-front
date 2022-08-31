import styled from "styled-components";

const StyledInput = styled.input`
  display: block;
  width: 100%;
  padding: 0.7rem 16px;
  border-radius: 2px;
  border: ${({ theme }) => `1px solid ${theme.colors.neutral.border}}`};
  font-size: inherit;
  font-family: inherit;

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral.secondaryText};
  }

  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.brand.hover};
    box-shadow: inset 0px 0px 0px 1px ${({ theme }) => theme.colors.brand.click};
    border: ${({ theme }) => `1px solid ${theme.colors.brand.normal}}`};
  }
`;

export default StyledInput;
