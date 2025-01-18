import { Box, Button, Container } from "@mui/material";
import { Link } from 'react-router-dom'
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import ProfileBox from "../../components/ProfileBox"
import GrayBox from "../../components/GrayBox";
import Calendar from "../../components/Calendar";
import RendezvousBox from "../../components/RendezvousBox";

import * as Database from "../../components/Database"

function rendezvousBoxCalendar (uid)
{
  var rendezvous = Database.getRendezvous({uidFamily:uid});
  if (rendezvous === null)
    rendezvous = [];

  if (rendezvous.length === 0)
    return([]);

  rendezvous.reverse()

  return (
    <GrayBox title="Ραντεβού" actions={<Button variant="contained" component={Link} to={"/nanny/rendezvous"}> <ArrowForwardIcon/></Button>}>
      <Box
        flexDirection = "row"
        sx = {{
          display:"flex"
        }}
      >
        <Box
          flexGrow={1}
        >
          <RendezvousBox id={rendezvous[0].id} uid={uid} title={"Επόμενο"}/>
        </Box>
        <Calendar uid={uid}/>
      </Box>
    </GrayBox>
  );
}

export default function Profile({uid}) {
  return (
    <Container
      maxWidth="xl"
      sx = {{
        display:'flex',
        flexDirection: 'column',
        gap: 2
      }}
    >
      <ProfileBox uid={uid}/>
      {
        rendezvousBoxCalendar(uid)
      }
    </Container>
  );
}