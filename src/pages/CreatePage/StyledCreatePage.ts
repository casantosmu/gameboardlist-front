import styled from "styled-components";

const StyledCreatePage = styled.main`
  background-color: ${({ theme }) => theme.colors.neutral.light};
  padding: 20px 1rem;

  .create-page__heading {
    font-weight: 500;
    font-size: 1rem;
    margin: 0;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.border};
  }
`;

export default StyledCreatePage;
