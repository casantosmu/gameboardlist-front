import styled from "styled-components";

const StyledFormField = styled.div`
  margin-bottom: 1.5rem;

  .form-field__label {
    display: block;
    padding-bottom: 0.5em;
  }

  .form-field__required {
    color: ${({ theme }) => theme.colors.functional.error};
  }

  .form-field__optional {
    color: ${({ theme }) => theme.colors.neutral.secondaryText};
  }
`;

export default StyledFormField;
