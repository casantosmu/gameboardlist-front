import styled from "styled-components";

const StyledError = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;

  .error-page__icon {
    padding: 0.4em;
    aspect-ratio: 1;
    background-color: ${({ theme }) => theme.colors.functional.error};
    color: ${({ theme }) => theme.colors.neutral.light};
    font-size: 2rem;
    border-radius: 50%;
  }

  .error-page__heading {
    font-size: 1.5rem;
    margin-bottom: 0.3em;
    font-weight: 400;
  }

  .error-page__description {
    color: ${({ theme }) => theme.colors.neutral.secondaryText};
    padding-bottom: 2.5em;
  }
`;

export default StyledError;
