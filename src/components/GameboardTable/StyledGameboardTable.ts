import styled from "styled-components";

const StyledGameboardTable = styled.div`
  .gameboard-table__row {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
  }

  .gameboard-table__col {
    display: flex;
    align-items: center;
    padding: 1rem 24px;
    border: 0.5px solid ${({ theme }) => theme.colors.neutral.border};
  }

  .gameboard-table__col--strong {
    background-color: ${({ theme }) =>
      theme.colors.neutral.secondaryBackground};
  }

  .gameboard-table__col--2,
  .gameboard-table__col--6,
  .gameboard-table__col--10 {
    grid-column: span 6;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
    .gameboard-table__col--2 {
      grid-column: span 2;
    }

    .gameboard-table__col--6 {
      grid-column: span 6;
    }

    .gameboard-table__col--10 {
      grid-column: span 10;
    }
  }

  .gameboard-table__heading {
    margin: 0;
    font-size: inherit;
    font-weight: 400;
  }
`;

export default StyledGameboardTable;
