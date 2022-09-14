import styled from "styled-components";

const StyledAuthProtectedLayout = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;

  .auth-layout__header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }

  .auth-layout__heading {
    font-family: "Sunflower", sans-serif;
    font-weight: 500;
    font-size: 2rem;
  }
`;

export default StyledAuthProtectedLayout;
