import { Button, Container } from "@mui/material";
import ProfileBox from "../../components/ProfileBox"
import OfferBox from "../../components/OfferBox";
import { Link } from 'react-router-dom'
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import * as Database from "../../components/Database"
import GrayBox from "../../components/GrayBox";

function offersBox(uid)
{
  var offers = Database.getOffers({uidNanny:uid*1, requestID:0});
  if (offers === null)
    offers = [];

  if (offers.length === 0) {
    return(
      <Button
        variant="contained"
        component={Link}
        to={"/nanny/newoffer"}
        sx={{ m: 1 }}
      >
        ΝΕΑ ΑΓΓΕΛΙΑ
      </Button>
    );
  }


  return(
    offers.map((offer) => (
      <OfferBox key={offer.id} id={offer.id} uid={uid}/>
    ))
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
      {
        offersBox(uid)
      }
      <GrayBox title="Ιστορικό Αγγελιών" actions={<Button variant="contained" component={Link} to={"/nanny/offers"} sx={{background:'primary'}}><ArrowForwardIcon/></Button>}>
      </GrayBox>
    </Container>
  );
}