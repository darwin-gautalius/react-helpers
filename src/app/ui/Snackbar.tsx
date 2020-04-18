import Snackbar, { SnackbarProps, SnackbarCloseReason } from '@material-ui/core/Snackbar';
import React, { FC, useState, SyntheticEvent } from 'react';

import { createContextWithHook } from '../../maid';

const DEFAULT_SNACKBAR_WAIT = 6000;
type CloseFn = (event: SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => void;
export type OpenFn = (optionsPart: Partial<SnackbarProps>) => CloseFn;

export const [SnackbarContext, useSnackbar] = createContextWithHook<OpenFn>('Snackbar');

export const SnackbarProvider: FC = ({ children }) => {
  const [snackbars, setSnackbars] = useState<SnackbarProps[]>([]);

  const open: OpenFn = (optionsPart) => {
    const options: SnackbarProps = { open: true, anchorOrigin: { vertical: 'top', horizontal: 'center' }, ...optionsPart };
    const onClose: CloseFn = (event, reason) => {
      setSnackbars((currentSnackbars) => currentSnackbars.filter((snackbar) => snackbar !== options));
      if (optionsPart.onClose) {
        optionsPart.onClose(event, reason);
      }
    };
    options.onClose = onClose;

    setSnackbars((currentSnackBars) => [...currentSnackBars, options]);
    return onClose;
  };

  return (
    <SnackbarContext.Provider value={open}>
      {children}
      {snackbars.map((props, index) =>
        <Snackbar
          autoHideDuration={DEFAULT_SNACKBAR_WAIT}
          key={index}
          {...props}
        />)}
    </SnackbarContext.Provider>
  );
};
