import styled from "styled-components";

const StyledDetailsPage = styled.main`
  background-color: ${({ theme }) => theme.colors.neutral.light};
  padding: 1.25rem 16px;

  .gameboard-detail__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .gameboard-detail__header-col {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .gameboard-detail__heading {
    font-weight: 500;
    font-size: 1.25rem;
    margin: 0;
  }

  .gameboard-detail__heading-label {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.neutral.secondaryText};
  }

  .gameboard-detail__subheading {
    margin: 0;
    padding: 0 0 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  .gameboard-detail__content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    margin-top: 1.25rem;

    @media (min-width: ${({ theme }) => theme.breakpoints.small}) {
      flex-direction: row;
      margin-top: 0rem;
    }
  }

  .gameboard-detail__info {
    width: 100%;
  }

  .gameboard-detail__icon {
    color: ${({ theme }) => theme.colors.neutral.primaryText};
  }
`;

export default StyledDetailsPage;
