import { Avatar, Box, Button } from "@mui/material";
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';

import getUser from "./getUser";
import getNannyStars from "./getNannyStars";

export default function NannyBox({uid}) {
  var user = getUser(uid);
  if (user.role !== "Nanny")
    return;

  const stars = getNannyStars(uid);
  
  return (
    <Button
      sx = {{
        display: 'flex',
        bgcolor: '#F0F0F0',
        borderRadius: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 5
      }}
      component={Link}
      to={"/users/" + uid}
    >
      <Box>
        <Avatar alt={user.firstName} src={user.picture} />
      </Box>
      <Box flexGrow={1}>
        {user.firstName}
        {" "}
        {user.lastName}
      </Box>
      <Box>
        <Rating name="half-rating-read" value={stars} precision={0.5} readOnly />
      </Box>
    </Button>
  );
}