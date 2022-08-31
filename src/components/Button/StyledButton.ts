import styled from "styled-components";

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
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
    outline: ${({ theme }) => `2px solid ${theme.colors.brand.click}}`};
  }
`;

export default StyledButton;
