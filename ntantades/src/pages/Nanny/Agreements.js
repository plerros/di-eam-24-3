import { Box, Container } from "@mui/material";

import AgreementBox from "../../components/AgreementBox";

import * as Database from "../../components/Database"

function offerAgreements({uid, active}) {
  var offers = []
  if (active === true)
    offers = Database.getOffers({ uidNanny:uid, requestID:0, active:active });
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

  const requests = Database.getRequests({offerID:offers[0].id});
  if (requests.length === 0) {
    return (
      <Box
        sx = {{
          display:'flex',
          justifyContent: 'center'
        }}
      >
        {(active) ? "Δεν υπάρχουν αιτήσεις σε ενεργή αγγελία" : "Δεν υπάρχουν αιτήσεις"}
      </Box>
    );
  }

  const requestIDs = requests.map((item) => (item.id));
  const agreements = Database.getAgreements({listRequestIDs:requestIDs}).reverse();

  if (agreements.length === 0) {
    return (
      <Box
        sx = {{
          display:'flex',
          justifyContent: 'center'
        }}
      >
        Δεν υπάρχουν συμφωνητικά
      </Box>
    );
  }

  return (
    agreements.map((item) => (
      <AgreementBox key={item.id} id={item.id} uid={uid}/>
    ))
  );
}

export default function Agreements({uid}) {
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
      {offerAgreements({uid:uid, active:true})}
      <h1>Ιστορικό:</h1>
      {offerAgreements({uid:uid, active:false})}
    </Container>
  );
}