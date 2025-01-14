import { Container } from "@mui/material";
import ProfileBox from "../../components/ProfileBox"
import OfferBox from "../../components/OfferBox";

import * as Database from "../../components/Database"

export default function Profile({uid}) {
  var offers = Database.getOffers({uidNanny:uid*1, requestID:0});
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