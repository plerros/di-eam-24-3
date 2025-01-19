import { Container } from "@mui/material";

import RequestsBox from "../../components/RequestBox";
import * as Database from "../../components/Database"

export default function Requests({uid}) {
  var requests = Database.getRequests({uidFamily:uid});
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