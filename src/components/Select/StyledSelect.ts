import styled from "styled-components";

interface StyledSelectProps {
  isDefault: boolean;
}

const StyledSelect = styled.select<StyledSelectProps>`
  display: block;
  width: 100%;
  padding: 0.7rem 16px;
  color: ${({ isDefault, theme }) =>
    isDefault
      ? theme.colors.neutral.secondaryText
      : theme.colors.neutral.primaryText};
  border-radius: 2px;
  border: ${({ theme }) => `1px solid ${theme.colors.neutral.border}}`};
  cursor: pointer;

  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.brand.hover};
    box-shadow: inset 0px 0px 0px 1px ${({ theme }) => theme.colors.brand.click};
    border: ${({ theme }) => `1px solid ${theme.colors.brand.normal}}`};
  }
`;

export default StyledSelect;
