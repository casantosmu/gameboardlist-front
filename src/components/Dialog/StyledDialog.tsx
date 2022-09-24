import styled from "styled-components";
import { OpenDialogActionPayload } from "../../store/ui/uiSlice";

type StyledDialogProps = Pick<OpenDialogActionPayload, "type">;

const StyledDialog = styled.div<StyledDialogProps>`
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
    border: 2px solid ${({ theme, type }) => theme.colors.functional[type]};
    color: ${({ theme, type }) => theme.colors.functional[type]};
    margin-right: 16px;
  }
`;

export default StyledDialog;
