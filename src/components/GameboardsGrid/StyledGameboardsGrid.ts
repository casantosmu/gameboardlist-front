import styled from "styled-components";

const StyledGameboardsGrid = styled.ul`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 284px), 1fr));
  margin: 0;
  padding: 0;
  list-style: none;
`;

export default StyledGameboardsGrid;
