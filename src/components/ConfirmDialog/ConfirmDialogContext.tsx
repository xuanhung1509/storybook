import createSafeContext from '@/helpers/createSafeContext';
import React, { useState } from 'react';

interface ContextValue {
  showConfirmDialog: boolean;
  open: () => void;
  close: () => void;
}

const [Provider, useSafeContext] = createSafeContext<ContextValue>();

const ConfirmDialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const open = () => setShowConfirmDialog(true);
  const close = () => setShowConfirmDialog(false);

  return (
    <Provider
      value={{
        showConfirmDialog,
        open,
        close,
      }}
    >
      {children}
    </Provider>
  );
};

let resolveCallback: (value: boolean) => void;

const useConfirmDialog = () => {
  const { showConfirmDialog, open, close } = useSafeContext();

  const onConfirm = () => {
    close();
    resolveCallback(true);
  };

  const onCancel = () => {
    close();
    resolveCallback(false);
  };

  const confirm = () => {
    open();
    return new Promise((resolve) => {
      resolveCallback = resolve;
    });
  };

  return { showConfirmDialog, confirm, onConfirm, onCancel };
};

export { ConfirmDialogProvider, useConfirmDialog };
