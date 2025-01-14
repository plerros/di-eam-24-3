import { Container } from "@mui/material";
import ProfileBox from "../../components/ProfileBox"
import OfferBox from "../../components/OfferBox";

import Database from "../../data.json"

export default function Profile({uid}) {
  var offers = Database.offers.filter(item => item.uidNanny === uid * 1 && item.requestID === 0);
  if (offers === null)
    offers = []

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
        offers.map((offer) => (
          <OfferBox key={offer.id} id={offer.id} uid={uid}/>
        ))
      }
    </Container>
  );
}