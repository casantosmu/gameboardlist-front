import styled from "styled-components";

const StyledLoginPage = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .login-page__heading {
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    margin-top: 0;
    font-weight: 400;
    font-size: inherit;
    color: ${({ theme }) => theme.colors.brand.normal};
    border-bottom: 2px solid ${({ theme }) => theme.colors.brand.normal};
  }

  .login-page__sign-up {
    display: block;
    padding-top: 1rem;
    text-align: center;
    font-size: 1rem;
  }

  .login-page__link {
    color: ${({ theme }) => theme.colors.brand.normal};
    text-decoration: none;
  }
`;

export default StyledLoginPage;
