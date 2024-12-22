import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {Link} from 'react-router-dom'

import layout from "../../pages/layout.json"

function UserDropdown(role) {
  if (role === "Nanny") {
    return (
      [
        layout["/nanny"],
        layout["/nanny/offers"],
        layout["/nanny/requests"],
        layout["/nanny/rendezvous"],
        layout["/nanny/agreements"],
        layout["/logout"]
      ]
    );
  }

  if (role === "Family") {
    return (
      [
        layout["/family"],
        layout["/family/requests"],
        layout["/family/rendezvous"],
        layout["/family/agreements"],
        layout["/logout"]
      ]
    );
  }
  return (
    []
  );
}

export default function UserBox({user, role}) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settings = UserDropdown(role);

  if (role === "Nanny" || role === "Family") {
    return (
      <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={user.firstName} src={user.picture} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem
            key={setting.text}
            onClick={handleCloseUserMenu}
            component={Link}
            to={setting.route}
          >
            <Typography sx={{ textAlign: 'center' }}>{setting.text}</Typography>
          </MenuItem>
        ))}
      </Menu>
      </Box>
    );
  }
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Button
        onClick={handleCloseUserMenu}
        sx={{ my: 2, color: 'white', display: 'block' }}
        component={Link}
        to={layout["/login"].route}
      >
        {layout["/login"].title}
      </Button>
    </Box>
  );
}