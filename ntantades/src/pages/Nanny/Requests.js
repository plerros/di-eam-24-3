import { Box, Container } from "@mui/material";

import RequestsBox from "../../components/RequestBox";
import * as Database from "../../components/Database"

export default function Requests({uid}) {
  var offers = Database.getOffers({uidNanny:uid*1, requestID:0});
  if (offers.length === 0) {
    return (
      <Box
        sx = {{
          display:'flex',
          justifyContent: 'center'
        }}
      >
        Δεν υπάρχει ενεργή αγγελία
      </Box>
    );
  }

  var requests = Database.getRequests({offerID:offers[0].id});
  if (requests === null)
    requests = [];

  requests.reverse();
  return (
    <Container
      maxWidth="xl"
      sx = {{
        display:'flex',
        flexDirection: 'column',
        gap: 2
      }}
    >
      {
        requests.map((item) => (
          <RequestsBox key={item.id} id={item.id} uid={uid}/>
        ))
      }
    </Container>
  );
}