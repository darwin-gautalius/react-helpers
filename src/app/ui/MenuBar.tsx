import { AppBar, Box, Button, ClickAwayListener, Grow, MenuList, MenuItem, Paper, Popper } from '@material-ui/core';
import React, { FC } from 'react';
import { createContextualPortal } from '../../helpers';

export {
  MenuBarPortalProvider as MenuBarProvider,
  MenuBar,
  MenuGroup,
  MenuItem
};

const [MenuBarPortalProvider, MenuBarPortalPlaceholder, MenuBarPortalGate] = createContextualPortal('MenuBar');

const MenuBar: FC = () => {
  return (
    <AppBar position="sticky" color="transparent">
      <Box display="flex" p={1}>
        <MenuBarPortalPlaceholder />
      </Box>
    </AppBar>
  );
};

interface MenuGroupProps {
  name: string;
}

const MenuGroup: FC<MenuGroupProps> = ({ name, children }) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLAnchorElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <MenuBarPortalGate>
      <Button ref={anchorRef} onClick={handleToggle} size="large" component="a">
        {name}
      </Button>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: 'left bottom' }}>
            <Paper onClick={handleClose}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open}>
                  {children}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </MenuBarPortalGate>
  );
};
