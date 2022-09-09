import styled from "styled-components";

const StyledNavbar = styled.header`
  background-color: ${({ theme }) => theme.colors.brand.dark};

  .navbar__row {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
  }

  .navbar__col {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .navbar__list {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .navbar__link {
    color: ${({ theme }) => theme.colors.neutral.light};
  }
`;

export default StyledNavbar;
