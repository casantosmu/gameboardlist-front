import styled from "styled-components";

const StyledNotFound = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;

  .not-found-page__icon {
    padding: 0.4em;
    aspect-ratio: 1;
    background-color: ${({ theme }) => theme.colors.brand.normal};
    color: ${({ theme }) => theme.colors.neutral.light};
    font-size: 2rem;
    border-radius: 50%;
  }

  .not-found-page__heading {
    font-size: 1.5rem;
    margin-bottom: 0.3em;
    font-weight: 400;
  }

  .not-found-page__description {
    color: ${({ theme }) => theme.colors.neutral.secondaryText};
    padding-bottom: 2.5em;
  }
`;

export default StyledNotFound;
