import React, { FC, useState } from 'react';

import { createContextWithHook } from '../libs';

import { MenuGroup, MenuItem } from './ui/MenuBar';
import { useSnackbar } from './ui/Snackbar';

type Document = { type: string; };

export const [DocumentContext, useDocument] = createContextWithHook<Document | null>('DocumentContext');

export const DocumentProvider: FC = ({ children }) => {
  const [document, setDocument] = useState<Document | null>(null);
  const showSnackbar = useSnackbar();

  const handleOpenText = () => {
    setDocument({ type: 'text' });
    showSnackbar({ message: 'opened text document!' });
  };

  const handleOpenImage = () => {
    setDocument({ type: 'image' });
    showSnackbar({ message: 'opened image document!' });
  };

  const handleExport = () => {
    showSnackbar({ message: 'exported!' });
  };

  return (
    <DocumentContext.Provider value={document}>
      <MenuGroup name="File">
        <MenuItem onClick={handleOpenText}>Open Text</MenuItem>
        <MenuItem onClick={handleOpenImage}>Open Image</MenuItem>
        {document && <MenuItem onClick={handleExport}>Export Document</MenuItem>}
      </MenuGroup>
      {children}
    </DocumentContext.Provider>
  );
};
