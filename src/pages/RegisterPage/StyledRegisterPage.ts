import styled from "styled-components";

const StyledRegisterPage = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;

  .register-page__heading {
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    margin-top: 0;
    font-weight: 400;
    font-size: inherit;
    color: ${({ theme }) => theme.colors.brand.normal};
    border-bottom: 2px solid ${({ theme }) => theme.colors.brand.normal};
  }
`;

export default StyledRegisterPage;
