import { Container } from "@mui/material";

import OfferBox from "../../components/OfferBox";
import * as Database from "../../components/Database"

export default function Offers({uid}) {
  var offers = Database.getOffers({uidNanny:uid*1});
  if (offers === null)
    offers = [];

  offers.reverse();
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
        offers.map((offer) => (
          <OfferBox key={offer.id} id={offer.id} uid={uid}/>
        ))
      }
    </Container>
  );
}