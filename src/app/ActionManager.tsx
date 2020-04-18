import React, { FC } from 'react';
import { MenuGroup, MenuItem } from './MenuBar';
import { useDocument } from './DocumentProvider';
import { useSnackbar } from './Snackbar';

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
