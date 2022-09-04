import styled, { css } from "styled-components";

const iconStyles = css`
  .form-field__input-wrapper {
    position: relative;
  }

  .form-field__icon {
    position: absolute;
    left: 1em;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.brand.normal};
  }

  input {
    padding-left: 2.5em;
  }
`;

interface StyledButtonProps {
  icon: boolean;
}

const StyledFormField = styled.div<StyledButtonProps>`
  margin-bottom: 1.5rem;

  .form-field__label {
    display: block;
    padding-bottom: 0.5em;
  }

  .form-field__required {
    color: ${({ theme }) => theme.colors.functional.error};
    margin-right: 5px;
  }

  ${(props) => props.icon && iconStyles};
`;

export default StyledFormField;
