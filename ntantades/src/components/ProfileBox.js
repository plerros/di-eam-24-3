import { Avatar, Box, Button, Divider, Rating } from '@mui/material';
import { Link } from 'react-router-dom';

import GrayBox from "../components/GrayBox"

import * as Database from "./Database";

export default function ProfileBox({uid}) {
  const user = Database.getUser(uid);
  const stars = Database.getStars(uid);

  return (
    <GrayBox title="Προφίλ">
      <Box
        sx = {{
          bgcolor: '#F0F0F0',
          borderRadius: 2,
          display:'flex',
          flexDirection: 'row',
          gap: 2
        }}
      >
        <Box>
          <Avatar alt={user.firstName} src={user.picture} 
          sx = {{width: 100, height: 100}}/>
        </Box>
        <Box
          flexGrow={1}
          sx = {{
            bgcolor: '#F0F0F0',
            borderRadius: 2,
            display:'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          <Box>
            <Box>
              {user.firstName}
              {" "}
              {user.lastName}
              {" "}
              {user.age}
            </Box>
            <Box>
              {user.gender}
            </Box>
          </Box>
          <Box>
            {user.municipality}
          </Box>
        </Box>
        <Button
          component={Link}
          to={"/users/" + uid + "/reviews"}
        >
          <Rating name="half-rating-read" value={stars} precision={0.5} readOnly />
        </Button>
      </Box>
      <Divider orientation="horizontal" flexItem />
      <Box>
        {user.description}
      </Box>
    </GrayBox>
  );
}