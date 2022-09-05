import styled from "styled-components";

const StyledDialog = styled.div`
  .dialog__description {
    font-weight: 500;
    font-size: 1rem;
  }

  .dialog__content {
    display: flex;
    margin-bottom: 1.5rem;
  }

  .dialog__icon {
    aspect-ratio: 1;
    padding: 0.3em;
    border-radius: 50%;
    border: 2px solid ${({ theme }) => theme.colors.functional.error};
    color: ${({ theme }) => theme.colors.functional.error};
    margin-right: 16px;
  }
`;

export default StyledDialog;
