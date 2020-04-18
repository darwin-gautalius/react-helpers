import React, { FC, useState } from 'react';
import { createContextWithHook } from '../helpers';

import { MenuGroup, MenuItem } from './MenuBar';
import { useSnackbar } from './Snackbar';

type Document = { type: string; };

export const [DocumentContext, useDocument] = createContextWithHook<Document | null>('DocumentContext');

export const DocumentProvider: FC = ({ children }) => {
  const [document, setDocument] = useState<Document | null>(null);
  const showSnackbar = useSnackbar();
  const handleOpen = () => {
    const type = Math.random() > 0.5 ? 'text' : 'image';
    setDocument({ type });
    showSnackbar({ message: `opened ${type} document!` });
  };
  const handleExport = () => {
    showSnackbar({ message: 'exported!' });
  };
  return (
    <DocumentContext.Provider value={document}>
      <MenuGroup name="File">
        <MenuItem onClick={handleOpen}>Open</MenuItem>
        {document && <MenuItem onClick={handleExport}>Export Document</MenuItem>}
      </MenuGroup>
      {children}
    </DocumentContext.Provider>
  );
};
