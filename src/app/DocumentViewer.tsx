import { Box } from '@material-ui/core';
import React, { FC } from 'react';
import { useDocument } from './DocumentProvider';
import { MenuGroup, MenuItem } from './MenuBar';
import { useSnackbar } from './Snackbar';

export const DocumentViewer: FC = () => {
  const document = useDocument();
  const showSnackbar = useSnackbar();

  const handleGoToStart = () => {
    showSnackbar({ message: 'go to start!' });
  };

  const handleGoToEnd = () => {
    showSnackbar({ message: 'go to end!' });
  };

  if (!document) {
    return <>Please Open a document from File > Open</>;
  }

  return (
    <Box p={1}>
      {document.type === 'text' && (
        <MenuGroup name="Go To">
          <MenuItem onClick={handleGoToStart}>Start</MenuItem>
          <MenuItem onClick={handleGoToEnd}>End</MenuItem>
        </MenuGroup>
      )}
      Document with type: {document.type} loaded
    </Box>
  );
};
