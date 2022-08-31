import styled from "styled-components";

const StyledFormField = styled.div`
  margin-bottom: 1.5rem;

  .form-field__label {
    display: block;
    margin-bottom: 0.3em;
  }

  .form-field__required {
    color: ${({ theme }) => theme.colors.functional.error};
    margin-right: 5px;
  }
`;

export default StyledFormField;
