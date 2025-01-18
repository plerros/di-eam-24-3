import { Box, Button, Container } from "@mui/material";
import { Link } from 'react-router-dom'
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import ProfileBox from "../../components/ProfileBox"
import GrayBox from "../../components/GrayBox";
import Calendar from "../../components/Calendar";
import RendezvousBox from "../../components/RendezvousBox";

import * as Database from "../../components/Database"

function rendezvousOverview (uid)
{
  var rendezvous = Database.getRendezvous({uidFamily:uid, scheduledAfter:true});
  if (rendezvous === null)
    rendezvous = [];

  if (rendezvous.length === 0)
    return("Δεν υπάρχουν ραντεβού");

  console.log(rendezvous)
  rendezvous.reverse()

  return (
    <RendezvousBox id={rendezvous[0].id} uid={uid} title={"Επόμενο"}/>
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
      <GrayBox title="Ραντεβού" actions={<Button variant="contained" component={Link} to={"/family/rendezvous"}> <ArrowForwardIcon/></Button>}>
        <Box
          flexDirection = "row"
          sx = {{
            display:"flex"
          }}
        >
          <Box
            flexGrow={1}
          >
            {rendezvousOverview(uid)}
          </Box>
          <Calendar uid={uid}/>
        </Box>
      </GrayBox>
      <GrayBox title="Αιτήσεις Συνεργασίας" actions={<Button variant="contained" component={Link} to={"/family/requests"}> <ArrowForwardIcon/></Button>}>

      </GrayBox>
      <GrayBox title="Συμφωνητικά" actions={<Button variant="contained" component={Link} to={"/family/agreements"}> <ArrowForwardIcon/></Button>}>

      </GrayBox>
    </Container>
  );
}