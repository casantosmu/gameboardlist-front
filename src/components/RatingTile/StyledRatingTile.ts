import styled from "styled-components";

const StyledRatingTile = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: end;
  width: 60px;
  height: 70px;
  background-color: ${({ theme }) => theme.colors.brand.normal};
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.neutral.light};
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
`;

export default StyledRatingTile;
