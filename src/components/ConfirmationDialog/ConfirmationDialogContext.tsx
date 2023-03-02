import createSafeContext from '@/helpers/createSafeContext';
import React, { useState } from 'react';

interface ContextValue {
  showConfirmationDialog: boolean;
  open: () => void;
  close: () => void;
}

const [Provider, useSafeContext] = createSafeContext<ContextValue>();

const ConfirmationDialogProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const open = () => setShowConfirmationDialog(true);
  const close = () => setShowConfirmationDialog(false);

  return (
    <Provider
      value={{
        showConfirmationDialog,
        open,
        close,
      }}
    >
      {children}
    </Provider>
  );
};

let resolveCallback: (value: boolean) => void;

const useConfirmationDialog = () => {
  const { showConfirmationDialog, open, close } = useSafeContext();

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

  return { showConfirmationDialog, confirm, onConfirm, onCancel };
};

export { ConfirmationDialogProvider, useConfirmationDialog };
