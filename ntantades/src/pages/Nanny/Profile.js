import { Box, Button, Container } from "@mui/material";
import { Link } from 'react-router-dom'
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import ProfileBox from "../../components/ProfileBox"
import OfferBox from "../../components/OfferBox";
import GrayBox from "../../components/GrayBox";
import Calendar from "../../components/Calendar";
import RendezvousBox from "../../components/RendezvousBox";

import * as Database from "../../components/Database"

function offersBox(uid, actions)
{
  var offers = Database.getOffers({uidNanny:uid*1, requestID:0});
  if (offers === null)
    offers = [];

  if (offers.length === 0) {
    return(
      <Button
        variant="contained"
        component={Link}
        to={"/nanny/newoffer"}
        sx={{ m: 1 }}
      >
        ΝΕΑ ΑΓΓΕΛΙΑ
      </Button>
    );
  }

  return(
    offers.map((offer) => (
      <OfferBox key={offer.id} id={offer.id} uid={uid} additionalActions={actions}/>
    ))
  );
}

function rendezvousBoxCalendar (uid)
{
  var offers = Database.getOffers({uidNanny:uid*1, requestID:0});
  if (offers === null)
    offers = [];
  if (offers.length === 0)
    return([]);

  var rendezvous = Database.getRendezvous({offerID:offers[0].id});
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
        offersBox(uid, <Button variant="outlined" component={Link} to={"/nanny/offers"}> ΙΣΤΟΡΙΚΟ <ArrowForwardIcon/></Button>)
      }
      {
        rendezvousBoxCalendar(uid)
      }
    </Container>
  );
}