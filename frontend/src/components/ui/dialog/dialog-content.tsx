import type React from "react";

export const DialogContent = ({ children }: React.PropsWithChildren) => {
  return <div className="dialog__body">{children}</div>;
};
