import styled from "styled-components";

const StyledRegisterPage = styled.main`
  .register-page__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0.75rem;
    margin-bottom: 1rem;
    border-bottom: 2px solid ${({ theme }) => theme.colors.brand.normal};
  }

  .register-page__close {
    color: ${({ theme }) => theme.colors.neutral.secondaryText};
  }

  .register-page__heading {
    margin: 0;
    font-weight: 400;
    font-size: inherit;
    color: ${({ theme }) => theme.colors.brand.normal};
  }
`;

export default StyledRegisterPage;
