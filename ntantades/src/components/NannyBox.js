import { Avatar, Box } from "@mui/material";
import Rating from '@mui/material/Rating';

import getUser from "./getUser";
import getNannyStars from "./getNannyStars";

export default function NannyBox({uid}) {
  var user = getUser(uid);
  if (user.role !== "Nanny")
    return;

  const stars = getNannyStars(uid);
  
  return (
    <Box sx = {{
      display: 'flex',
      bgcolor: '#F0F0F0',
      borderRadius: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5
    }}>
      <Box>
        <Avatar alt={user.firstName} src={user.picture} />
      </Box>
      <Box>
        {user.firstName}
        {" "}
        {user.lastName}
      </Box>
      <Box>
        <Rating name="half-rating-read" value={stars} precision={0.5} readOnly />
      </Box>
    </Box>
  );
}