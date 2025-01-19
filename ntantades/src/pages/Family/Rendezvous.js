import { Container } from "@mui/material";

import RendezvousBox from "../../components/RendezvousBox";
import * as Database from "../../components/Database"

export default function Rendezvous({uid}) {
  var rendezvous = Database.getRendezvous({uidFamily:uid});
  if (rendezvous === null)
    rendezvous = [];

  rendezvous.reverse();
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
        rendezvous.map((item) => (
          <RendezvousBox key={item.id} id={item.id} uid={uid}/>
        ))
      }
    </Container>
  );
}