import styled from "styled-components";

interface StyledButtonProps {
  as?: React.ElementType;
}

const StyledButton = styled.button<StyledButtonProps>`
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.brand.normal};
  color: ${({ theme }) => theme.colors.neutral.light};
  font-size: 1rem;
  text-align: center;
  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.colors.brand.normal};

  &:hover {
    background-color: ${({ theme }) => theme.colors.brand.hover};
  }

  &:active,
  &:focus {
    background-color: ${({ theme }) => theme.colors.brand.click};
    outline: none;
  }
`;

export default StyledButton;
