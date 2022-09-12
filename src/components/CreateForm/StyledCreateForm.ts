import styled from "styled-components";

const StyledCreateForm = styled.form`
  .create-form__fields-wrapper {
    display: grid;
    column-gap: 16px;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 284px), 1fr));
  }

  .create-form__buttons-wrapper {
    display: flex;
    justify-content: end;
    gap: 6px;
  }
`;

export default StyledCreateForm;
