import styled from "styled-components";

const StyledInput = styled.input`
  & {
    display: block;
    width: 100%;
    padding: 0.7rem 16px;
    border-radius: 2px;
    border: ${({ theme }) => `1px solid ${theme.colors.neutral.border}}`};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral.secondaryText};
  }

  &:focus {
    outline: ${({ theme }) => `2px solid ${theme.colors.brand.normal}}`};
  }
`;

export default StyledInput;
