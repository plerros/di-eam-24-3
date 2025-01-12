import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';

import ProfileBox from '../components/ProfileBox';
import OfferBox from "../components/OfferBox";

import Database from "../data.json"

export default function Profile({uid}) {
  const { url_uid } = useParams();

  var offers = Database.offers.filter(item => item.uidNanny === url_uid * 1 && item.requestID === 0);
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
      <ProfileBox uid={1*url_uid} />
      {
        offers.map((offer) => (
          <OfferBox key={offer.id} id={offer.id} uid={uid}/>
        ))
      }
    </Container>
  );
}