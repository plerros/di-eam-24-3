import { Box, Container } from "@mui/material";

import RequestsBox from "../../components/RequestBox";
import * as Database from "../../components/Database"

function offerRequests({uid, active}) {
  var offers = []
  if (active === true)
    offers = Database.getOffers({uidNanny:uid*1, requestID:0, active:active});
  if (active === false)
    offers = Database.getOffers({uidNanny:uid*1, notRequestID:0});

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

  var requests = Database.getRequests({offerID:offers[0].id});
  if (requests === null)
    requests = [];

  requests.reverse();

  if (requests.length === 0) {
    return (
      <Box
        sx = {{
          display:'flex',
          justifyContent: 'center'
        }}
      >
        Δεν υπάρχουν αιτήσεις
      </Box>
    );
  }

  return (
    requests.map((item) => (
      <RequestsBox key={item.id} id={item.id} uid={uid}/>
    ))
  );
}

export default function Requests({uid}) {
  return (
    <Container
      maxWidth="xl"
      sx = {{
        display:'flex',
        flexDirection: 'column',
        gap: 2
      }}
    >
      <h1>Για ενεργή αγγελία:</h1>
      {offerRequests({uid:uid, active:true})}
      <h1>Ιστορικό:</h1>
      {offerRequests({uid:uid, active:false})}
    </Container>
  );
}