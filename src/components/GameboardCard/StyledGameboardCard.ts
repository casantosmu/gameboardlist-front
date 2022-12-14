import styled from "styled-components";

const StyledGameboardCard = styled.article`
  max-width: 284px;
  padding: 24px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.neutral.light};

  .gameboard-card__cover-wrapper {
    display: flex;
    justify-content: center;
  }

  .gameboard-card__content-wrapper {
    display: flex;
  }

  .gameboard-card__content {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 0.5rem;
  }

  .gameboard-card__content--small {
    flex: 1;
  }

  .gameboard-card__content--big {
    flex: 2;
  }

  .gameboard-card__data-row {
    display: flex;
    gap: 16px;
  }

  .gameboard-card__heading {
    margin: 0;
    padding: 1.5rem 0 0.5rem;
    font-size: 1rem;
    font-weight: 600;
  }

  .gameboard-card__data-title {
    margin: 0;
    font-size: inherit;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.neutral.secondaryText};
  }

  .gameboard-card__data-content {
    margin: 0;
    font-size: 1.5rem;
  }

  .gameboard-card__footer {
    padding-top: 1rem;
  }

  .gameboard-card__footer-list {
    display: flex;
    gap: 16px;
    list-style: none;
    padding: 0;
  }

  .gameboard-card__footer-action {
    background: none;
    color: ${({ theme }) => theme.colors.brand.normal};
    border: none;
    padding: 0;
    cursor: pointer;
  }
`;

export default StyledGameboardCard;
