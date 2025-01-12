import * as React from 'react';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {
  Link as RouterLink,
  useLocation,
} from 'react-router';

import layout from "../pages/layout.json"

function matchExact(r, str) {
  const match = str.match(r);
  if (match === null)
    return false;

  if (match.length === 0)
      return false;

  const pos = (match.length > 1) ? match.length - 1 : 0;
  return str === match[pos];
}

function breadcrumbNameMap(to) {
  const res = layout.filter(item => matchExact(item.route, to));
  return ({text: to.matchAll("[A-Za-z0-9_]*$")});
}

function ListItemLink(props) {
  const { to, open, ...other } = props;
  const primary = breadcrumbNameMap(to);

  let icon = null;
  if (open != null) {
    icon = open ? <ExpandLess /> : <ExpandMore />;
  }

  return (
    <li>
      <ListItemButton component={RouterLink} to={to} {...other}>
        <ListItemText primary={primary} />
        {icon}
      </ListItemButton>
    </li>
  );
}

ListItemLink.propTypes = {
  open: PropTypes.bool,
  to: PropTypes.string.isRequired,
};

function LinkRouter(props) {
  return <Link {...props} component={RouterLink} />;
}

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
      <Container maxWidth="xl">
          <Breadcrumbs aria-label="breadcrumb">
            <LinkRouter underline="hover" color="inherit" to="/">
              Αρχική
            </LinkRouter>
            {pathnames.map((value, index) => {
              const last = index === pathnames.length - 1;
              const to = `/${pathnames.slice(0, index + 1).join('/')}`;

              return last ? (
                <Typography key={to} sx={{ color: 'text.primary' }}>
                  {breadcrumbNameMap(to).text || []}
                </Typography>
              ) : (
                <LinkRouter underline="hover" color="inherit" to={to} key={to}>
                  {breadcrumbNameMap(to).text}
                </LinkRouter>
              );
            })}
          </Breadcrumbs>
      </Container>
  );
}
