import React, { FC } from 'react';

import { MenuGroup, MenuItem } from './ui/MenuBar';
import { useSnackbar } from './ui/Snackbar';

import { useDocument } from './DocumentProvider';

export const ActionManager: FC = ({ children }) => {
  const document = useDocument();
  const showSnackbar = useSnackbar();

  const handleUndo = () => {
    showSnackbar({ message: 'undo!' });
  };

  const handleRedo = () => {
    showSnackbar({ message: 'redo!' });
  };

  if (!document) {
    return null;
  }
  return (
    <div>
      <MenuGroup name="Edit">
        <MenuItem onClick={handleUndo}>Undo (ctrl + z)</MenuItem>
        <MenuItem onClick={handleRedo}>Redo (ctrl + shift + z)</MenuItem>
      </MenuGroup>
      {children}
    </div>
  );
};
