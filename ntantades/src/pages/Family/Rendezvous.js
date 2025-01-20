import { Box, Container } from "@mui/material";

import RendezvousBox from "../../components/RendezvousBox";
import * as Database from "../../components/Database"

function offerRendezvous ({uid, active}) {
  var offers = []
  if (active === true)
    offers = Database.getOffers({ requestID:0, active:active });
  if (active === false)
    offers = Database.getOffers({ notRequestID:0 });

  if (offers.length === 0) {
    return (
      <Box
        sx = {{
          display:'flex',
          justifyContent: 'center'
        }}
      >
        {(active) ? "Δεν υπάρχει ενεργή αγγελία" : "Δεν υπάρχουν αγγελίες"}      
      </Box>
    );
  }

  const offerIDs = offers.map((item) => (item.id));
  var rendezvous = Database.getRendezvous({uidFamily:uid, listOfferID:offerIDs});
  if (rendezvous === null)
    rendezvous = [];

  rendezvous.reverse();

  if (rendezvous.length === 0) {
    return (
      <Box
        sx = {{
          display:'flex',
          justifyContent: 'center'
        }}
      >
        Δεν υπάρχουν ραντεβού
      </Box>
    );
  }
  return (
    rendezvous.map((item) => (
      <RendezvousBox key={item.id} id={item.id} uid={uid}/>
    ))
  );
}

export default function Rendezvous({uid}) {
  return (
    <Container
      maxWidth="xl"
      sx = {{
        display:'flex',
        flexDirection: 'column',
        gap: 2
      }}
    >
      <h1>Για ενεργείς αγγελίες:</h1>
      {offerRendezvous({uid:uid, active:true})}
      <h1>Ιστορικό:</h1>
      {offerRendezvous({uid:uid, active:false})}
    </Container>
  );
}