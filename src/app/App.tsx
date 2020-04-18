import { Box } from '@material-ui/core';
import React, { FC } from 'react';

import { MenuBar, MenuBarProvider } from './ui/MenuBar';
import { SnackbarProvider } from './ui/Snackbar';

import { ActionManager } from './ActionManager';
import { DocumentProvider } from './DocumentProvider';
import { DocumentViewer } from './DocumentViewer';

export const App: FC = () => {
  return (
    <SnackbarProvider>
      <MenuBarProvider>
        <Box>
          <MenuBar />
          <DocumentProvider>
            <ActionManager>
              <DocumentViewer />
            </ActionManager>
          </DocumentProvider>
        </Box>
      </MenuBarProvider>
    </SnackbarProvider>
  );
};
