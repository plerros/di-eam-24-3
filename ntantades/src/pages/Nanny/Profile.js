import { Box, Button, Container } from "@mui/material";
import { Link } from 'react-router-dom'
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import ProfileBox from "../../components/ProfileBox"
import OfferBox from "../../components/OfferBox";
import GrayBox from "../../components/GrayBox";
import Calendar from "../../components/Calendar";
import RendezvousBox from "../../components/RendezvousBox";

import * as Database from "../../components/Database"
import RequestBox from "../../components/RequestBox";
import AgreementBox from "../../components/AgreementBox";

function offersBox(uid, actions)
{
  var offers = Database.getOffers({uidNanny:uid*1, requestID:0, active:true});
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

function rendezvousOverview (uid)
{
  const offers = Database.getOffers({uidNanny:uid*1, requestID:0, active:true});
  const offerIDs = offers.map((item) => (item.id))
  const rendezvous = Database.getRendezvous({listOfferID:offerIDs, scheduledAfter:true});

  if (rendezvous.length === 0)
    return("Δεν υπάρχουν ραντεβού");

  rendezvous.reverse()

  return (
    <RendezvousBox id={rendezvous[0].id} uid={uid} title={null} subtitle={"Επόμενο"}/>    
  );
}

function requestOverview (uid)
{
  const offers = Database.getOffers({uidNanny:uid*1, requestID:0, active: true});
  const offerIDs = offers.map((item) => (item.id))
  const requests = Database.getRequests({listOfferID:offerIDs});

  if (requests.length === 0)
    return("Δεν υπάρχουν αιτήσεις συνεργασίας");

  requests.reverse()

  return (
    <RequestBox id={requests[0].id} uid={uid} title={null} subtitle={"Πιο πρόσφατη"}/>    
  );
}

function agreementsOverview (uid)
{
  const offers = Database.getOffers({uidNanny:uid*1, notRequestID:0, active:true});
  const offerIDs = offers.map((item) => (item.id))
  const requests = Database.getRequests({listOfferID:offerIDs});
  const requestIDs = requests.map((item) => (item.id));
  const agreements = (Database.getAgreements({listRequestIDs:requestIDs})).reverse();

  if (agreements.length === 0)
    return("Δεν υπάρχουν συμφωνητικά για ενεργείς αγγελίες");

  return (
    <AgreementBox id={agreements[0].id} uid={uid} title={null} subtitle={"Πιο πρόσφατη"}/>    
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
      <GrayBox title="Ραντεβού" actions={<Button variant="contained" component={Link} to={"/nanny/rendezvous"}> <ArrowForwardIcon/></Button>}>
        <Box
          flexDirection = "row"
          sx = {{
            display:"flex"
          }}
        >
          <Box flexGrow={1} >
            {rendezvousOverview(uid)}
          </Box>
          <Calendar uid={uid}/>
        </Box>
      </GrayBox>
      <GrayBox title="Αιτήσεις Συνεργασίας" actions={<Button variant="contained" component={Link} to={"/nanny/requests"}> <ArrowForwardIcon/></Button>}>
          {requestOverview(uid)}
      </GrayBox>
      <GrayBox title="Συμφωνητικά" actions={<Button variant="contained" component={Link} to={"/nanny/agreements"}> <ArrowForwardIcon/></Button>}>
          {agreementsOverview(uid)}
      </GrayBox>
    </Container>
  );
}