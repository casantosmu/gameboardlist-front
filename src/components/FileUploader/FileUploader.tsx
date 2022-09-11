import React, { ReactNode } from "react";
import Button from "../Button/Button";
import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";

interface FileUploaderProps {
  id: string;
  isRequired?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode;
}

const FileUploader = ({
  id,
  isRequired,
  children,
  onChange,
}: FileUploaderProps) => {
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (hiddenFileInput && hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  return (
    <>
      <Button onClick={handleClick} arial-hidden={true} type="button">
        {children}
      </Button>
      <VisuallyHidden>
        <input
          id={id}
          type="file"
          ref={hiddenFileInput}
          onChange={onChange}
          required={isRequired}
        />
      </VisuallyHidden>
    </>
  );
};

export default FileUploader;
