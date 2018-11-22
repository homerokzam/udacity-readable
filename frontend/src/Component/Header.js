import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

class Header extends React.Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography color="inherit" className="Title">
            Readable
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;