import React from "react";

interface DialogContextProps extends React.PropsWithChildren {
  onClose: () => void;
}

const DialogContext = React.createContext<DialogContextProps | undefined>(
  undefined,
);

export const DialogProvider = ({ onClose, children }: DialogContextProps) => {
  return (
    <DialogContext.Provider value={{ onClose }}>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const context = React.useContext(DialogContext);
  if (context === undefined) {
    throw new Error("useDialog used outside its provider");
  }

  return context;
};
