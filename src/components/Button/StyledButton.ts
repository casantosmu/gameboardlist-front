import styled from "styled-components";

const StyledButton = styled.button`
  display: inline-block;
  padding: 0.75rem 1rem;
  background-color: ${({ theme }) => theme.colors.brand.normal};
  color: ${({ theme }) => theme.colors.neutral.light};
  text-align: center;
  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.colors.brand.normal};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.brand.hover};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.brand.click};
    outline: none;
  }

  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.brand.hover};
    box-shadow: inset 0px 0px 0px 1px ${({ theme }) => theme.colors.brand.click};
  }
`;

export default StyledButton;
