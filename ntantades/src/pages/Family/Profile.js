import { Box, Button, Container } from "@mui/material";
import { Link } from 'react-router-dom'
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import ProfileBox from "../../components/ProfileBox"
import GrayBox from "../../components/GrayBox";
import Calendar from "../../components/Calendar";
import RendezvousBox from "../../components/RendezvousBox";

import * as Database from "../../components/Database"
import RequestBox from "../../components/RequestBox";
import AgreementBox from "../../components/AgreementBox";

function rendezvousOverview (uid)
{
  const offers = Database.getOffers({requestID:0, active:true});
  const offerIDs = offers.map((item) => (item.id))
  const rendezvous = Database.getRendezvous({uidFamily:uid, listOfferID:offerIDs, scheduledAfter:true}).reverse();

  if (rendezvous.length === 0)
    return("Δεν υπάρχουν ραντεβού για ενεργείς αγγελίες");

  return (
    <RendezvousBox id={rendezvous[0].id} uid={uid} title={null} subtitle={"Επόμενο"}/>
  );
}

function requestOverview (uid)
{
  const offers = Database.getOffers({requestID:0, active:true});
  const offerIDs = offers.map((item) => (item.id))
  const requests = Database.getRequests({uidFamily:uid, listOfferID:offerIDs}).reverse();

  if (requests.length === 0)
    return("Δεν υπάρχουν αιτήσεις συνεργασίας για ενεργείς αγγελίες");

  return (
    <RequestBox id={requests[0].id} uid={uid} title={null} subtitle={"Πιο πρόσφατη"}/>    
  );
}

function agreementsOverview (uid)
{
  const offers = Database.getOffers({notRequestID:0, active:true});
  const offerIDs = offers.map((item) => (item.id))
  const requests = Database.getRequests({uidFamily:uid, listOfferID:offerIDs});
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
        {requestOverview(uid)}
      </GrayBox>
      <GrayBox title="Συμφωνητικά" actions={<Button variant="contained" component={Link} to={"/family/agreements"}> <ArrowForwardIcon/></Button>}>
          {agreementsOverview(uid)}
      </GrayBox>
    </Container>
  );
}