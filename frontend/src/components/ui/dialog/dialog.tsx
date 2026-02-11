import { createPortal } from "react-dom";
import { DialogProvider } from "./dialog-context";

interface DialogProps extends React.PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
}

export const Dialog = ({ isOpen, onClose, children }: DialogProps) => {
  if (!isOpen) return null;

  return createPortal(
    <DialogProvider onClose={onClose}>
      <div className="dialog">
        <div className="dialog__inner">{children}</div>
        <div className="dialog__overlay" onClick={onClose}></div>
      </div>
    </DialogProvider>,
    document.body,
  );
};
