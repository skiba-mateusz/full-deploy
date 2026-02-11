import type React from "react";
import { Button } from "../button";
import { useDialog } from "./dialog-context";

export const DialogFooter = ({ children }: React.PropsWithChildren) => {
  const { onClose } = useDialog();
  return (
    <footer className="dialog__footer">
      {children}
      <Button onClick={onClose}>Close</Button>
    </footer>
  );
};
