import createSafeContext from '@/helpers/createSafeContext';
import React, { useState } from 'react';

interface ContextValue {
  showDialog: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

const [Provider, useSafeContext] = createSafeContext<ContextValue>();

const ConfirmDialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <Provider
      value={{
        showDialog,
        openDialog: () => setShowDialog(true),
        closeDialog: () => setShowDialog(false),
      }}
    >
      {children}
    </Provider>
  );
};

let resolveCallback: (value: boolean) => void;

const useConfirmDialog = () => {
  const { showDialog, openDialog, closeDialog } = useSafeContext();

  const onConfirm = () => {
    closeDialog();
    resolveCallback(true);
  };

  const onCancel = () => {
    closeDialog();
    resolveCallback(false);
  };

  const confirm = () => {
    openDialog();
    return new Promise((resolve) => {
      resolveCallback = resolve;
    });
  };

  return { showDialog, confirm, onConfirm, onCancel };
};

export { ConfirmDialogProvider, useConfirmDialog };
