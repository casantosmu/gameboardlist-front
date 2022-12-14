import styled from "styled-components";

const StyledLoginPage = styled.main`
  .login-page__heading {
    padding-bottom: 0.75rem;
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
  }
`;

export default StyledLoginPage;
