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

import getUser from '../getUser';

import layout from "../../pages/layout.json"

function UserDropdown(role, uid) {
  if (role === "Nanny") {
    return (
      [
        layout.filter(item => item.route === "/nanny")[0],
        layout.filter(item => item.route === "/nanny/offers")[0],
        layout.filter(item => item.route === "/nanny/rendezvous")[0],
        layout.filter(item => item.route === "/nanny/requests")[0],
        layout.filter(item => item.route === "/nanny/agreements")[0],
        layout.filter(item => item.route === "/logout")[0]
      ]
    );
  }

  if (role === "Family") {
    return (
      [
        layout.filter(item => item.route === "/family")[0],
        layout.filter(item => item.route === "/family/rendezvous")[0],
        layout.filter(item => item.route === "/family/requests")[0],
        layout.filter(item => item.route === "/family/agreements")[0],
        layout.filter(item => item.route === "/logout")[0]
      ]
    );
  }
  return (
    []
  );
}

export default function UserBox({uid}) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const user = getUser(uid);
  const settings = UserDropdown(user.role, user.userID);

  if (user.role === "Nanny" || user.role === "Family") {
    return (
      <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Επιλογές">
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
        sx={{ color: 'white', display: 'block' }}
        component={Link}
        to={layout.filter(item => item.route === "/login")[0].route}
      >
        {layout.filter(item => item.route === "/login")[0].title}
      </Button>
    </Box>
  );
}